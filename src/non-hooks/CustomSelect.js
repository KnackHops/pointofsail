import { useEffect, useState } from "react";
import './CustomSelect.css';

const CustomSelect = ( { arrList=[], handler=null, classCustom="", idAppend="none" } ) => {

    const [ selectedVal, setSelectedVal ] = useState( "" );
    const legacySelectVal = document.querySelector(`.${ classCustom }-select-hidden`)?.value;

    useEffect( () => {
        if ( legacySelectVal !== selectedVal ) setSelectedVal( legacySelectVal );
    }, [ legacySelectVal ] )

    const [ selectOpen, setSelectOpen ] = useState( false );

    const optionSelector = () => {
        const prevSel = document.querySelector( `.${classCustom}-select-hidden > option:checked` );
        const sel = document.querySelector( `#select_item_value_${ idAppend }_${ selectedVal }` );

        if ( sel === prevSel ) return;

        if ( prevSel ) prevSel.selected = false;
        if ( sel ) sel.selected = true;
    }

    useEffect( () => {
        if ( selectOpen ) setSelectOpen( false );
        if ( handler ) handler( selectedVal );
        optionSelector();
    }, [ selectedVal ] )

    return (
        <div className={`custom-select-con ${ classCustom }-select-con ${ selectOpen ? "-active" : ""  } `} onClick={ () => setSelectOpen( !selectOpen ) }>
            <select className={ `select-hidden ${ classCustom }-select-hidden` } style={ { position: "fixed", left: "500px", visibility: "hidden" } }>
                { arrList.map( ( item, i ) => <option key={i} id={ `select_item_value_${ idAppend }_${ item.value }` } value={ item?.value } > { item?.label } </option> ) }
            </select>
            <div 
                className="selected-value"
                data-display-text={ arrList.find( item => item?.value === selectedVal )?.["label"] || "Empty" }
            >
            <div className={`select-list-con ${ selectOpen ? "-active" : "" }`}>
                <div className="select-list-inside">
                    {
                        arrList.map( ( item, i ) => <div key={ i } className="select-item" data-display-text={ item?.label } onClick={ () => document.querySelector( `.${ classCustom }-select-hidden` ).value = item?.value }/> )
                    }
                </div>
            </div>
            </div>
        </div>
    )
}

export default CustomSelect;