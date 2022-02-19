import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnyList from "../../../non-hooks/AnyList";
import { provideSpecificCustomer } from "../../../tempFolder/temp";

const CustomerPage = () => {
    const { establishment_id, customer_id } = useParams();
    const [ customer, setCustomer ] = useState( null );

    useEffect( () => {
        const cust = provideSpecificCustomer( Number( customer_id ), Number( establishment_id ) );
        setCustomer( cust );

        console.log( cust )

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

    const [ unpaidDisplay, setUnpaidDisplay ] = useState( null );

    useEffect( () => {
        const _unpaidDisplay = [];

        _unpaidDisplay.push ( {
            label: <> <span> Product Name </span> <span> Initial Date </span> <span> Interest Per Due </span> <span> Dues </span> </>,
            whichEl: "p"
        } )

        customer?.supply.forEach( sup => {
            _unpaidDisplay.push( {
                label: <> <span> { sup.product_name } </span> <span> { sup.date } </span> <span> { sup.interest ? sup.interest : "None" } </span> <span> { sup.dues } </span> </>,
                whichEl: "p"
            } )
        } )

        setUnpaidDisplay( _unpaidDisplay )
    }, [ customer ] )

    return (
        <div>
            <h4> { customer?.customer_name } </h4>
            <p> Mobile: { customer?.customer_mobile } </p>
            <p> Address: { customer?.customer_address } </p>
            <div className="price-point-con">
                <h5> Custom Prices for this customer </h5>
                { pricePointDisplay && <AnyList arrList={ pricePointDisplay } listClass={ "price-point" } /> }
            </div>
            <div className="unpaid-con">
                <h5> Unpaid for this customer </h5>
                { unpaidDisplay && <AnyList arrList={ unpaidDisplay } listClass={ "unpaid" } /> }
            </div>
        </div>
    )
}

export default CustomerPage;