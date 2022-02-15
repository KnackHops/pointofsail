import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { provideEstablishmentData } from "../../../tempFolder/temp";
import SectionWrappers from "../../../wrappers/SectionWrappers"
import { UserContext } from "../../UnderRootContent";
import EstablishmentList from "./EstablishmentList";
import EstablishmentPage from "./EstablishmentPage";
import EstablishmentWrapper from "./EstablishmentWrapper";

const Establishment = () => {
    const { user } = useContext( UserContext );
    const [ establishments, setEstablishments ] = useState( [] );

    useEffect( () => {
        const esList = provideEstablishmentData( user.id );
        setEstablishments( esList )
    }, [] )

    return (
        <SectionWrappers sectionTitle={ <h1>Establishment</h1> }>
            <Routes>
                <Route path={ "/" } element={ <EstablishmentWrapper /> }>
                    <Route path={"own"} element={ <EstablishmentList establishments={ establishments } /> }/>
                    <Route path={"id:establishment_id/*"} element={ <EstablishmentPage establishments={ establishments }/> }/>
                </Route>
            </Routes>
        </SectionWrappers>
    )
}

export default Establishment;