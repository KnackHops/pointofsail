import { useContext, useMemo } from "react";
import SectionWrappers from "../../../wrappers/SectionWrappers"
import { UserContext } from "../../UnderRootContent";
import FormPanel from "./FormPanel";
import LoginRegisterSwitch from "./LoginRegisterSwitch";

const Login = () => {
    const { logInHandler } = useContext( UserContext );

    const arrInputs = useMemo( () => {
        return [
            {
                label: "Username",
                id: "username",
                type: "text",
                aria: false
            },
            {
                label: "Password",
                id: "password",
                type: "password",
                aria: false
            }
        ]
    }, [] )

    const arrBtns = useMemo( () => {
        return [
            {
                label: "Log in",
                type: "submit",
                handler: logInHandler
            }
        ]
    }, [] )

    return (
        <SectionWrappers>
            <FormPanel { ...{ arrInputs, arrBtns } } formClass={ "login" } />
            <LoginRegisterSwitch />
        </SectionWrappers>
    )
}

export default Login;