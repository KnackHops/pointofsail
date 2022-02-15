import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnyList from "../../../non-hooks/AnyList";
import './CustomersPage.css';
import { provideCustomers } from "../../../tempFolder/temp";

const CustomersPage = () => {
    const { establishment_id } = useParams();

    const [ customers, setCustomers ] = useState( [] );
    const [ customerDisplay, setCustomerDisplay ] = useState( null );
    const [ customerListOpen, setCustomerOpen ] = useState( false );

    const loadCustomers = () => {

        const cust = provideCustomers( Number( establishment_id ) );
        setCustomers( cust );
    }

    useEffect( () => {
        let _customerListOpen = []
        
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

    const customerListHandler = () => {
        if ( !customers?.length ) loadCustomers()

        setCustomerOpen( !customerListOpen );
    }

    return (
        <div className="customer-page-con">
            <p>
                <button type="button" onClick={ customerListHandler }>
                    Customers
                </button>
            </p>
            <div className={ `customer-list-con ${ customerListOpen ? "-active" : "" }` }>
                { customerListOpen && 
                <AnyList listClass={ "customer-list" } arrList={ customerDisplay } /> }
            </div>
        </div>
    )
}

export default CustomersPage;