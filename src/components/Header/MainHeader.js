import { useContext } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { UserContext } from "../UnderRootContent";
import LoggedHeader from "./LoggedHeader";
import NotLoggedHeader from "./NotLoggedHeader";
import './MainHeader.css';

const headerPaths = [
    "", "login", "register", "home", "profile/*", "establishment/*", "subscription/*"
]

const MainHeader = () => {
    const { user } = useContext( UserContext );

    return (
        <header className="fd">
            <div className="header-icon-con fd">
                <div className="header-point-generator" />
                <div className="header-sail-generator" />
                <h1>
                    <Link to={""} title="go to landpage">
                        Point of Sail
                    </Link>
                </h1>
            </div>
            {
                /* Logged and notLogged will not be removed for now, just in case I want something a bit more complicated than just a list for nav */
            }
            <Routes>
                <Route path="" element={ <div className={`${ user ? "logged" : "not-logged" }-hsects-con header-sections-con fd`}> <Outlet />  </div> }>
                    {
                        headerPaths.map( ( _path, i ) => {
                            return <Route path={ _path } element={ user ? <LoggedHeader /> : <NotLoggedHeader /> } key={ i } />
                        } )
                    }
                </Route>
            </Routes>
        </header>
    )
}

export default MainHeader;