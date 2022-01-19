import { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom"
import { MenuContext } from "../UnderRootContent";
import AsideNav from "./Aside/AsideNav";
import AsideScanner from "./Aside/AsideScanner";

const Main = () => {
    const { scannerOpen } = useContext( MenuContext );

    return (
        <main>
            {
            scannerOpen && <AsideScanner />
            }
            <Routes>   
            {
                [ "home", "profile/*", "establishment/*", "subscription/*" ]
                .map( ( _path, i ) => {
                    return <Route path={ _path } element={ <AsideNav /> } key={ i }/>
                } )
            }
            </Routes>
            <Outlet />
        </main>
    )
}

export default Main;