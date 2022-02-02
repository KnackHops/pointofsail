import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import CustomersPage from "./CustomersPage";
import ProductList from "./ProductList";
import ProductPage from "./ProductPage";
import SpecificCustomerPage from "./SpecificCustomerPage";

const EstablishmentPage = ( { establishments } ) => {
    const { establishment_id } = useParams();
    const [ establishment, setEstablishment ] = useState( null );

    useEffect( () => {
        const est_selected = establishments.find( es => es.establishment_id === Number( establishment_id ) )

        setEstablishment( est_selected )
    }, [ establishment_id ] )

    return (
        <div className="establishment-page-con">
            {
                !establishment ? <p> Loading! </p> :
                <>
                    <h2>
                        {
                            establishment.establishment_name
                        }
                    </h2>
                    <Routes>
                        <Route path="" element={ 
                        <>
                            <CustomersPage />   
                            <ProductList productList={ establishment?.products || null } />
                        </> } />
                        <Route path="/customer/:customer_id" element={ <SpecificCustomerPage /> } />
                        <Route path="/product/:product_id" element={ <ProductPage productList={ establishment?.products || null } establishment_id={ establishment_id || null } />  }/>
                    </Routes>
                </>
            }
        </div>
    )
}

export default EstablishmentPage;