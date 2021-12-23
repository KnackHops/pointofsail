import { Link, NavLink } from "react-router-dom"

const AnyList = ( { arrList, listClass, fallbackDisplay="list empty!" } ) => {
    return (
        <>
        { arrList.length ? 
            <ul className={ listClass }>
                {
                    arrList.map( ( item, i ) => {
                        if ( item.whichEl === "p" )  return <li key={ i }> <p { ...item.passPara } > { item.label } </p> </li>
                        return <li key={ i }> 
                                <p>
                                    { item.whichEl === "link" && <Link { ...item.passPara }> { item.label } </Link> }
                                    { item.whichEl === "navlink" && <NavLink { ...item.passPara } > { item.label } </NavLink> }
                                    { item.whichEl === "btn" && <button { ...item.passPara } > { item.label } </button> }
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