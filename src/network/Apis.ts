import {ITodo} from '../components/TodoCell'
import {post} from './Request'

export const login = (mobile: string, password: string) => {
  return post('/user/login', {mobile, password}) as any
}

export const fetchTodyTodo = (beginDate: string, endDate: string) => {
  return post('/todo/queryAll', {beginDate, endDate}) as any
}

export const updateTodo = (todo: ITodo) => {
  return post('/todo/update', todo) as any
}
