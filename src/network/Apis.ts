import {post} from './Request'

export const login = (phone: string, passowrd: string) => {
  return post('/user/login', {phone, passowrd})
}
