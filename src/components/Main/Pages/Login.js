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
                _label: "Username",
                _id: "username",
                _type: "text",
            },
            {
                _label: "Password",
                _id: "password",
                _type: "password",
            }
        ]
    }, [] )

    const arrBtns = useMemo( () => {
        return [
            {
                _label: "Log in",
                _type: "submit",
                handler: logInHandler
            }
        ]
    }, [] )

    return (
        <SectionWrappers>
            <FormPanel { ...{ arrInputs, arrBtns } } />
            <LoginRegisterSwitch />
        </SectionWrappers>
    )
}

export default Login;