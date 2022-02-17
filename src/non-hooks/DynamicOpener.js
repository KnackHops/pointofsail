import { useState } from "react"

const DynamicOpener = ( { children, dynamicClass="", loadHandler=null, btnLabel="" } ) => {
    const [ isOpen, setIsOpen ] = useState( false );

    const openHandler = e => {
        e.preventDefault();

        if ( loadHandler ) loadHandler();

        setIsOpen( !isOpen );
    }

    return (
        <div className={`dynamic-con ${ dynamicClass }-con`}>
            <p>
                <button type="button" onClick={ openHandler }> { btnLabel || "Open" } </button>
            </p>
            <div className={`${ dynamicClass }-inside ${ isOpen ? "-active" : "" }`}>
                { isOpen && children }
            </div>
        </div>
    )
}

export default DynamicOpener;