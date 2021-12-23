import { useContext } from "react/cjs/react.development";
import { RouteContext } from "./LocationMonitor";

const AsideWrapper = ( { children } ) => {
    const { curRoute } = useContext( RouteContext );

    return (
        <aside className={`${curRoute.processed}-aside`}>
            { children }
        </aside>
    )
}

export default AsideWrapper;