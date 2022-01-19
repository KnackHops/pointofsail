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
            <SalesGraph />
            <ProductControl />
            <h2> Establishments </h2>
            <ul>
                <li> establishment 1 </li>
            </ul>
            <ul>
                <li> establishment 2 </li>
            </ul>
        </SectionWrappers>
    )
}

export default Home;