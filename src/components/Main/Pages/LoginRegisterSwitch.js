import { useContext } from "react"
import { Link } from "react-router-dom";
import { RouteContext } from "../../../wrappers/LocationMonitor"

const LoginRegisterSwitch = () => {
    const { curRoute } = useContext( RouteContext );

    return (
        <div className={`${ curRoute.processed }-bf-nav-con -below-form-nav-con`}>
            <div className="-below-form-inside">
                <p>
                {
                    curRoute.processed === "login" ?
                    "Don't have an account? Sign up " 
                    :
                    "Already have an account? Sign in "
                }
                { <Link to={ curRoute.processed === "login" ? "/register" : "/login" }> Here </Link> }
                </p>
            </div>
        </div>
    )
}

export default LoginRegisterSwitch;