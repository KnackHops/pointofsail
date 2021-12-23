import { useContext, useMemo } from "react"
import AnyList from "../../non-hooks/AnyList"
import { UserContext } from "../UnderRootContent"
import './HeaderNav.css';

const HeaderNav = ( { isLogged, panelOpen = "none" } ) => {
    const { logOutHandler } = useContext( UserContext );
    
    const loggedArr = useMemo( () => {
        return [
            {
                label: "Profile",
                whichEl: "navlink",
                passPara: {
                    to: "/profile"
                }
            },
            {
                label: "Subscription",
                whichEl: "navlink",
                passPara: {
                    to: "/subscription"
                }
            },
            {
                label: "Payment",
                whichEl: "navlink",
                passPara: {
                    to: "/subscription/payment"
                }
            },
            {
                label: "log out",
                whichEl: "btn",
                passPara: {
                    "aria-label" : "log out user",
                    type: "button",
                    onClick: e => {
                        e.preventDefault();
                        logOutHandler();
                    }
                }
            }
        ]
    }, [ logOutHandler ] )

    const notLoggedArr = useMemo( () => {
        return [
            {
                label: "login",
                whichEl: "navlink",
                passPara: {
                    to: "/login"
                }
            },
            {
                label: "register",
                whichEl: "navlink",
                passPara: {
                    to: "/register"
                }
            }
        ]
    }, [] )

    return (
        <nav className={`${ isLogged ? "-logged" : "-not-logged" }-nav header-nav ${ panelOpen !== "none" ? ( panelOpen ? "-open" : "-close" ) : "" } `}>
            <AnyList arrList={ isLogged ? loggedArr : notLoggedArr } listClass={ "header-nav-list fd" } />
        </nav>
    )
}

export default HeaderNav;