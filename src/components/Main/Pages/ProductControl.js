import { useMemo } from 'react';
import DynamicControl from '../../../wrappers/DynamicControl';
import './ProductControl.css';

const ProductControl = () => {
    const stageAdvance = () => {

    }

    const dynamicStage = useMemo( () => {
        return [
            {
                compo: [
                    {
                        label: "Add sell!",
                        whichEl: "btn",
                        toWhere: "add Stage"
                    },
                    {
                        label: "Edit a sell!",
                        whichEl: "btn",
                        toWhere: "edit Stage"
                    }
                ]
            },
            {
                compo: [
                ]
            }
        ]
    } )

    return (
        <div></div>
    )
}

export default ProductControl;