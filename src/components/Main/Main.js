import { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom"
import { MenuContext } from "../UnderRootContent";
import AsideNav from "./Aside/AsideNav";
import AsideScanner from "./Aside/AsideScanner";
import './Main.css';

const Main = () => {
    const { scannerOpen } = useContext( MenuContext );

    return (
        <main>
            {
                // inventory for establishment
                // when a establishment is clicked
                // and a store is clicked
                // we show the inventory along with informations
                // gross price
                // quantity
                // give a list of sales made
                // date the purchase was made
                // gross price, base price, net, quantity purchased, date purchase was made
                // total info graph will only be shown at each product page to avoid confusion
                // Home will show gross
                // Net will be show to admin/permissioned personnel
                // as well as unpaids
                // still figuring out data relationship, and flow
            }
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