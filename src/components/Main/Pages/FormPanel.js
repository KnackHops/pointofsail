import { useMemo, useState } from "react"

const FormPanel = ( { arrInputs, arrBtns, formClass="" } ) => {
    const [ inputs, setInputs ] = useState( false );

    const initInputs = useMemo( () => {
        let inputObj = {};

        arrInputs.forEach( inp => {
            inputObj = { ...inputObj, [ inp.id ]: "" }
        } )

        setInputs( inputObj )

        return inputObj;
    }, [] )

    const btnHandler = ( e, handler ) => {
        e.preventDefault()

        const inputVal = inputs;

        setInputs( initInputs )
        
        if ( handler ) handler( inputVal )
    }

    return ( 
        <div className={`${ formClass }-form-con`}>
            { inputs &&
                <form className={`${ formClass }-form`}>
                    {
                        // arr inputs has
                        // id, type, aria, and label inside
                        arrInputs.map( ( inp, i ) => {
                            return <p key={ i }>

                                {
                                    // if not aria then we display label
                                    !inp.aria && 
                                    <label htmlFor={ inp.id }>
                                        { inp.label }
                                    </label> 
                                }

                                <input 
                                    type={ inp.type } 
                                    id={ inp.id } 
                                    title={ inp.title }
                                    value={ inputs?.[ inp.id ] || "" } 
                                    aria-label={ inp.aria ? inp.label : "" }
                                    onChange={ e => setInputs( { ...inputs, [ inp.id ]: e.target.value } ) }/>
                            </p>
                        } )
                    }
                    <p>
                        {
                            // arr btns
                            arrBtns.map( ( btn, i ) => {
                                return <button key={ i } type={ btn.type } onClick={ e => btnHandler( e, btn.handler ) } >
                                    { btn.label }
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