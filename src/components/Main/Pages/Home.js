import { useContext, useEffect, useState } from "react";
import { provideSale } from "../../../tempFolder/temp";
import SectionWrappers from "../../../wrappers/SectionWrappers"
import { UserContext } from "../../UnderRootContent";
import ProductControl from "./ProductControl";
import SaleControl from "./SaleControl";
import SalesGraph from "./SalesGraph";

const Home = () => {
    const { user } = useContext( UserContext );
    const [ productSale, setProductSale ] = useState( null );

    const updateProductSale = () => {
        const sale = provideSale( { userid: user.id } );
        
        setProductSale( sale );
    }

    useEffect( () => {
        updateProductSale();
    }, [] )

    return (
        <SectionWrappers sectionTitle={ <> <h1> Home </h1> <h2> Sales </h2> </> }>
            <SaleControl updateProductSale={ updateProductSale } />
            { productSale &&
                <>
                    <SalesGraph parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } colors={ [ "green", "red", "red", "green", "blue" ] } />
                    <SalesGraph parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } className="gross-graph" whichToDisplay="gross" colors={ [ "red", "blue" ] } />
                    <SalesGraph parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } className="net-graph" whichToDisplay="net" colors={ [ "green", "blue" ] } />
                    <SalesGraph parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } className="prices-graph" whichToDisplay="prices" colors={ [ "green", "red" ] } />
                </>
            }
            <ProductControl />
        </SectionWrappers>
    )
}

export default Home;