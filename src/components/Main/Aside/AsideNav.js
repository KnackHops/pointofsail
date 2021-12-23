import AnyList from "../../../non-hooks/AnyList";
import AsideWrapper from "../../../wrappers/AsideWrapper"

const arrList = [
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
            to: "/establishment"
        }
    },
    {
        label: "Profile",
        whichEl: "navlink",
        passPara: {
            to: "/profile"
        }
    },
    {
        label: "Companions",
        whichEl: "navlink",
        passPara: {
            to: "/profile/companions"
        }
    }
]

const AsideNav = () => {
    return (
        <AsideWrapper>
            <nav className="aside-nav">
                <AnyList arrList={ arrList } listClass={"aside-nav-list"} />
            </nav>
        </AsideWrapper>
    )
}

export default AsideNav;