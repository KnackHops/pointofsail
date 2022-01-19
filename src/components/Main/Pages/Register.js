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
                    _label: "Name",
                    _id: "name",
                    _type: "text"
                },
                {
                    _label: "Username",
                    _id: "username",
                    _type: "text"
                },
                {
                    _label: "Password",
                    _id: "password",
                    _type: "password"
                },
                {
                    _label: "Email",
                    _id: "email",
                    _type: "email"
                },
                {
                    _label: "Mobile",
                    _id: "mobile",
                    _type: "tel"
                }
            ]
        )
    }, [] )

    const arrBtns = useMemo( () => {
        return (
            [
                {
                    _label: "Register",
                    _type: "submit",
                    handler: registerHandler
                }
            ]
        )
    }, [] )

    return (
        <SectionWrappers>
            <FormPanel { ...{ arrInputs, arrBtns } } />
            <LoginRegisterSwitch />
        </SectionWrappers>
    )
}

export default Register;