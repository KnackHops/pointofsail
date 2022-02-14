import { useEffect, useState } from "react";
import AnyList from "../../../non-hooks/AnyList";

const SalesList = ( { parentProductSale } ) => {
    
    const [ salesListDisplay, setSalesList ] = useState( [] )
    useEffect( () => {
        if ( parentProductSale ) {
            let _salesListDisplay = [];

            parentProductSale.forEach( prod_s => {
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
    }, [ parentProductSale ] )

    return (
        <div className="sales-list-con">
            <AnyList arrList={ salesListDisplay } listClass={ "sales-list" }/>
        </div>
    )
}

export default SalesList;