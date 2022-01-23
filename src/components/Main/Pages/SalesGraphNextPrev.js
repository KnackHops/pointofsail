import { useMemo } from 'react'
import './SalesGraphNextPrev.css'

const SalesGraphNextPrev = ( { curEndDate, handler } ) => {
    const tresHoldDay = useMemo(() => {
        const _dt = new Date();

        const curDay = _dt.getDate();
        const curMonth = _dt.getMonth() + 1;
        const curYear = _dt.getFullYear();

        return `${curYear}-${ curMonth < 10 ? "0" + curMonth : curMonth }-${ curDay < 10 ? "0" + curDay : curDay }`
    }, [])

    const Btnhandler = e => {
        e.preventDefault();
        if ( !handler ) return

        handler( e.target.innerText )
    }

    return (
        <div className="graph-next-prev-con fd">
            <p className="prev-btn-con">
                <button type="button" onClick={ Btnhandler } > Previous </button>
            </p>
            <p className="next-btn-con">
                <button type="button" disabled={ curEndDate === tresHoldDay ? true : false } onClick={ Btnhandler } > Next </button>
            </p>
        </div>
    )
}

export default SalesGraphNextPrev;