import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RouteContext } from "../../wrappers/LocationMonitor";
import HeaderNav from "./HeaderNav";
import './LoggedHeader.css'
import Scanner from "./Scanner";

const LoggedHeader = () => {
    const [ panelOpen, setPanelOpen ] = useState( false );

    const { curRoute } = useContext( RouteContext );

    const panelHandler = () => {

        setPanelOpen( !panelOpen );
    }

    return (
        <>
            {
                curRoute.processed === "landpage" ?
                <div className="home-icon-con fd">
                    <Link to="/home" aria-label="Home" title="home">
                        <div className="home-icon-btn"></div>
                    </Link>
                </div> :
                <Scanner />
            }
            <div className={`-profile-panel-btn-con fd ${ panelOpen ? "-open-btn" : "-close-btn" }`}>
                <div onClick={ panelHandler } className="-profile-panel-btn -div-btn" title="open panel">
                </div>
            </div>
            <HeaderNav isLogged={ true } panelOpen={ panelOpen } handler={ panelHandler } />
        </>
    )
}

export default LoggedHeader;