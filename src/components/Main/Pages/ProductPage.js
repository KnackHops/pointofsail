import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { provideSale } from "../../../tempFolder/temp";
import { FunctionContext } from "../../UnderRootContent";
import SalesGraph from "./SalesGraph";
import SalesList from "./SalesList";

const ProductPage = ( { productList } ) => {
    const { upperCaser } = useContext( FunctionContext );

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

    const [ productSale, setProductSale ] = useState( null );

    useEffect( () => {
        if ( product ) {
            const sales = provideSale( { "product_id": product.product_id } )
            setProductSale( sales )
        }
    }, [ product ] )

    return (
        <div className="product-page-con">
            <h3>
                {
                    product?.product_name
                }
            </h3>
            { productSale && <> 
                <SalesGraph titleGraph={ `${ upperCaser( product?.product_name ) } Sales` } parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } colors={ [ "green", "orange", "orange", "green", "red", "red", "blue" ] } /> 
                <SalesGraph titleGraph={ "Prices" } parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } graphClass="prices-graph" whichToDisplay="prices" colors={ [ "green", "red" ] } /> 
            </> }
            <SalesList parentProductSale={ productSale } />
        </div>
    )
}

export default ProductPage;