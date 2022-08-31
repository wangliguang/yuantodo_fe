import {TodoHeader} from '../../components/TodoHeader/TodoHeader'
import {DragDropContext, Draggable, DraggableProvided, Droppable, DropResult} from 'react-beautiful-dnd'
import {useEffect} from 'react'
import {LoginModal} from '../../components/LoginModal'
import {ITodo, TodoCell} from '../../components/TodoCell'

const TODOLIST_test1 = [
  {id: 0, content: '我想你'},
  {id: 1, content: '俺想你'},
  {id: 2, content: '额想你'},
]

const TODOLIST_test2 = [
  {id: 3, content: '我想你'},
  {id: 4, content: '俺想你'},
  {id: 5, content: '额想你'},
]

export function HomePage() {
  useEffect(() => {}, [])

  function handleFetchTodyTodo() {
    // 获取今天的todo
    console.log('XXXXXX')
  }

  function onDragEnd({source, destination}: DropResult) {
    console.log('onDragEnd', source, destination)
  }

  function renderDragable(dataArray: Array<ITodo>) {
    return dataArray.map((todo, index) => (
      <Draggable draggableId={`${todo.id}`} key={`${todo.id}`} index={index}>
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
      {title: `重要紧急 10`, droppableId: 'imUr', dataArray: TODOLIST_test1},
      {title: `重要不紧急 10`, droppableId: 'imNoUr', dataArray: TODOLIST_test2},
      {title: `不重要紧急 10`, droppableId: 'noImUr', dataArray: []},
      {title: `不重要不紧急 10`, droppableId: 'noImNoUr', dataArray: []},
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
