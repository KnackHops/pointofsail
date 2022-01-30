import { useContext, useEffect, useMemo, useState } from "react"
import { FunctionContext } from "../components/UnderRootContent";
import AnyList from "../non-hooks/AnyList";

const ButtonControl = ( { btnConClass="", btnsInfo=[], handler=null, multiple=false } ) => {
    return (
        <div className={`btn-control-con ${ btnConClass }-con`}>
            {
                // label, type, handler, data, keyName
                // if keyName does not exist, default "btnData" will be used
                // handler and data can not exist
                // if handler on inp is none existent
                // handler global is used
                // but even if that is empty
                // will console log
                btnsInfo.map( ( inp, i ) => 
                <p key={ i } > 
                    <button type={ inp?.type } onClick={ e => {
                        e.preventDefault();

                        let data = null;

                        if ( inp?.keyName ) data = { [ inp?.keyName ]: inp?.data }
                        else if ( inp?.data ) data = { "btnData": inp?.data }

                        if ( "handler" in inp ) inp.handler( data, multiple )
                        else if ( handler ) handler( data, multiple )
                        

                        if ( !"handler" in inp && !handler  ) console.log( "No handler for this button!" )
                    } }> 
                        { inp?.label }  
                    </button> 
                </p> )
            }
        </div>
    )
}

const ListControl = ( { listInfo, handler, keyName="listData", keyNameExtract="", keyNameLabelAppend=[], keyNameLabel=[], capitalizedKeyName=false, multiple=false } ) => {
    // listInfo is the list to be turned to an array for display
    // handler is used for the click of the item
    // keyName, the key for the object as it is passed in the handler
    // keyNameExtract, the key inside the object of the passed listInfo
    // keyNameLabel, the keys that will be used for the label

    const [ listDisplay, setListDisplay ] = useState( [] );

    const { upperCaser } = useContext( FunctionContext );

    useEffect( () => {
        let _listDisplay = [];

        listInfo.forEach( item => {

            let new_item = {};
            // checks if keyNameExtract exist in the item
            // otherwise the item won't be converted
            if ( keyNameExtract in item ) {
                // label for the button will be created through the designated item keyNameLabel
                // if capitalizedObjName is true, capitalized the objNames
                // keyNameLabel will be array
                // each item will be inside a span

                new_item.label = <> { keyNameLabel.map( ( _nameLabel, i ) => <span key={ i }> { keyNameLabelAppend?.[ i ] } { capitalizedKeyName ? upperCaser( item[_nameLabel] ) : item[_nameLabel] } </span> ) } </>


                // items will be buttons
                new_item.whichEl = "btn";
                // the parameters that will be passed on each item's button
                // type button
                // and the onClick parameter
                // will be using the passed handler
                // where it will pass the object created by using keyName as thek ey
                // and the corresponding item that has the key of keyNameExtract in the item
                // multiple will also be passed
                const obj = {
                    [ keyName ]: item?.[ keyNameExtract ]
                }

                new_item.passPara = {
                    type: "button",
                    onClick: () => {
                        handler( obj, multiple )
                    }
                }

                _listDisplay.push( new_item );
            }
        } )

        setListDisplay( _listDisplay );
    }, [ listInfo ] )

    return (
        <div className="list-control-con">
            <AnyList arrList={ listDisplay } listClass={ "list-control" } />
        </div>
    )
}

const InputControl = ( { inpInfo, multiple=false, confirmHandler, handler } ) => {
    // inpInfo is an array of datas to be extracted and turned to inputs
    // consist of
    // id, label, type, keyName, initValue
    // keyName will be used as the value to be passed later
    // confirmHandler outputs a value / element to show the user
    // confirmHandler returns an array of label and the value to be outputted
    const [ inputVal, setInputVal ] = useState( null );

    useState( () => {
        // we set the inputVal here
        // depending on the passed inpInfo
        let _inputVal = {};

        inpInfo.forEach( inp => {
            _inputVal[ inp?.[ "keyName" ] ] = inp?.[ "initValue" ];
        } )

        setInputVal( _inputVal )

    }, [ inpInfo ] )

    const [ confirmed, setConfirmed ] = useState( false );
    // confirmArr is an array
    // each item consist of a label and a value
    // each is to be extracted to span inside of a p of an item
    const [ confirmInfo, setConfirmInfo ] = useState( { _status: { ok: false, confirmArr: [ ] } } );
    // here we can choose to display an error or not
    const [ hasError, setHasError ] = useState( { has: false, errorMessage: "" } );

    useEffect( () => {
        if ( hasError.has ) {
            window.alert( hasError.errorMessage );
            // we set it false after displaying alert
            setHasError( { has: false, errorMessage: "" } );
        }
    }, [ hasError ] )

    useEffect( () => {
        // resets infos if confirmed is false
        if ( !confirmed ) setConfirmInfo( { _status: { ok: false, confirmArr: [ ] } } )
    }, [ confirmed ] )

    const submitHandler = () => {
        if ( confirmed ) {
            handler( inputVal, multiple )
        } else {
            // ok, and confirmArr will be passed to confirmInfo
            const { ok, confirmArr, _hasError } = confirmHandler( inputVal );

            if ( ok ) {
                // if we are ok on the confirmHandler we proceed
                setConfirmed( true );
                setConfirmInfo( { _status: { ok, confirmArr } } )
            } else {
                // if not we check if there is an error
                // if there is, we assign it to the hasError state
                // triggering a useEffect
                if ( _hasError.has ) setHasError( _hasError );
            }
        }
    }

    const btnsInfo = useMemo( () => {
        // if confirmed we are going to submit
        // else we are just confirming for the
        // user to review the infos
        let _btnsInfo = [ {
            label: confirmed ? "Submit" : "Confirm",
            type: "submit"
        } ]

        // if confirmed, we give the user
        // a chance to cancel if he/she wants to change
        // values
        if ( confirmed )  _btnsInfo.push( {
            label: "Cancel",
            type: "reset",
            handler: () => setConfirmed( !confirmed )
        } )

        return _btnsInfo;
    }, [ confirmed ] )
    
    return (
        <div className="input-control-con">
            <form>
                { inputVal &&
                    inpInfo.map( ( inp, i ) => {
                        return <p key={ i }>
                            <label htmlFor={ inp?.id }>
                                { inp?.label }
                            </label>
                            <input
                                disabled={ confirmed }
                                type={ inp?.type }
                                id={ inp?.id }
                                onChange={ e => setInputVal( { ...inputVal, [ inp[ "keyName" ] ]: e.target.value } ) } 
                                value={ inputVal?.[ inp[ "keyName" ] ] || "" }/>
                        </p>
                    })
                }
                {
                    confirmInfo?._status?.ok && 
                    confirmInfo?._status?.confirmArr.map( ( conf, i ) => {
                        return <p key={ i }> <span className="conf-label"> { conf.label } </span> <span className="conf-val"> { conf.value } </span> </p>
                    } )
                }
                <ButtonControl 
                    { ...{ btnsInfo } } 
                    handler={ submitHandler }/>
            </form>
        </div>
    )
}

const ReceiptControl = (  ) => {
    return (
        <div className="receipt-control-con">
            <h1> Receipt here </h1>
        </div>
    )
}

const DynamicControl = ( { curStage=0, stageHandler=null, stages = [ { } ], stageTreshold = 0, stageCheckpoint = 0, checkPointHandler = null, dynamicData = null, dynamicDataHandler = null  } ) => {
    // curStage is the current Stage
    // stageHandler handles changing the value of curStage
    // the value passed on it will be set through the useState method
    // stages are stages. arrays of obj
    // stageTreshold is the treshold in which the stage will "reset"
    // what it does really is. After adding a transaction/item to sell / edit
    // it will go back to certain stages
    // indicated by stageCheckpoint
    // then you are able to add another transaction/item to sell
    // or add another transaction/item to edit
    // dynamicData is the accumulation of datas passed as the stage progresses
    // dynamicDataHandler is the handler for dynamicData
    // do note
    // after looping through the stageCheckpoint for the first time
    // a new button will appear, a confirm one
    // if clicked
    // it will end the ongoing loop and deliver the necessary changes
    // these changes will be delivered from the parent possibly
    // by adding another parameter function that gets called once the button is pressed
    // button is pressed, then curStage will then be reset
    const [ transactionReady, setTransactionReady ] = useState( false );

    const btnStageNext = ( data, multiple ) => {
        // val, will come from the various handlers passed
        // btnStageNext will be passed on all the stages as handler for the next stage 
        if ( dynamicDataHandler ) dynamicDataHandler( data, multiple, curStage );

        if ( curStage === stageTreshold ) {
            if ( checkPointHandler ) checkPointHandler();
            setTransactionReady( true );
            stageHandler( stageCheckpoint );
            return;
        }

        if ( stageHandler ) stageHandler( curStage + 1 );
    }

    const btnStagePrev = () => {

        if ( !curStage ) return;
        if ( stageHandler ) stageHandler( curStage - 1 );
    }

    const backAndResetBtnArr = [
        {
            label: "Back",
            type: "button",
            handler: btnStagePrev
        },
        {
            label: "Reset",
            type: "reset",
            handler: () => stageHandler( 0 )
        }
    ]
    
    return (
        // all of the stage are objs passed that has three properties minimum
        // first one is multiple that can be set to true
        // if true, it means data will be inserted as stacks instead of overwrite
        // second is the final data
        // "btns"/"list"/"inp" + Info
        // and from there variations of other objects for specific uses
        <div className="dynamic-control-con">
            {
                curStage > 0 && <ReceiptControl />
            }
            {   stages[ curStage ] &&
                <>
                    {
                        // btnsInfo
                        // each item on the array contains
                        // _label, type, handler, keyName, and data
                        // data is passed to the handler
                        // data can be empty
                        // as well as the handlers
                        // global handler is for if, the item on the array don't have handler
                        // keyName is for the obj passed
                        "btns" in stages[ curStage ] && 
                        <ButtonControl 
                            btnsInfo={ stages[ curStage ][ "btns" ]?.[ "btnsInfo" ] || [] } 
                            handler={ btnStageNext } multiple={ stages["btns"]?.["multiple"] || false } />
                    }
                    {
                        // listInfo, keyName, keyNameExtract, keyNameLabel, keyNameLabelAppend, multiple
                        // keyName, is the key of the object that will be passed
                        // keyNameExtract, the key from the object of each item on the listInfo that will be extracted as the data to be passed
                        // keyNameLabel, the keys to be used as the label for each item on the list to display, this is an array
                        // keyNameLabelAppend, is a string used to append on the corresponding label with the same index
                        // can be left empty

                        "list" in stages[ curStage ] && 
                        <ListControl
                            listInfo={ stages[ curStage ][ "list" ]?.[ "listInfo" ] || [] } 
                            multiple={ stages[ curStage ][ "list" ]?.[ "multiple" ] || false }
                            handler={ btnStageNext } 
                            capitalizedKeyName={ stages[ curStage ][ "list" ]?.[ "capitalizedObjName" ] || "" }
                            keyName={ stages[ curStage ][ "list" ]?.[ "keyName" ] || "" }
                            keyNameExtract={ stages[ curStage ][ "list" ]?.[ "keyNameExtract" ] || "" }
                            keyNameLabel={ stages[ curStage ][ "list" ]?.[ "keyNameLabel" ] || [] }
                            keyNameLabelAppend={ stages[ curStage ][ "list" ]?.[ "keyNameLabelAppend" ] || [] }
                            />
                    }
                    {
                        // inpInfo
                        // label, id, type, keyName
                        // keyName will be the name of the key for t he object
                        // same key will create conflict on each instance made
                        "inp" in stages[ curStage ] &&
                        <InputControl
                            inpInfo={ stages[ curStage ][ "inp" ]?.[ "inpInfo" ] || [] }
                            multiple={ stages[ curStage ][ "inp" ]?.[ "multiple" ] || false }
                            confirmHandler={ stages[ curStage ][ "inp" ]?.[ "confirmHandler" ] || null }
                            handler={ btnStageNext } />
                    }
                </>
            }
            {
                transactionReady && <ButtonControl btnsInfo={ [ { _label: "Confirm Transaction", type: "submit", handler: () => console.log( dynamicData ) } ] }/>
            }
            {
                curStage > 0 && <ButtonControl btnsInfo={ backAndResetBtnArr } />
            }
        </div>
    )
}