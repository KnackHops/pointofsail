import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import ProductList from "./ProductList";
import ProductPage from "./ProductPage";

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
                        <Route path="" element={ <ProductList productList={ establishment?.products || null } /> } />
                        <Route path="/product/:product_id" element={ <ProductPage productList={ establishment?.products || null } /> }/>
                    </Routes>
                </>
            }
        </div>
    )
}

export default EstablishmentPage;