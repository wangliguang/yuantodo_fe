import Axios from 'axios'
import Cookies from 'js-cookie'

let baseUrl = 'http://43.140.252.199:9999/api/'
if (import.meta.env.VITE_API_MODE === 'development') {
  baseUrl = 'http://localhost:9999/api/'
}

const axios = Axios.create()
axios.defaults.baseURL = baseUrl

function handleError(data: any) {
  // token问题
  if (data.status === 1002 || data.status === 1001) {
    Cookies.remove('token')
    location.reload()
  }
}

axios.interceptors.request.use(
  req => {
    req.headers = {
      'Content-Type': 'application/json',
    }
    return req
  },
  err => {},
)

axios.interceptors.response.use(
  res => {
    if (res.data.status !== 100) {
      handleError(res.data)
      return Promise.reject(res.data)
    }

    return res.data.data
  },
  err => {
    debugger
    console.debug('XXXXX', err)
    if (err && err.response) {
      return err.response.data
    }
  },
)

export const get = (url = '', params = {}, headers = {}) => {
  return axios.get(url, {data: params, headers})
}

export const post = (url = '', params = {}, headers = {}) => {
  return axios.post(url, JSON.stringify(params), {
    headers,
  })
}
