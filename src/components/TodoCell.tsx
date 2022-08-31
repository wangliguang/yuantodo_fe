export type ITodo = {
  id: number
  content: string
}

type TodoCellProps = {
  todo: ITodo
}

export function TodoCell({todo}: TodoCellProps) {
  return <div className="cell">{todo.content}</div>
}
