import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import CustomersList from "./CustomersList";
import ProductList from "./ProductList";
import ProductPage from "./ProductPage";
import CustomerPage from "./CustomerPage";
import EmployeesList from "./EmployeesList.js";

const EstablishmentPage = ( { establishments } ) => {
    // Edit establishment details to be added as well
    
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
                            <EmployeesList />
                            <ProductList productList={ establishment?.products || null } />
                            <CustomersList />
                        </> } />
                        <Route path="/customer/:customer_id" element={ <CustomerPage /> } />
                        <Route path="/product/:product_id" element={ <ProductPage productList={ establishment?.products || null } establishment_id={ establishment_id || null } />  }/>
                    </Routes>
                </>
            }
        </div>
    )
}

export default EstablishmentPage;