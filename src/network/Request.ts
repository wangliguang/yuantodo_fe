import Axios from 'axios'

let baseUrl = 'http://43.140.252.199:9999/'
if (import.meta.env.VITE_API_MODE === 'development') {
  baseUrl = 'http://localhost:9999/'
}

const request = (url: string, params: any, method: string) => {
  const axios = Axios.create()

  axios.interceptors.request.use(
    req => {
      return req
    },
    err => {
      if (err && err.request) {
      } else {
      }
      return Promise.reject()
    },
  )

  axios.interceptors.response.use(
    res => {
      return res
    },
    err => {
      if (err && err.response) {
      }
      return Promise.reject()
    },
  )
  return axios({
    baseURL: baseUrl,
    url: `api${url}`,
    method: method,
    data: params,
  })
}

export const get = (url = '', params = {}) => {
  return request(url, params, 'get')
}

export const post = (url = '', params = {}) => {
  return request(url, params, 'post')
}
