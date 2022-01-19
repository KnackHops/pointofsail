import HeaderNav from "./HeaderNav"
import './NotLoggedHeader.css'

const NotLoggedHeader = () => {
    return (
        <>
            <HeaderNav isLogged={ false } />
        </>
    )
}

export default NotLoggedHeader;