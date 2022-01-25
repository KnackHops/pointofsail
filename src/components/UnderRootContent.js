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

    const yearEndComputeMinus = ( _year, _month ) => {
        if ( _month === 1 ) return [ _year - 1, 12 ]
        else return [ _year, _month - 1 ]
    }

    const yearEndComputePlus = ( _year, _month ) => {
        if ( _month === 12 ) return [ _year + 1, 1 ]
        else return [ _year, _month + 1 ]
    }

    const dateCompute = ( curDay, _month, _year, numberOfDays, whichDo ) => {
        let [ year, month ] = [ _year, _month ];
        let remainingDay = numberOfDays;
        // first assign the current date as the starting point
        let dates = [ { year, month, day: curDay } ];

        if ( whichDo === "add" ) {
            // if we are adding
            // get the current full days of the month
            let _d = new Date( year, month, 0 ).getDate();
            // get the current days + the remaining days to be added
            let day = remainingDay + curDay;
            // if day is less than full days of the month
            // we assign the current day + remaining day as the end month
            // else
            // we reduce the remaining day
            // by deducting the full days of the month to the remaining day and current day
            if ( day <= _d  ) dates.push( { year, month, day: curDay + remainingDay - 1 } )
            else remainingDay = day - _d;
        } else {
            // if remaining day is less than or equal to current day
            // we push the deducted date
            // else
            // we deduct the current days to the remaining days
            if ( remainingDay <= curDay ) dates.push( { year, month, day: curDay - remainingDay + 1 } )
            else remainingDay = remainingDay - curDay;
        }

        // if dates length is greater than 1
        // it means we don't have to loop
        let dateFlow = dates.length > 1 ? false : true;
        let day = null;

        while ( dateFlow ) {
            [ year, month ] = whichDo === "add" ? yearEndComputePlus( year, month ) : yearEndComputeMinus( year, month );
            let _d = new Date( year, month, 0 ).getDate();

            if ( remainingDay > _d ) {
                // deduct the total days of the month to the remainingDay
                // assign day as 0 to indicate full month
                remainingDay = remainingDay - _d;
                day = 0;
            } else {
                // if total days is more than remainingDay
                // just assign the remaing days to the month if adding
                // deduct the remaining day to the full month if minus
                // here we can stop the loop
                if ( whichDo === "add" ) day = remainingDay - 1;
                else day = _d - remainingDay + 1;
            }

            dates.push( { year, month, day } );


            if ( day ) dateFlow = false;
        }

        if ( whichDo === "sub" ) {
            let newDate = [];
            let dCounter = dates.length - 1;
            dates.forEach( d => {
                newDate.push( dates[ dCounter ] )

                dCounter = dCounter - 1;
            })

            dates = newDate;
        }

        return dates;
    }

    const monthDayStrMod = val => {
        return val < 10 ? "0" + val : val
    }

    const dateString = ( year, month, day ) => {
        return `${ year }-${ monthDayStrMod( month ) }-${ monthDayStrMod( day ) }`
    }

    const getDateDifference = ( predeterDate = null, _numberOfDays = null, whichDo="sub" ) => {
        let _dt = new Date();
        let curDay = predeterDate?.day || _dt.getDate();
        let _month = predeterDate?.month || _dt.getMonth() + 1;
        let _year = predeterDate?.year || _dt.getFullYear();

        const numberOfDays = _numberOfDays || new Date( _year, _month, 0 ).getDate();

        const dates = dateCompute( curDay, _month, _year, numberOfDays, whichDo  );
        
        let returnDates = [];

        if ( dates[0].year === dates[1].year && dates[0].month === dates[1].month ) {
            for ( let _d = dates[0].day; _d <= dates[1].day; _d++ ) {
                returnDates.push( dateString( dates[0].year, dates[0].month, _d ) )
            }
        } else {
            dates.forEach( ( date, i ) => {
                let startDay = i ? 1 : date.day;
                let endDay = i === dates.length - 1 ? date.day : new Date( date.year, date.month, 0 ).getDate();

                for ( let _d = startDay; _d <= endDay; _d++) {
                    returnDates.push( dateString( date.year, date.month, _d ) )
                }
            } )
        }

        return returnDates;
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
            <footer style={ { height: "40rem" } } >
                <p> footer </p>
            </footer>
        </>
        </FunctionContext.Provider>
        </UserContext.Provider>
        </MenuContext.Provider>
    )
}

export default UnderRootContent;
export { UserContext, MenuContext, FunctionContext };