import { createContext, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import useUserCheck from "../hooks/useUserChecks";
import MainHeader from "./Header/MainHeader";
import Main from "./Main/Main";
import Establishment from "./Main/Pages/Establishment";
import Home from "./Main/Pages/Home";
import LandPage from "./Main/Pages/LandPage";
import Login from "./Main/Pages/Login";
import Profile from "./Main/Pages/Profile";
import Register from "./Main/Pages/Register";
import Subscription from "./Main/Pages/Subscription";

const UserContext = createContext();

const UnderRootContent = () => {
    const [ user, setUser ] = useState( null );
    const { generalCheck } = useUserCheck();
    const navigate = useNavigate();

    const checkMachine = arr => {
        let foundError = false;

        arr.forEach( chk => {
            if ( foundError ) return

            if ( !chk.status.ok ) {
                foundError = true;
                window.alert( chk.status.description )
            }
        } )

        return !foundError
    }

    const logInHandler = ( { username, password } ) => {
        const usernameChk = generalCheck( username, "username" );
        const passwordChk = generalCheck( password, "password" );
        
        const successChk = checkMachine( [ usernameChk, passwordChk ] );

        if ( successChk ) setUser( { username, password } )
    }

    const logOutHandler = () => {
        setUser( null );
        navigate( "/login" )
    }

    const registerHandler = ( { username, password, email, mobile, name } ) => {
        const nameChk = generalCheck( name, "name" );
        const usernameChk = generalCheck( username, "username" );
        const passwordChk = generalCheck( password, "password" );
        const emailChk = generalCheck( email, "email" );
        const mobileChk = generalCheck( mobile, "mobile" );

        const successChk = checkMachine( [ nameChk, usernameChk, passwordChk, emailChk, mobileChk ] );
        
        if ( successChk ) console.log( username, password )
    }

    return (
        <UserContext.Provider value={ { user, logInHandler, registerHandler, logOutHandler } }>
        <>
            <MainHeader />
            <Routes>
                <Route path="" element={ <Main /> }>
                    <Route index element={ <LandPage /> } />
                    <Route path="login" element={ user ? <Navigate replace to="/home" /> : <Login /> } />
                    <Route path="register" element={ user ? <Navigate replace to="/home" /> : <Register /> } />
                    <Route path="home" element={ user ? <Home /> : <Navigate replace to="/" /> } />
                    <Route path="profile/*" element={ user ? <Profile /> : <Navigate replace to="/" /> } />
                    <Route path="establishment/*" element={ user ? <Establishment /> : <Navigate replace to="/" /> } />
                    <Route path="subscription/*" element={ user ? <Subscription /> : <Navigate replace to="/" /> } />
                </Route>
            </Routes>
        </>
        </UserContext.Provider>
    )
}

export default UnderRootContent;
export { UserContext };