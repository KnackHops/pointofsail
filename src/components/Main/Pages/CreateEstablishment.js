import { useState } from "react";
import DynamicOpener from "../../../non-hooks/DynamicOpener";

const CreateEstablishment = () => {
    
    const [ isOpen, setIsOpen ] = useState(  );

    return (
        <DynamicOpener dynamicClass="create-establishment" btnLabel="Create Establishment Entry">
            <p> let's create </p>
        </DynamicOpener>
    )
}

export default CreateEstablishment;