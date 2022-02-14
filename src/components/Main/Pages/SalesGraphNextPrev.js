import './SalesGraphNextPrev.css'

const SalesGraphNextPrev = ( { handler, resetHandler } ) => {

    const Btnhandler = e => {
        e.preventDefault();
        if ( !handler ) return

        handler( e.target.innerText )
    }

    const resetBtn = e => {
        e.preventDefault();

        resetHandler();
    }

    return (
        <div className="graph-next-prev-con fd">
            <p className="prev-btn-con">
                <button type="button" onClick={ Btnhandler } > Previous </button>
            </p>
            <p>
                <button type='reset' onClick={ resetBtn }> Reset </button>
            </p>
            <p className="next-btn-con">
                <button type="button" onClick={ Btnhandler } > Next </button>
            </p>
        </div>
    )
}

export default SalesGraphNextPrev;