import { useEffect, useMemo, useState } from 'react'
import './SalesGraphNextPrev.css'

const SalesGraphNextPrev = ( { curEndDate, prevHandler, nextHandler } ) => {
    const tresHoldDay = useMemo(() => {
        const _dt = new Date();

        const curDay = _dt.getDate();
        const curMonth = _dt.getMonth() + 1;
        const curYear = _dt.getFullYear();

        return `${curYear}-${ curMonth < 10 ? "0" + curMonth : curMonth }-${ curDay < 10 ? "0" + curDay : curDay }`
    }, [])

    const handler = e => {
        e.preventDefault();
        if ( !prevHandler || !nextHandler ) return

        if ( e.target.innerText.includes( "Prev" ) ) prevHandler()
        else nextHandler()
    }

    return (
        <div className="graph-next-prev-con fd">
            <p className="prev-btn-con">
                <button type="button" onClick={ handler } > Previous </button>
            </p>
            <p className="next-btn-con">
                <button type="button" disabled={ curEndDate === tresHoldDay ? true : false } onClick={ handler } > Next </button>
            </p>
        </div>
    )
}

export default SalesGraphNextPrev;