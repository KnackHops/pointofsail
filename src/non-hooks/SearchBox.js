import { useEffect, useState } from "react";
import AnyList from "./AnyList";

const SearchBox = ( { searchLabel="", searchid="", listDock=false, arrList=[] } ) => {
    const [ filteredList, setFiltered ] = useState( [] );

    useEffect( () => {
        setSearch( "" );
        setFiltered( arrList );
    }, [ arrList ] )

    const [ searchInp, setSearch ] = useState( "" );

    useEffect( () => {

    }, [ searchInp ] )

    return (
        <div className="searchbox-con">
            <p className="searchinput-con">
                <label htmlFor={ searchid }> { searchLabel ? searchLabel : "Search" } </label>
                <input id={ searchid } value={ searchInp } onChange={ e => setSearch( e.target.value ) } />
            </p>
            <p className="searchbutton-con">
                <button> </button>
            </p>
            {
                ( listDock || "" ) &&
                <div className={ `list-dock-con ${ listDock && "-docked" }` }>
                    <AnyList arrList={ filteredList } listClass="list-dock" />
                </div>
            }
        </div>  
    )
}

export default SearchBox;