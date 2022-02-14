import { useMemo, useContext } from "react";
import AnyList from "../../../non-hooks/AnyList";
import AsideWrapper from "../../../wrappers/AsideWrapper"
import { UserContext } from "../../UnderRootContent";
import './AsideNav.css';

const AsideNav = () => {

    const { user } = useContext( UserContext );

    const arrList = useMemo( () => {
        return [
            {
                label: "Home",
                whichEl: "navlink",
                passPara: {
                    to: "/Home"
                }
            },
            {
                label: "Establishment",
                whichEl: "navlink",
                passPara: {
                    to: "/establishment/own"
                }
            },
            {
                label: "Profile",
                whichEl: "navlink",
                passPara: {
                    to: `/profile/user/${user?.username}`
                }
            },
            {
                label: "Companions",
                whichEl: "navlink",
                passPara: {
                    to: `/profile/user/${user?.username}/companions`
                }
            }
        ]
    }, [ user ] )
    return (
        <AsideWrapper  asideClass={"fd aside-nav-con"}>
            <nav className="aside-nav">
                <AnyList arrList={ arrList } listClass={"aside-nav-list fd"} />
            </nav>
        </AsideWrapper>
    )
}

export default AsideNav;