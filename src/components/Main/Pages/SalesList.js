import { useEffect, useState } from "react";
import AnyList from "../../../non-hooks/AnyList";

const SalesList = ( { parentProductSale } ) => {
    
    const [ salesListDisplay, setSalesList ] = useState( [] )
    useEffect( () => {
        if ( parentProductSale ) {
            let _salesListDisplay = [];

            _salesListDisplay.push( 
                { 
                    label: <>
                        <span> Date </span>
                        <span> Base Price </span>
                        <span> Gross Price </span>
                        <span> Quantity Sold </span>
                        <span> Total </span>
                        <span> Net </span>
                    </>,
                    whichEl: "p" 
                } )

            parentProductSale.forEach( prod_s => {
                _salesListDisplay.push( {
                    label: <>
                        <span> { prod_s.date } </span>
                        <span> { prod_s.base_price_sale } </span>
                        <span> { prod_s.gross_price_sale } </span>
                        <span> { prod_s.quantity_sale } </span>
                        <span> { prod_s.gross_price_sale * prod_s.quantity_sale } </span>
                        <span> { ( prod_s.gross_price_sale  - prod_s.base_price_sale ) * prod_s.quantity_sale } </span>
                        </>,
                    whichEl: "p"
                } )
            } )

            setSalesList( _salesListDisplay )
        }
    }, [ parentProductSale ] )

    return (
        <div className="sales-list-con">
            <AnyList arrList={ salesListDisplay } listClass={ "sales-list" }/>
        </div>
    )
}

export default SalesList;