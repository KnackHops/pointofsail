const buttonControl = () => {
    return (
        <p>
            <button>

            </button>
        </p>
    )
}

const listControl = () => {
    return (
        <div className="list-control-con">
            <div className="list-control-btn-con">

            </div>
            <div className="list-con">

            </div>
        </div>
    )
}

const inputControl = () => {
    return (
        <div className="input-control-con">
            
        </div>
    )
}

const DynamicControl = ( { dynamicClass } ) => {
    return (
        <div className={ `dynamic-control-con ${dynamicClass}-control-con` }>
            <div className={`${dynamicClass}-control`}>
            </div>
        </div>
    )
}

export default DynamicControl;