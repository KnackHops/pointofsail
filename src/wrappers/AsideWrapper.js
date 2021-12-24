import { useContext } from "react/cjs/react.development";
import { RouteContext } from "./LocationMonitor";

const AsideWrapper = ( { children, asideClass } ) => {
    const { curRoute } = useContext( RouteContext );

    return (
        <aside className={`${curRoute.processed}-aside ${asideClass}`}>
            { children }
        </aside>
    )
}

export default AsideWrapper;