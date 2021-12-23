import { useContext, useEffect, useMemo, useState } from "react"
import { RouteContext } from "../../../wrappers/LocationMonitor";

const FormPanel = ( { arrInputs, arrBtns, extraClass="" } ) => {
    const { curRoute } = useContext( RouteContext );
    const [ inputs, setInputs ] = useState( false );

    const initInputs = useMemo( () => {
        let inputObj = {};

        arrInputs.forEach( inp => {
            inputObj = { ...inputObj, [ inp.id ]: "" }
        } )

        setInputs( inputObj )

        return inputObj;
    }, [] )

    const btnHandler = ( e, handler, type ) => {
        e.preventDefault()

        const inputVal = inputs;

        setInputs( initInputs )

        if ( type === "submit" ) handler( inputVal )
        else if ( type === "button" ) handler()
    }

    return ( 
        <div className={`${ curRoute.processed }-form-con`}>
            { inputs &&
                <form className={`${ curRoute.processed }-form ${ extraClass }`}>
                    {
                        arrInputs.map( ( inp, i ) => {
                            return <p key={ i }>
                                <label htmlFor={ inp._id }>
                                    { inp._label }
                                </label>
                                <input type={ inp._type } id={ inp._id } value={ inputs?.[ inp._id ] || "" } onChange={ e => setInputs( { ...inputs, [ inp._id ]: e.target.value } ) }/>
                            </p>
                        } )
                    }
                    <p>
                        {
                            arrBtns.map( ( btn, i ) => {
                                return <button key={ i } type={ btn._type } onClick={ e => btnHandler( e, btn.handler, btn._type ) } >
                                    { btn._label }
                                </button>
                            } )
                        }
                    </p>
                </form>
            }
        </div>
     )
}

export default FormPanel;