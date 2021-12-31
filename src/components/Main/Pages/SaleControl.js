import { useState } from 'react';
import DynamicControl from '../../../wrappers/DynamicControl';
import './SaleControl.css';

const SaleControl = () => {
    /* init => choose establishment ( ch_es ) => choose product ( ch_prod ) => then actual adding with info ( info_add ) => confirmation before add ( conf_add ) */
    const [ inputState, setInput ] = useState("init");
    return (
        <DynamicControl dynamicClass={ "sale" }>

        </DynamicControl>
    )
}

export default SaleControl;