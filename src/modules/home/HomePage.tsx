import {TodoHeader} from '../../components/TodoHeader/TodoHeader'
import {DragDropContext, Draggable, DraggableProvided, Droppable, DropResult} from 'react-beautiful-dnd'
import {useEffect, useState} from 'react'
import {LoginModal} from '../../components/LoginModal'
import {ITodo, TodoCell} from '../../components/TodoCell'
import {createTodo, deleteTodo, fetchTodyTodo, updateTodo} from '../../network'
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
  const [noImUrList, setNoImUrList] = useState<Array<ITodo>>([])
  const [noImNoUrList, setNoImNoUrList] = useState<Array<ITodo>>([])

  useEffect(() => {
    document.addEventListener('keydown', handleOnKeyDown)
    return () => {
      document.removeEventListener('keydown', handleOnKeyDown)
    }
  }, [imUrList, imNoUrList, noImUrList, noImNoUrList])

  const handleOnKeyDown = async (event: any) => {
    if (event.keyCode === 8) {
      // 删除键
      const element = [...document.getElementsByClassName('selected')][0]
      if (!element) return
      const tId = Number(element.getAttribute('id')?.split('_')[1])
      const type = element.getAttribute('data-type')
      if (!type || !tId) return
      await deleteTodo(tId)
      let dataArray = getDataListByType(type)
      dataArray = _.remove(dataArray, e => e.tId !== tId)
      updateDataListByType(type, dataArray)
    }
  }

  async function handleFetchTodyTodo() {
    // 获取今天的todo
    const data = await fetchTodyTodo('2022-01-23', '2022-12-20')
    setImUrList(data.imUr)
    setImNoUrList(data.imNoUr)
    setNoImUrList(data.noImUr)
    setNoImNoUrList(data.noImNoUr)
  }

  function getDataListByType(type: string) {
    if (type === TodoType.imUr) return imUrList
    if (type === TodoType.imNoUr) return imNoUrList
    if (type === TodoType.noImUr) return noImUrList
    if (type === TodoType.noImNoUr) return noImNoUrList
    return []
  }

  function updateDataListByType(type: string, list: Array<ITodo>) {
    if (type === TodoType.imUr) return setImUrList([...list])
    if (type === TodoType.imNoUr) return setImNoUrList([...list])
    if (type === TodoType.noImUr) return setNoImUrList([...list])
    if (type === TodoType.noImNoUr) return setNoImNoUrList([...list])
    return []
  }

  async function onDragEnd(event: DropResult) {
    const {source, destination} = event
    if (source.droppableId === destination?.droppableId) {
      await updateDBSort(event)
      const dataArray = getDataListByType(source.droppableId)
      const [removed] = dataArray.splice(source.index, 1)
      dataArray.splice(destination.index, 0, removed)
      updateDataListByType(source.droppableId, dataArray)
    } else if (destination) {
      await updateDBSort(event)
      const sourceList = getDataListByType(source.droppableId)
      const destList = getDataListByType(destination?.droppableId)
      const [removed] = sourceList.splice(source.index, 1)
      removed.type = destination?.droppableId as TodoType
      destList.splice(destination?.index, 0, removed)
      updateDataListByType(source.droppableId, sourceList)
      updateDataListByType(destination.droppableId, destList)
    }
  }

  async function updateDBSort({source, destination}: DropResult) {
    console.log('拖拽结束', source, destination)
    if (source.index === destination?.index && source.droppableId === destination.droppableId) {
      return
    }
    if (source.droppableId === destination?.droppableId) {
      const curList = getDataListByType(source.droppableId)
      let sort = 0
      if (destination.index === 0) {
        sort = (curList[0].sort || 1) / 2
      } else if (destination.index === curList.length - 1) {
        sort = (curList[curList.length - 1].sort || 1) + 65535
      } else if (source.index > destination.index) {
        // 向上拖动
        const destTodo = curList[destination.index]
        const nextTodo = curList[destination.index - 1]
        sort = ((destTodo.sort || 1) + (nextTodo.sort || 1)) / 2
      } else if (source.index < destination.index) {
        // 向下拖动
        const destTodo = curList[destination.index]
        const nextTodo = curList[destination.index + 1]
        sort = ((destTodo.sort || 1) + (nextTodo.sort || 1)) / 2
      }
      const sourceUpdateData = {
        tId: curList[source.index].tId,
        sort: sort,
      }
      await updateTodo(sourceUpdateData)
    } else if (destination) {
      const destList = getDataListByType(destination.droppableId)
      const curList = getDataListByType(source.droppableId)
      let sort = 0
      if (destination.index === 0) {
        if (destination.index === 0) {
          sort = (destList[0]?.sort || getSort()) / 2
        }
      } else if (destination.index === destList.length) {
        sort = (destList[destList.length - 1].sort || 1) + 65535
      } else {
        const lastTodo = destList[destination.index]
        const curTodo = destList[destination.index - 1]
        sort = ((lastTodo.sort || 1) + (curTodo.sort || 1)) / 2
      }
      const sourceUpdateData = {
        tId: curList[source.index].tId,
        sort: sort,
        type: destination.droppableId as TodoType,
      }
      await updateTodo(sourceUpdateData)
    }
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
      setNoImUrList([...noImUrList, newTodo])
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
