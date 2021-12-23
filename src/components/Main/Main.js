import { Outlet, Route, Routes } from "react-router-dom"
import AsideNav from "./Aside/AsideNav";

const Main = () => {
    return (
        <main>
            <Routes>   
            {
                [ "home", "profile/*", "establishment/*", "subscription/*" ]
                .map( _path => {
                    return <Route path={ _path } element={ <AsideNav /> } />
                } )
            }
            </Routes>
            <Outlet />
        </main>
    )
}

export default Main;