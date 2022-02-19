import { useContext } from "react";
import { Outlet } from "react-router-dom"
import { BackButton, RouteContext } from "../../../wrappers/LocationMonitor";
import CreateEstablishment from "./CreateEstablishment";

const EstablishmentWrapper = () => {
    const { subRoute } = useContext( RouteContext );

    return (
        <div>
            { subRoute === "own" ? <CreateEstablishment /> : <BackButton /> }
            <Outlet />
        </div>
    )
}

export default EstablishmentWrapper;