import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SalesGraph from "./SalesGraph";
import SalesList from "./SalesList";

const ProductPage = ( { productList } ) => {
    const { product_id } = useParams();
    const [ product, setProduct ] = useState( null );
    const navigate = useNavigate();

    useEffect( () => {
        let _product;
        productList.forEach( prod => {
            if ( prod.product_id === Number( product_id ) ) {
                _product = prod;
            }
        })

        if ( !_product ) {
            window.alert( "product doesn't exist!" );
            navigate("/establishment");
        }

        setProduct( _product )
    }, [ product_id ] )

    useEffect( () => {
        console.log( product )
    }, [ product ] )

    return (
        <div className="product-page-con">
            <h3>
                {
                    product?.product_name
                }
            </h3>
            <SalesGraph productSale={ product?.product_sale || null }/>
            <SalesList productSale={ product?.product_sale || null } />
        </div>
    )
}

export default ProductPage;