import {TodoHeader} from '../../components/TodoHeader/TodoHeader'
import {DragDropContext, Draggable, DraggableProvided, Droppable, DropResult} from 'react-beautiful-dnd'
import {useEffect, useState} from 'react'
import {login} from '../../network'
import Cookies from 'js-cookie'
import { Modal } from 'antd'

type Todo = {
  id: number
  content: string
}

const TODOLIST_test1 = [
  {id: 0, content: '我想你'},
  {id: 1, content: '俺想你'},
  {id: 2, content: '额想你'},
]

export function HomePage() {

  const [ isShowLoginModal, setIsShowLoginModal] = useState(false)


  useEffect(() => {

    loginLogic()

  }, [])

  function loginLogic() {

    if (!Cookies.get('token===')) {
      setIsShowLoginModal(true) 
    }

    try {
      login('13121529304', 'wangliguang')
    } catch (error) {
      debugger
    }
  }

  function onDragEnd({source, destination}: DropResult) {
    console.log('onDragEnd', source, destination)
  }

  function renderDragable(dataArray: Array<Todo>) {
    return dataArray.map((todo, index) => (
      <Draggable draggableId={`${todo.id}`} key={`${todo.id}`} index={index}>
        {(provided: DraggableProvided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            {renderCell(todo.content)}
          </div>
        )}
      </Draggable>
    ))
  }

  function renderCell(content: string) {
    return (
      <div style={{marginTop: '10px', display: 'flex', flex: 1, height: '30px', backgroundColor: 'blue'}}>
        {content}
      </div>
    )
  }

  function renderLoginModal() {
    return (
      <Modal
        title="Modal 100px width"
        centered
        visible={isShowLoginModal}
        onOk={() => setIsShowLoginModal(false)}
        onCancel={() => setIsShowLoginModal(false)}
        width={200}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    )
  }

  function renderPannel() {
    const fourPannelData = [
      {title: `重要紧急 10`, droppableId: 'imUr', dataArray: TODOLIST_test1},
      {title: `重要不紧急 10`, droppableId: 'imNoUr', dataArray: TODOLIST_test1},
      {title: `不重要紧急 10`, droppableId: 'noImUr', dataArray: TODOLIST_test1},
      {title: `不重要不紧急 10`, droppableId: 'noImNoUr', dataArray: TODOLIST_test1},
    ]

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="pannelWraper">
          {fourPannelData.map((item, index) => (
            <div key={index} className={`pannel${index + 1}`}>
              <div className="title">
                <p className="title_text">{item.title}</p>
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
      {/* {renderLoginModal()} */}
    </div>
  )
}
