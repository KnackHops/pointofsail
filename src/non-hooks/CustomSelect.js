import { useEffect, useState } from "react";
import './CustomSelect.css';

const CustomSelect = ( { arrList=[], handler=null, classCustom="" } ) => {

    const [ selectedVal, setSelectedVal ] = useState( "" );

    const [ selectOpen, setSelectOpen ] = useState( false );

    useEffect( () => {
        if ( selectOpen ) setSelectOpen( false );
        if ( handler ) handler( selectedVal );
    }, [ selectedVal ] )

    return (
        <div className={`custom-select-con ${ classCustom }-select-con ${ selectOpen ? "-active" : ""  } `} onClick={ () => setSelectOpen( !selectOpen ) }>
            <select className={ `select-hidden ${ classCustom }-select-hidden` } 
                style={ { position: "fixed", left: "-200%", visibility: "hidden" } } 
                value={ selectedVal } 
                onChange={ e => setSelectedVal( e.target.value ) } >
                { arrList.map( ( item, i ) => <option key={i} value={ item?.value } > { item?.label } </option> ) }
            </select>
            <div 
                className="selected-value"
                data-display-text={ arrList.find( item => item?.value === selectedVal )?.["label"] || arrList[0].label }
            >
            <div className={`select-list-con ${ selectOpen ? "-active" : "" }`}>
                <div className="select-list-inside">
                    {
                        arrList.map( ( item, i ) => <div key={ i } className="select-item" data-display-text={ item?.label } onClick={ () => setSelectedVal( item?.value ) }/> )
                    }
                </div>
            </div>
            </div>
        </div>
    )
}

export default CustomSelect;