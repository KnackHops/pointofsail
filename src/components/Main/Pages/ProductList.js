import { useState, useEffect } from "react";
import AnyList from "../../../non-hooks/AnyList";


const ProductList = ( { productList } ) => {

    const [ productListDisplay, setProductList ] = useState( [] );

    const productListMachine = () => {
        let products = [];

        productList.forEach( prod => {
            products.push( {
                label: prod.product_name,
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