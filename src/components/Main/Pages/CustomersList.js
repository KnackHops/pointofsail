import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './CustomersList.css';
import { provideCustomers } from "../../../tempFolder/temp";
import DynamicListButton from "./DynamicListButton";

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
        <DynamicListButton listClass={ "customer-list" } arrLoader={ loadCustomers } arrCheck={ customers?.length ? true : false } listHeader={ "Customers" } arrDisplay={ customerDisplay } />
    )
}

export default CustomersList;