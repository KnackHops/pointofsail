import { useContext, useMemo } from "react"
import AnyList from "../../non-hooks/AnyList"
import { UserContext } from "../UnderRootContent"
import './HeaderNav.css';

const HeaderNav = ( { isLogged, panelOpen = "none", handler = null } ) => {
    const { logOutHandler } = useContext( UserContext );
    const { user } = useContext( UserContext );
    
    const loggedArr = useMemo( () => {
        return [
            {
                label: "Profile",
                whichEl: "navlink",
                parentsPara: {
                    onClick: handler
                },
                passPara: {
                    to: `/profile/user/${ user?.username }`
                }
            },
            {
                label: "Subscription",
                whichEl: "navlink",
                parentsPara: {
                    onClick: handler
                },
                passPara: {
                    to: `/profile/user/${ user?.username }/subscription`
                }
            },
            {
                label: "Payment",
                whichEl: "navlink",
                parentsPara: {
                    onClick: handler
                },
                passPara: {
                    to: `/profile/user/${ user?.username }/payment`
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
    }, [ logOutHandler, handler, user ] )

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