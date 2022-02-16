import { useState } from "react";
import AnyList from "../../../non-hooks/AnyList";
import './DynamicListWrapper.css';

const DynamicListWrapper = ( { listClass, arrLoader, arrCheck, listHeader, arrDisplay } ) => {
    const [ isOpen, setIsOpen ] = useState( false );

    const listOpener = e => {
        e.preventDefault();

        if ( !arrCheck ) arrLoader();
        
        setIsOpen( !isOpen )
    }
    
    return (
        <div className={ `${ listClass }-dynamic-con dynamic-list-con` }>
            <h3>
                <button onClick={ listOpener }>
                    { listHeader }
                </button>
            </h3>
            <div className={ `${ listClass }-con ${ isOpen ? "-active" : "" }` }>
                {
                    isOpen && <AnyList arrList={ arrDisplay } listClass={ `${ listClass }` } />
                }
            </div>
        </div>
    )
}

export default DynamicListWrapper;