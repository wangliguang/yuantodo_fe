import {Image, Input, InputRef} from 'antd'
import {useRef, useState} from 'react'

import selectedIcon from '../assets/select.png'

export type ITodo = {
  id: number
  content: string
}

type TodoCellProps = {
  todo: ITodo
}

export function TodoCell({todo}: TodoCellProps) {
  const [isEdit, setIsEdit] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [value, setValue] = useState(todo.content)
  const inputRef = useRef<InputRef>(null)

  function handleEnterEditMode() {
    setIsSelected(true)
    setIsEdit(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  function handleInputChange(e: any) {
    setValue(e.currentTarget?.value)
  }

  function handleSelectedCell() {
    setIsSelected(!isSelected)
  }

  return (
    <div
      onClick={handleSelectedCell}
      onDoubleClick={handleEnterEditMode}
      style={{backgroundColor: isSelected ? 'red' : 'rgba(255,255,255,0)'}}
      className="cell"
    >
      <Image preview={false} width={20} height={20} src={selectedIcon} />
      <Input
        style={{display: isEdit ? 'block' : 'none'}}
        value={value}
        onChange={handleInputChange}
        ref={inputRef}
        onBlur={() => setIsEdit(false)}
      />
      <span
        style={{
          display: isEdit ? 'none' : 'block',
          paddingLeft: '10px',
        }}
      >
        {value}
      </span>
    </div>
  )
}
