import { Outlet, Route, Routes } from "react-router-dom"
import AsideNav from "./Aside/AsideNav";

const Main = () => {
    return (
        <main>
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