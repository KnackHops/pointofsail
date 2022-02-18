import { useContext, useMemo } from "react";
import SectionWrappers from "../../../wrappers/SectionWrappers"
import { UserContext } from "../../UnderRootContent";
import FormPanel from "./FormPanel";
import LoginRegisterSwitch from "./LoginRegisterSwitch";

const Register = () => {
    const { registerHandler } = useContext( UserContext );

    const arrInputs = useMemo( () => {
        return (
            [
                {
                    label: "Name",
                    id: "name",
                    type: "text",
                    aria: false
                },
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
                },
                {
                    label: "Email",
                    id: "email",
                    type: "email",
                    aria: false
                },
                {
                    label: "Mobile",
                    id: "mobile",
                    type: "tel",
                    aria: false
                }
            ]
        )
    }, [] )

    const arrBtns = useMemo( () => {
        return (
            [
                {
                    label: "Register",
                    type: "submit",
                    handler: registerHandler
                }
            ]
        )
    }, [] )

    return (
        <SectionWrappers>
            <FormPanel { ...{ arrInputs, arrBtns } } formClass={ "register"} />
            <LoginRegisterSwitch />
        </SectionWrappers>
    )
}

export default Register;