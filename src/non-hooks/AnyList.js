import { Link, NavLink } from "react-router-dom"

const AnyList = ( { arrList, listClass, fallbackDisplay="list empty!" } ) => {
    return (
        <>
        { arrList.length ? 
            <ul className={ listClass }>
                {
                    arrList.map( ( item, i ) => {
                        return <li key={ i }> 
                                <p { ...item.parentsPara || {} }>
                                    { item.whichEl === "p" && item.label }
                                    { item.whichEl === "link" && <Link { ...item.passPara || {} }> { item.label } </Link> }
                                    { item.whichEl === "navlink" && <NavLink { ...item.passPara || {} } > { item.label } </NavLink> }
                                    { item.whichEl === "btn" && <button { ...item.passPara || {} } > { item.label } </button> }
                                </p> 
                            </li>
                    })
                }
            </ul>
        : 
        <p>
            { fallbackDisplay }
        </p>}
        </>
    )
}

export default AnyList;