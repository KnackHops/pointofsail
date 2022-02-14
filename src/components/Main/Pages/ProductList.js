import { useState, useEffect } from "react";
import AnyList from "../../../non-hooks/AnyList";


const ProductList = ( { productList } ) => {

    const [ productListDisplay, setProductList ] = useState( [] );

    const productListMachine = () => {
        let products = [ { label: <> 
                <span className="head-label-prod-name-list"> Product Name </span>
                <span className="head-label-base-price-list" > Base Price </span>
                <span className="head-label-gross-price-list" > Gross Price </span>
                <span className="head-label-quantity-list" > Quantity </span>
                </>,
                whichEl: "p",
                parentsPara: {
                    className: "header-label-product-page"
                } } ];
        
        productList.forEach( prod => {

            products.push( {
                label: <> 
                    <span className="label-prod-name-list"> { prod.product_name } </span>
                    <span className="label-base-price-list" > { prod.base_price } </span>
                    <span className="label-gross-price-list" > { prod.gross_price } </span>
                    <span className="label-quantity-list" > { prod.product_quantity } </span>
                    </>,
                whichEl: "link",
                passPara: {
                    to: `product/${prod.product_id}`
                }
            })
        })

        setProductList( products );
    }

    useEffect( () => {
        if ( productList ) productListMachine() 
    }, [ productList ] )

    return (
        <div className="product-list-con">
            <AnyList arrList={ productListDisplay } listClass={ "product-list" }/>
        </div>
    )
}

export default ProductList;