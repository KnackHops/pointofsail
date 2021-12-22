import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

const initCur = {
    processed: "",
    raw: ""
}

const LocationMonitor = ( { children } ) => {
    const [ curRoute, setCurRoute ] = useState( initCur );
    const [ subRoute ] = useState("")

    const location = useLocation();

    useEffect( () => {
        console.log( location );
    }, [ location ] )
    
    return (
        <div id="under_root">
            { children }
        </div>
    )
}

export default LocationMonitor;