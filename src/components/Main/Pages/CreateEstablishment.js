import { useMemo } from "react";
import DynamicOpener from "../../../non-hooks/DynamicOpener";
import FormPanel from "./FormPanel";

const CreateEstablishment = () => {

    const arrInputs = useMemo( () => {
        return [
            {
                label: "Establishment Name:",
                type: "text",
                id: "establishment-name",
                aria: false
            }
        ]
    }, [] )

    const arrBtns = useMemo( () => {
        return [
            {
                label: "Create",
                type: "submit",
                handler: val => console.log( val )
            }
        ]
    }, [] )

    return (
        <DynamicOpener dynamicClass="create-establishment" btnLabel="Create Establishment Entry">
            <h4> Let's Create </h4>
            <FormPanel { ...{ arrInputs, arrBtns } } formClass={ "create-establishment" } />
        </DynamicOpener>
    )
}

export default CreateEstablishment;