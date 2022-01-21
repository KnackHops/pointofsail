import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import useUserCheck from "../hooks/useUserChecks";
import { login_data, user_data } from "../tempFolder/temp";
import { RouteContext } from "../wrappers/LocationMonitor";
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
const MenuContext = createContext();
const FunctionContext = createContext();

const UnderRootContent = () => {
    const [ user, setUser ] = useState( null );
    const { generalCheck } = useUserCheck();
    const navigate = useNavigate();

    const checkMachine = arr => {
        let foundError = false;

        arr.forEach( ( { status } ) => {
            if ( foundError ) return
            else foundError = !status.ok;

            if ( foundError ) window.alert( status.description );
        } )

        return !foundError
    }

    const logInHandler = ( { username, password } ) => {
        const _username = username.toLowerCase();
        const usernameChk = generalCheck( username, "username" );
        const passwordChk = generalCheck( password, "password" );
        
        const successChk = checkMachine( [ usernameChk, passwordChk ] );

        let _found_password;
        let _found_id;

        if ( successChk ) {
            login_data.forEach( log_user => {
                if ( log_user.username === _username ) {
                    _found_id = log_user.userid
                    _found_password = log_user.password;
                }
            } )
        }

        if ( _found_password ) {
            if ( _found_password !== password ) window.alert("Password is incorrect!")
            else {
                let _user = user_data.find( ( { id } ) => id === _found_id );

                _user = { username, ..._user }

                setUser( _user );
            }
        } else if ( successChk ) {
            window.alert("username does not exists!");
        }
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

    const { curRoute } = useContext( RouteContext );

    const [ scannerOpen, setScannerOpen ] = useState( false );

    const scannerMenuHandler = () => {
        setScannerOpen( !scannerOpen );
    }

    useEffect( () => {
        if ( scannerOpen ) scannerMenuHandler();
    }, [ curRoute ] )

    const getDateDifference = ( predefDate = false, numberOfDays = null ) => {
        let _dt = new Date();
        let curDay;
        let _year;
        let _month;

        if ( predefDate ) {
            curDay = predefDate?.day;
            _year = predefDate?.year;
            _month = predefDate?.month;
        } else {
            curDay = _dt.getDate();
            _year = _dt.getFullYear();
            _month = _dt.getMonth() + 1;
        }

        let daysInMonth = new Date( _year, _month, 0 ).getDate();

        let prevDaysInMonth = null;
        let prevYear;
        let prevMonth;

        // if number of days AND
        // curDay < numberOfDays AND month !== 1
        // OR
        // if not number of days AND
        // days in month > curDay AND month !== 1
        
        if ( ( numberOfDays && ( curDay < numberOfDays && _month !== 1 ) ) 
            || 
            ( !numberOfDays && ( daysInMonth > curDay && _month !== 1 ) ) ) 
        {
            prevYear = _year;
            prevMonth = _month - 1;
        }

        // if number of days AND
        // curDay < numberOfDays AND month === 1
        // OR
        // if not number of days AND
        // days in month > curDay AND month === 1

        if ( ( numberOfDays && ( curDay < numberOfDays && _month === 1 ) ) 
            || 
            ( !numberOfDays && ( daysInMonth > curDay && _month === 1 ) ) ) 
        {
            prevYear = _year - 1;
            prevMonth = 12;
        }
        if ( prevYear && prevMonth ) prevDaysInMonth = new Date( prevYear, prevMonth, 0 ).getDate();

        let returnDate = [];
        let startComp = 1;

        if ( prevDaysInMonth ) {
            let startDay;

            if ( numberOfDays ) {
                startDay = ( prevDaysInMonth + 1 ) - ( numberOfDays - curDay )
            } else {
                startDay = ( prevDaysInMonth + 1 ) - ( daysInMonth - curDay )
            }

            for ( let x = startDay; x <= prevDaysInMonth; x++ ) {
                returnDate.push( {
                    date: `${ prevYear }-${ prevMonth }-${ x }`
                } )
            }
        } else {
            if ( numberOfDays ) startComp+=curDay - numberOfDays
        }

        for ( let x = startComp; x <= curDay; x++ ) {
            returnDate.push( {
                date: `${ _year }-${ _month < 10 ? "0" + _month : _month }-${ x < 10 ? "0" + x : x }`
            } )
        }

        return returnDate;
    }

    return (
        <MenuContext.Provider value={ { scannerOpen, scannerMenuHandler } }>
        <UserContext.Provider value={ { user, logInHandler, registerHandler, logOutHandler } }>
        <FunctionContext.Provider value = { { getDateDifference } }>
        <>
            <MainHeader />
            <Routes>
                <Route path="/*" element={ <Main /> }>
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
        </FunctionContext.Provider>
        </UserContext.Provider>
        </MenuContext.Provider>
    )
}

export default UnderRootContent;
export { UserContext, MenuContext, FunctionContext };