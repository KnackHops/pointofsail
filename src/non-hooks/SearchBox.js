import { useEffect, useState } from "react";
import AnyList from "./AnyList";

const SearchBox = ( { searchLabel="", searchid="", listDock=false, arrList=[], serachBtn=false, searchHandler=null } ) => {
    // arrList identical to Anylist Arrlist
    // except for each obj having a searchValue property
    // used for the search itself along with the label

    const [ searchInp, setSearch ] = useState( "" );

    useEffect( () => {
        if ( searchHandler ) searchHandler( searchInp );
    }, [ searchInp ] )

    return (
        <div className="searchbox-con">
            <p className="searchinput-con">
                <label htmlFor={ searchid }> { searchLabel ? searchLabel : "Search" } </label>
                <input id={ searchid } value={ searchInp } onChange={ e => setSearch( e.target.value ) } />
            </p>
            {
                serachBtn &&    
            <p className="searchbutton-con">
                <button> Search </button>
            </p>
            }
            {
                ( listDock || searchInp ) &&
                <div className={ `list-dock-con ${ listDock && "-docked" }` }>
                    <AnyList arrList={ arrList } listClass="list-dock" />
                </div>
            }
        </div>  
    )
}

export default SearchBox;