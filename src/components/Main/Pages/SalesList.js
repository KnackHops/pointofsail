import { useEffect, useState } from "react";
import AnyList from "../../../non-hooks/AnyList";

const SalesList = ( { productSale } ) => {
    const [ salesListDisplay, setSalesList ] = useState( [] )
    
    useEffect( () => {
        if ( productSale ) {
            let _salesListDisplay = [];

            productSale.forEach( prod_s => {
                _salesListDisplay.push( {
                    label: <>
                        <span>Date: { prod_s.date }</span>
                        <span>Base Price: { prod_s.base_price_sale }</span>
                        <span>Gross Price: { prod_s.gross_price_sale }</span></>,
                    whichEl: "p"
                } )
            } )

            setSalesList( _salesListDisplay )
        }
    }, [ productSale ] )

    return (
        <div className="sales-list-con">
            <AnyList arrList={ salesListDisplay } listClass={ "sales-list" }/>
        </div>
    )
}

export default SalesList;