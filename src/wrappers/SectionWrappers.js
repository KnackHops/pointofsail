import { useContext } from "react";
import { RouteContext } from "./LocationMonitor";
import './SectionWrapper.css';

const SectionWrappers = ( { children } ) => {
    const { curRoute } = useContext( RouteContext );

    return ( 
        <section className={`${ curRoute.processed }-section main-section fd`}>
            <div className="section-inside">
                {
                    children
                }
            </div>
        </section>
    )
}

export default SectionWrappers;