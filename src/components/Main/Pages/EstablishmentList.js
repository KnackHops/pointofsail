import { useEffect, useState } from "react"
import AnyList from "../../../non-hooks/AnyList";

const EstablishmentList = ( { establishments } ) => {
    const [ establishmentDisplay, setEstablishmentDisplay ] = useState( [] );

    useEffect( () => {
        const esList = [];
        
        establishments.map( es => {
            esList.push( {
                label: es.establishment_name,
                whichEl: "link",
                passPara: {
                    to: `/establishment/id${es.establishment_id}`
                } 
            } )
        } )

        setEstablishmentDisplay( esList )

    }, [ establishments ] )

    return (
        <div className="establishment-list-con">
            <h3> Establishments </h3>
            <AnyList arrList={ establishmentDisplay } listClass={"establishment-list"} />
        </div>
    )
}

export default EstablishmentList;