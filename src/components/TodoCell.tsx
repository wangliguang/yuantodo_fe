export type ITodo = {
  id: number
  content: string
}

type TodoCellProps = {
  todo: ITodo
}

export function TodoCell({todo}: TodoCellProps) {
  return (
    <div style={{marginTop: '10px', display: 'flex', flex: 1, height: '30px', backgroundColor: 'blue'}}>
      {todo.content}
    </div>
  )
}
