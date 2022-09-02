import {TodoHeader} from '../../components/TodoHeader/TodoHeader'
import {DragDropContext, Draggable, DraggableProvided, Droppable, DropResult} from 'react-beautiful-dnd'
import {useEffect, useState} from 'react'
import {LoginModal} from '../../components/LoginModal'
import {ITodo, TodoCell} from '../../components/TodoCell'
import {createTodo, fetchTodyTodo} from '../../network'
import {PlusSquareFilled} from '@ant-design/icons'
import _ from 'lodash'

export enum TodoType {
  imUr = 'IM_UR',
  imNoUr = 'IM_noUR',
  noImUr = 'noIM_UR',
  noImNoUr = 'noIM_noUR',
}

export function HomePage() {
  const [imUrList, setImUrList] = useState<Array<ITodo>>([])
  const [imNoUrList, setImNoUrList] = useState<Array<ITodo>>([])
  const [noImUrList, setnoImUrList] = useState<Array<ITodo>>([])
  const [noImNoUrList, setNoImNoUrList] = useState<Array<ITodo>>([])

  useEffect(() => {}, [])

  async function handleFetchTodyTodo() {
    // 获取今天的todo
    const data = await fetchTodyTodo('2022-01-23', '2022-12-20')
    setImUrList(data.imUr)
    setImNoUrList(data.imNoUr)
    setnoImUrList(data.noImUr)
    setNoImNoUrList(data.noImNoUr)
  }

  function onDragEnd({source, destination}: DropResult) {
    console.log('onDragEnd', source, destination)
  }

  function renderDragable(dataArray: Array<ITodo>) {
    return (dataArray ?? []).map((todo, index) => (
      <Draggable draggableId={`${todo.tId}`} key={`${todo.tId}`} index={index}>
        {(provided: DraggableProvided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <TodoCell todo={todo} />
          </div>
        )}
      </Draggable>
    ))
  }

  function getSort() {
    const todo = _.maxBy(
      [...(imUrList || []), ...(imNoUrList || []), ...(noImUrList || []), ...(noImNoUrList || [])],
      'tId',
    )
    return ((todo?.tId || 1) + 1) * 65535
  }
  async function handleCreateTodo(type: TodoType) {
    const tId = await createTodo({type, content: '', sort: getSort()})
    const newTodo = {
      content: '',
      type,
      tId: tId,
      sort: getSort(),
      createTime: new Date().getTime(),
    }
    if (type === TodoType.imUr) {
      setImUrList([...imUrList, newTodo])
      return
    }

    if (type === TodoType.imNoUr) {
      setImNoUrList([...imNoUrList, newTodo])
      return
    }
    if (type === TodoType.noImUr) {
      setnoImUrList([...noImUrList, newTodo])
      return
    }
    if (type === TodoType.noImNoUr) {
      setNoImNoUrList([...noImNoUrList, newTodo])
      return
    }
  }

  function renderPannel() {
    const fourPannelData = [
      {title: `重要紧急 ${(imUrList || []).length}`, type: TodoType.imUr, dataArray: imUrList},
      {title: `重要不紧急 ${(imNoUrList || []).length}`, type: TodoType.imNoUr, dataArray: imNoUrList},
      {title: `不重要紧急 ${(noImUrList || []).length}`, type: TodoType.noImUr, dataArray: noImUrList},
      {title: `不重要不紧急 ${(noImNoUrList || []).length}`, type: TodoType.noImNoUr, dataArray: noImNoUrList},
    ]

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="pannelWraper">
          {fourPannelData.map((item, index) => (
            <div key={index} className={`pannel${index + 1}`}>
              <div className="title">
                <span className="title_text">{item.title}</span>
                <PlusSquareFilled className="addBtn" onClick={() => handleCreateTodo(item.type)} />
              </div>
              <Droppable droppableId={item.type}>
                {provided => (
                  <div ref={provided.innerRef} className="pannel">
                    {renderDragable(item['dataArray'])}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    )
  }

  return (
    <div className="main">
      <TodoHeader />
      {renderPannel()}
      <LoginModal onSuccess={handleFetchTodyTodo} />
    </div>
  )
}
