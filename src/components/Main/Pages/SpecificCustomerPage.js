import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnyList from "../../../non-hooks/AnyList";
import { provideSpecificCustomer } from "../../../tempFolder/temp";

const SpecificCustomerPage = () => {
    const { customer_id } = useParams();
    const [ customer, setCustomer ] = useState( null );

    useEffect( () => {
        const cust = provideSpecificCustomer( Number( customer_id ) );
        setCustomer( cust );

    }, [ customer_id ] )

    const [ pricePointDisplay, setPricePoint ] = useState( null );

    useEffect( () => {
        const _pricePointDisplay = [];

        _pricePointDisplay.push( {
            label: <> <span> Product Name </span> <span> Price </span> <span> Original Price </span> </>,
            whichEl: "p"
        } )

        customer?.price_point.forEach( pp => {
            _pricePointDisplay.push( {
                label: <> <span> { pp.product_name } </span> <span>{ pp.price } </span> <span> { pp.orig_price } </span> </>,
                whichEl: "p"
            } )
        } )

        setPricePoint( _pricePointDisplay );
    }, [ customer ] )

    return (
        <div>
            <h4> { customer?.customer_name } </h4>
            <p> Mobile: { customer?.customer_mobile } </p>
            <p> Address: { customer?.customer_address } </p>
            <div className="price-point-con">
                <h5> Custom Prices for this user: </h5>
                { pricePointDisplay && <AnyList arrList={ pricePointDisplay } listClass={ "price-point" } /> }
            </div>
        </div>
    )
}

export default SpecificCustomerPage;