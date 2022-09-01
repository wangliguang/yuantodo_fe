import {TodoHeader} from '../../components/TodoHeader/TodoHeader'
import {DragDropContext, Draggable, DraggableProvided, Droppable, DropResult} from 'react-beautiful-dnd'
import {useEffect, useState} from 'react'
import {LoginModal} from '../../components/LoginModal'
import {ITodo, TodoCell} from '../../components/TodoCell'
import {fetchTodyTodo} from '../../network'

enum TodoType {
  imUr = 'imUr',
  imNoUr = 'imNoUr',
  noImUr = 'noImUr',
  noImNoUr = 'noImNoUr',
}

export function HomePage() {
  const [imUrList, setImUrList] = useState<Array<ITodo>>([])
  const [imNoUrList, setImNoUrList] = useState<Array<ITodo>>([])
  const [noImUrList, setnoImUrList] = useState<Array<ITodo>>([])
  const [noImNoUrList, setNoImNoUrList] = useState<Array<ITodo>>([])

  useEffect(() => {}, [])

  async function handleFetchTodyTodo() {
    // 获取今天的todo
    const data = await fetchTodyTodo('2022-01-23', '2022-08-20')
    setImUrList(data.imUr)
    setImNoUrList(data.imNoUr)
    setnoImUrList(data.noImUr)
    setNoImNoUrList(data.noImNoUrList)
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

  function renderPannel() {
    const fourPannelData = [
      {title: `重要紧急 10`, droppableId: TodoType.imUr, dataArray: imUrList},
      {title: `重要不紧急 10`, droppableId: TodoType.imNoUr, dataArray: imNoUrList},
      {title: `不重要紧急 10`, droppableId: TodoType.noImUr, dataArray: noImUrList},
      {title: `不重要不紧急 10`, droppableId: TodoType.noImNoUr, dataArray: noImNoUrList},
    ]

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="pannelWraper">
          {fourPannelData.map((item, index) => (
            <div key={index} className={`pannel${index + 1}`}>
              <div className="title">
                <span className="title_text">{item.title}</span>
                <button className="addBtn" onClick={() => {}}>
                  +
                </button>
              </div>
              <Droppable droppableId={item.droppableId}>
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
