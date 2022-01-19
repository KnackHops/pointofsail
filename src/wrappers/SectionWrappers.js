import { useContext } from "react";
import { RouteContext } from "./LocationMonitor";

const SectionWrappers = ( { children } ) => {
    const { curRoute } = useContext( RouteContext );

    return ( 
        <section className={`${ curRoute.processed }-section main-section`}>
            {
                children
            }
        </section>
    )
}

export default SectionWrappers;