import { useEffect, useMemo, useState } from "react";
import DynamicOpener from "../../../non-hooks/DynamicOpener";
import SearchBox from "../../../non-hooks/SearchBox";
import { findUser } from "../../../tempFolder/temp";
import FormPanel from "./FormPanel";

const CreateEstablishment = () => {
    const [ whichDisplay, setDisplay ] = useState( 0 );
    const [ arrList, setArrList ] = useState( [] );

    const searchedUser = userid => {
        console.log( userid )
    }

    const searchUsers = searchVal => {
        // fetch users from api
        const users = searchVal ? findUser( searchVal ) : [];

        const _arrList = [];

        _arrList.push( { 
            label: `Name / Username`,
            whichEl: "p"
         } )

        users.forEach( user => {
            _arrList.push( {
                label: `${ user.name } / ${ user.username }`,
                whichEl: "btn",
                passPara: {
                    type: "button",
                    onClick: () => searchedUser( user.userid )
                }
            } )
        } )

        setArrList( _arrList )
    }

    useEffect( () => {
        if ( whichDisplay === 1 ) {

        }
    }, [ whichDisplay ] )

    const arrInputs = useMemo( () => {

        return [
            {
                label: "Establishment Name:",
                type: "text",
                id: "establishment_name",
                title: "Establishment name here",
                aria: false
            },
            {
                label: "Contact",
                type: "text",
                id: "establishment_contact",
                title: "Contact number for establishment here",
                aria: false
            },
            {
                label: "Address",
                type: "address",
                id: "establishment_address",
                title: "Address for establishment here",
                aria: false
            }
        ]
    }, [] )

    const arrBtns = useMemo( () => {
        return [
            {
                label: "Create",
                type: "submit",
                handler: val => setDisplay( whichDisplay + 1 )
            }
        ]
    }, [] )

    const resetDisplay = ( e = null ) => {
        if ( e ) e.preventDefault()
        setDisplay( 0 );
    }

    useEffect( () => {
        // resets whichdisplay
        if ( whichDisplay === 3 ) resetDisplay();
    }, [ whichDisplay ] )

    const backDisplay = e => {
        e.preventDefault();

        setDisplay( whichDisplay - 1 )
    }

    return (
        <DynamicOpener dynamicClass="create-establishment" btnLabel="Create Establishment Entry">
            <h4> Create an establishment here </h4>
            { whichDisplay === 0 && <FormPanel { ...{ arrInputs, arrBtns } } formClass={ "create-establishment" } /> }
            { whichDisplay === 1 && 
            <>
                <SearchBox searchLabel="Add user for the company through their username/name" searchid="create-establishment" listDock={true} arrList={ arrList } searchHandler={ searchUsers } />
                <p>
                    <button type="button" onClick={ () => setDisplay( whichDisplay + 1 ) }> Done </button>
                </p>
            </> }
            { whichDisplay !== 0 && 
            <div className="btn-con">
                <p className="back-btn-con"> <button type="button" onClick={ backDisplay } > Back </button> </p>
                <p className="reset-btn-con"> <button type="reset" onClick={ resetDisplay } > Reset </button> </p>
            </div> }
        </DynamicOpener>
    )
}

export default CreateEstablishment;