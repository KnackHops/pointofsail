import { useContext, useEffect, useState } from "react";
import { provideSale } from "../../../tempFolder/temp";
import SectionWrappers from "../../../wrappers/SectionWrappers"
import { UserContext } from "../../UnderRootContent";
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
        <SectionWrappers sectionTitle={ <h1> Home </h1> }>
            { productSale &&
                <>
                    {/* <SalesGraph titleGraph={ "Admin view" } parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } colors={ [ "green", "orange", "orange", "green", "red", "red", "blue" ] } /> */}
                    <SalesGraph titleGraph={ "Unpaid" } parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } graphClass="unpaid-graph" whichToDisplay="unpaid" colors={ [ "green", "orange", "red", "red", "blue" ] } />
                    <SalesGraph titleGraph={ "Gross" } parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } graphClass="gross-graph" whichToDisplay="gross" colors={ [ "red", "blue" ] } />
                    <SalesGraph titleGraph={ "Net" } parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } graphClass="net-graph" whichToDisplay="net" colors={ [ "green", "blue" ] } />
                    {/* <SalesGraph titleGraph={ "Prices" } parentProductSale={ productSale } cSelect={ true } nextPrevBtns={ true } graphClass="prices-graph" whichToDisplay="prices" colors={ [ "green", "red" ] } /> */}
                </>
            }
        </SectionWrappers>
    )
}

export default Home;