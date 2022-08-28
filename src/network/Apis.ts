import {post} from './Request'

export const login = (mobile: string, password: string) => {
  return post('/user/login', {mobile, password})
}
