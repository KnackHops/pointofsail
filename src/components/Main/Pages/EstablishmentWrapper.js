import { useContext } from "react";
import { Outlet } from "react-router-dom"
import { BackButton, RouteContext } from "../../../wrappers/LocationMonitor";

const EstablishmentWrapper = () => {
    const { subRoute } = useContext( RouteContext );
    
    return (
        <div>
            { subRoute !== "own" && <BackButton /> }
            <Outlet />
        </div>
    )
}

export default EstablishmentWrapper;