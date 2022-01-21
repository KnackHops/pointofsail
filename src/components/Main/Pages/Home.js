import SectionWrappers from "../../../wrappers/SectionWrappers"
import ProductControl from "./ProductControl";
import SaleControl from "./SaleControl";
import SalesGraph from "./SalesGraph";

const Home = () => {

    return (
        <SectionWrappers>
            <h1> Home </h1>
            <h2> Sales </h2>
            <SaleControl />
            <SalesGraph cSelect={ true } />
            <ProductControl />
        </SectionWrappers>
    )
}

export default Home;