import {TodoHeader} from '../../components/TodoHeader/TodoHeader'

export function HomePage() {
  const marginValue = '10px'

  function renderPannel() {
    return (
      <div>
        <div className="column">
          <div style={{backgroundColor: 'rgb(248,121,110)'}} className="title">
            <p className="title_text">{`重要紧急 10`}</p>
            <button className="addBtn" onClick={() => {}}>
              +
            </button>
          </div>
        </div>

        <div className="column" style={{marginBottom: marginValue, backgroundColor: 'rgb(255,228,222)'}}>
          <div style={{backgroundColor: 'rgb(248,121,110)'}} className="title">
            <p className="title_text">{`重要紧急 10`}</p>
            <button className="addBtn" onClick={() => {}}>
              +
            </button>
          </div>
        </div>

        <div className="column" style={{marginBottom: marginValue, backgroundColor: 'rgb(255,228,222)'}}>
          <div style={{backgroundColor: 'rgb(248,121,110)'}} className="title">
            <p className="title_text">{`重要紧急 10`}</p>
            <button className="addBtn" onClick={() => {}}>
              +
            </button>
          </div>
        </div>

        <div className="column" style={{marginBottom: marginValue, backgroundColor: 'rgb(255,228,222)'}}>
          <div style={{backgroundColor: 'rgb(248,121,110)'}} className="title">
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
