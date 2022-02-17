import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './CustomersList.css';
import { provideCustomers } from "../../../tempFolder/temp";
import DynamicOpener from "../../../non-hooks/DynamicOpener";
import AnyList from "../../../non-hooks/AnyList";

const CustomersList = () => {
    const { establishment_id } = useParams();

    const [ customers, setCustomers ] = useState( [] );
    const [ customerDisplay, setCustomerDisplay ] = useState( null );

    const loadCustomers = () => {
        const cust = provideCustomers( Number( establishment_id ) );
        setCustomers( cust );
    }

    useEffect( () => {
        const _customerListOpen = []
        
        _customerListOpen.push( {
            label: <> <span> Customer Name </span> <span> Customer Address </span> <span> Customer Mobile Number </span>  </>,
            whichEl: "p"
        } )

        customers.forEach( cust => {
            _customerListOpen.push( {
                label: <> <span> { cust.customer_name } </span> <span> { cust.customer_address } </span> <span> { cust.customer_mobile } </span>  </>,
                whichEl: "link",
                passPara: {
                    to: `customer/${ cust.customer_id }`
                }
            } )
        } )

        setCustomerDisplay( _customerListOpen );
    }, [ customers ] )

    return (
        <DynamicOpener dynamicClass="customer-list" loadHandler={ loadCustomers } btnLabel={ "Customers" } >
            <AnyList arrList={ customerDisplay } listClass={ "customer-list" } />
        </DynamicOpener>
    )
}

export default CustomersList;