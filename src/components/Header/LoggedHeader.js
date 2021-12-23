import { useState } from "react";
import HeaderNav from "./HeaderNav";
import './LoggedHeader.css'

const LoggedHeader = () => {
    const [ panelOpen, setPanelOpen ] = useState( false );

    const panelHandler = e => {
        if ( e ) e.preventDefault()

        setPanelOpen( !panelOpen );
    }

    return (
        <>
            <p>
                <button onClick={ panelHandler }>
                    open panel
                </button>
            </p>
            <HeaderNav isLogged={ true } panelOpen={ panelOpen } />
        </>
    )
}

export default LoggedHeader;