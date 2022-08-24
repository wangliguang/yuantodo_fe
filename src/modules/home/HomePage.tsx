import {TodoHeader} from '../../components/TodoHeader/TodoHeader'

export function HomePage() {
  function renderPannel() {
    return (
      <div className="pannelWraper">
        <div className="pannel firstPannel">
          <div className="title">
            <p className="title_text">{`重要紧急 10`}</p>
            <button className="addBtn" onClick={() => {}}>
              +
            </button>
          </div>
        </div>

        <div className="pannel secondPannel">
          <div className="title">
            <p className="title_text">{`重要紧急 10`}</p>
            <button className="addBtn" onClick={() => {}}>
              +
            </button>
          </div>
        </div>

        <div className="pannel thirdPannel">
          <div className="title">
            <p className="title_text">{`重要紧急 10`}</p>
            <button className="addBtn" onClick={() => {}}>
              +
            </button>
          </div>
        </div>

        <div className="pannel fourthPannel">
          <div className="title">
            <p className="title_text">{`重要紧急 10`}</p>
            <button className="addBtn" onClick={() => {}}>
              +
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="main">
      <TodoHeader />
      {renderPannel()}
    </div>
  )
}
