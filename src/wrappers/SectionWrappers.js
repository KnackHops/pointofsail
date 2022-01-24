import { useContext } from "react";
import { RouteContext } from "./LocationMonitor";
import './SectionWrapper.css';

const SectionWrappers = ( { sectionTitle=null, children } ) => {
    const { curRoute } = useContext( RouteContext );
    return ( 
        <section className={`${ curRoute.processed }-section main-section fd`}>
            <div className="section-inside">
                <div className="section-title width-standard">    
                    {
                        sectionTitle
                    }
                </div>
                {
                    children
                }
            </div>
        </section>
    )
}

export default SectionWrappers;