import {BorderOutlined, CheckSquareFilled} from '@ant-design/icons'
import {Input, InputRef} from 'antd'
import _ from 'lodash'
import {useCallback, useEffect, useRef, useState} from 'react'

import {TodoType} from '../modules/home/HomePage'
import {updateTodo} from '../network'

export type ITodo = {
  tId?: number
  content?: string
  type?: TodoType
  done?: number
  sort?: number
  createTime?: number
}

type TodoCellProps = {
  todo: ITodo
}

export function TodoCell({todo}: TodoCellProps) {
  const [isEdit, setIsEdit] = useState(false)
  const [isDone, setIsDone] = useState(todo.done || 0)

  const [value, setValue] = useState(todo.content)
  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    if (new Date().getTime() - (todo.createTime ?? 0) < 200) {
      handleEnterEditMode()
    }
  }, [])

  function handleEnterEditMode() {
    setIsEdit(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  function handleInputChange(e: any) {
    setValue(e.currentTarget?.value)
  }

  const handleSubmitChangeContent = useCallback(
    _.debounce(
      async () => {
        await updateTodo({tId: todo.tId, content: value})
        setIsEdit(false)
      },
      500,
      {leading: true, trailing: false},
    ),
    [value],
  )
  function handleSelectedCell() {
    ;[...document.getElementsByClassName('cell')].forEach(element => {
      element.classList.remove('selected')
    })
    document.getElementById(`cell_${todo.tId}`)?.classList.add('selected')
  }

  async function handleOnDone() {
    await updateTodo({tId: todo.tId, done: Number(isDone === 0 ? 1 : 0)})
    setIsDone(isDone === 0 ? 1 : 0)
  }

  return (
    <div
      data-type={todo.type}
      onClick={handleSelectedCell}
      onDoubleClick={handleEnterEditMode}
      id={`cell_${todo.tId}`}
      className={`cell`}
    >
      {isDone ? (
        <CheckSquareFilled onClick={handleOnDone} className="check" />
      ) : (
        <BorderOutlined onClick={handleOnDone} className="noCheck" />
      )}
      <Input
        style={{display: isEdit ? 'block' : 'none'}}
        value={value}
        onChange={handleInputChange}
        ref={inputRef}
        onPressEnter={handleSubmitChangeContent}
        onBlur={handleSubmitChangeContent}
      />
      <span
        style={{
          color: _.isEmpty(value) ? '#BBB' : '#202020',
          display: isEdit ? 'none' : 'block',
          paddingLeft: '10px',
        }}
      >
        {_.isEmpty(value) ? '双击编辑信息' : value}
      </span>
    </div>
  )
}
