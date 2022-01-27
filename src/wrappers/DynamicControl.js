import { useEffect, useState } from "react"
import AnyList from "../non-hooks/AnyList"

const ButtonControl = ( { label, handler, data=null } ) => {
    return (
        <p>
            <button
            type="button"
            onClick={ e=> {
                e.preventDefault();
                handler( data );
            } } >
                { label }
            </button>
        </p>
    )
}

const ChooseControl = ( { list, handler, objNameLabel, objNameData } ) => {
    const [ filterInp, setFilter ] = useState( "" );
    const [ listDisplay, setListDisplay ] = useState( [] );

    const listHandler = () => {
        let listArr = [];

        list.forEach( item => {
            listArr.push( {
                whichEl: "btn",
                label: item[ objNameLabel ],
                passPara: {
                    type: "button",
                    onClick: e => {
                        e.preventDefault();
                        handler( { [ objNameData ]: item[ objNameData ] } )
                    }
                }
            } )
        } );

        setListDisplay( listArr );
    }
    
    useEffect( () => {
        listHandler();
    }, [ list ] )

    return (
        <div className="list-control-con">
            <p className="list-control-search-con">
                <input type="text" value={ filterInp } onChange={ e => setFilter( e.target.value ) } />
            </p>
            <div className="list-control-list-con">
                <AnyList arrList={ listDisplay } listClass={ "input-control-list" } />
            </div>
        </div>
    )
}

const InputControl = ( { list, objNameTitle, handler, confirmer, submitter } ) => {

    const [ inputVal, setInputVal ] = useState( {} );
    const [ submitStat, setSubmitStat ] = useState( 0 );
    const [ confirmDetail, setConfirmDetail ] = useState( "" );

    useEffect( () => {
        let propers = {};

        list.forEach( inp => {
            propers[ inp.id ] = "";
        }  )

        setInputVal( propers );
    }, [ list ])

    const formSubmitHandler = e => {
        e.preventDefault();

        if ( submitStat === 0 ) {
            const conStr = confirmer( inputVal );
            setConfirmDetail( conStr );
            setSubmitStat( 1 );
        } else {
            const subObj = submitter( inputVal );
            handler( subObj );
        }
    }

    return (
        <div className="input-control-con">
            <div className="input-control-header-con">
                <h4>
                    {
                        objNameTitle?.["purpose"] || ""
                    }
                </h4>
                <p className="input-control-store">
                    {
                        objNameTitle?.["store"] || ""
                    }
                </p>
                <p className="input-control-product">
                    {
                        objNameTitle?.["product"] || ""
                    }
                </p>
                {
                    objNameTitle?.["sale"] &&
                <p className="input-control-sale">
                    {
                        objNameTitle?.["sale"]
                    }
                </p>
                }
            </div>
            <form onSubmit={ formSubmitHandler }>
                {   inputVal &&
                    list.map( ( inp, i ) => {
                        return <p key={ i }>
                            <label htmlFor={ inp.id }> { inp.label } </label>
                            <input type={ inp.type } 
                                onChange={ e => setInputVal( { ...inputVal, [inp.id]: e.target.value } ) } 
                                value={ inputVal[ inp.id ] || "" } />
                        </p>
                    } )
                }
                {
                    submitStat === 1 && 
                    <p className="confirm-detail-con">
                        {
                            confirmDetail
                        }
                    </p>
                }
                <p className="submit-btn-con">
                    <button type="submit">
                        {
                            submitStat === 0 ? "Confirm Details" : "Submit"
                        }
                    </button>
                </p>
            </form>
        </div>
    )
}

const confirmPanel = ( { title, details } ) => {
    return (
        <div className='confirm-panel-con'>
            <h4>
                {
                    title
                }
            </h4>
            {   
                details?.length && details.map( ( { _label, _info } ) => <p> <span> { _label } </span> <span> { _info } </span> </p> )
            }
        </div>
    )

}

const DynamicControl = ( { dynamicClass, dynamicDataHandler, thresholdStage=0, arrControl=null, curStage=null, addStageHandler=null, removeStageHandler=null } ) => {
    const btnStageNext = data => {
        dynamicDataHandler( data );
        addStageHandler();
    }

    const backStage = () => {
        removeStageHandler();
    }

    return (
        <div className={ `dynamic-control-con ${dynamicClass}-control-con` }>
            <div className={`${dynamicClass}-control`}>
                {
                    curStage <= thresholdStage &&
                    <>
                    {
                        !arrControl && !curStage ? "" :
                        <>
                            {   
                                /* { label, objName, data }*/
                                "btn" in arrControl[ curStage ] && arrControl[ curStage ]["btn"].map( ( item, i ) =>
                                <ButtonControl
                                    key={ i }
                                    label={ item.label } 
                                    handler={ btnStageNext } 
                                    data={ { purpose: item.data } } /> ) 
                            }
                            {
                                /* { list, objNameData, objNameLabel }*/
                                "cho" in arrControl[ curStage ] && 
                                <ChooseControl 
                                    list={ arrControl[ curStage ]["cho"].list || [] } 
                                    handler={ btnStageNext } 
                                    objNameData={ arrControl[ curStage ]["cho"].objNameData || "" }
                                    objNameLabel={ arrControl[ curStage ]["cho"].objNameLabel || "" } />
                            }
                            {
                                /* list of inp to display */
                                /* { list, objNameTitle, submitter, confirmer  } */
                                /* inside list: label, id, type */
                                /* inside objNameTitle: purpose, establishment, product, sale ( optional if editing sale ) */
                                "inp" in arrControl[ curStage ] &&
                                <InputControl 
                                    list={ arrControl[ curStage ]["inp"]?.list || [] }
                                    objNameTitle={ arrControl[ curStage ]["inp"]?.objNameTitle || "" }
                                    handler={ btnStageNext }
                                    confirmer={ arrControl[ curStage ]["inp"]?.confirmer || null }
                                    submitter={ arrControl[ curStage ]["inp"].submitter || null }/>
                            }
                        </>
                    }
                    {
                        curStage > 0 && 
                        <ButtonControl 
                            label={ "Back" }
                            handler={ backStage }
                        />
                    }
                    </>
                }
            </div>
        </div>
    )
}

export default DynamicControl;