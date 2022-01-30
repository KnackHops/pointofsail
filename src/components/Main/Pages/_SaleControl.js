import { useContext, useEffect, useMemo, useState } from 'react';
import { provideEstablishmentData, provideSale } from '../../../tempFolder/temp';
import DynamicControl from '../../../wrappers/_DynamicControl';
import { FunctionContext, UserContext } from '../../UnderRootContent';
import './SaleControl.css';

const SaleControl = ( { updateProductSale=null } ) => {

    const { upperCaser } = useContext( FunctionContext );

    /* init => choose establishment ( ch_es ) => choose product ( ch_prod ) */
    /* add */
    /* info add ( inf_add ) */
    /* confirm add ( conf_add ) */
    /* edit */
    /* choose which sell to edit ( ch_sale )*/
    /* what to edit ( quantity or price ), and the value to edit to ( inf_edit )*/
    /* confirm edit ( conf_edit )*/
    // const [ stages, setStages ] = useState( initStage );
    const [ curStage, setCurStage ] = useState( 0 );
    const [ establishments, setEstablishments ] = useState( null );
    const [ products, setProducts ] = useState( null );
    const [ sale, setSale ] = useState( null );
    const [ saleToList, setSaleToList ] = useState( [] );

    const [ saleData, setSaleData ] = useState( [] );

    const handleSaleData = obj => {
        let _saleData = saleData;

        if ( _saleData.length >= curStage + 1 ) {
            let new_saleData = [];

            for ( let x = 0; x < curStage; x++ ) {
                new_saleData.push( _saleData[ x ] );
            }

            new_saleData.push( obj )

            setSaleData( new_saleData );
            return;
        } else {
            _saleData.push( obj );

            setSaleData( _saleData );
        }
    }

    const [ formJunction, setFormJunction ] = useState( {} );
    const [ thresholdStage, setThresholdStage ] = useState( 3 );

    const formGenerator = () => {
        if ( !curStage ) return null

        if ( saleData[ 0 ][ "purpose" ] === "add" ) {
            if ( thresholdStage !== 3 ) setThresholdStage(3)

            let store = "";
            let product = "";
            let price = 0;

            establishments.forEach( est => {
                if ( est.establishment_id === saleData[ 1 ].establishment_id ) store = est.establishment_name
            } )

            products.forEach( prod => {
                if ( prod.product_id === saleData[ 2 ].product_id ) {
                    product = `${ prod.product_name }: ${ prod.gross_price }`
                    price = prod.gross_price
                }
            } )

            const confirmer = val => {
                return `Total: ${ Number( val?.quantity ) * price }`
            }

            const submitter = val => {
                return val.quantity;
            }

            setFormJunction ( {
                list: [
                    {
                        label: "Quantity:",
                        id: "quantity",
                        type: "number"
                    }
                ],
                objNameTitle: {
                    purpose: "Sell a product",
                    store,
                    product
                },
                confirmer,
                submitter
            } )
        } else {
            if ( thresholdStage !== 4 ) setThresholdStage(4);
            if ( curStage === 3 ) {
                setFormJunction( {
                    list: saleToList,
                    objNameLabel: "date",
                    objNameData: "sale_id"
                } )
            } else if ( curStage === 4 ) {
            }
        }
    }

    const stages = useMemo( () => {
        return [
            {
                "btn": [
                    {
                        label: "Add",
                        data: "add"
                    },
                    {
                        label: "Edit",
                        data: "edit"
                    }
                ]
            },
            {
                "cho": {
                    list: establishments || [],
                    objNameLabel: "establishment_name",
                    objNameData: "establishment_id",
                }
            },
            {
                "cho": {
                    list: products || [],
                    objNameLabel: "product_name",
                    objNameData: "product_id"
                }
            },
            {
                [ ( saleData[0]?.["purpose"] === "add" ? "inp" : "cho" ) || "def" ]: formJunction
            },
            {
                "inp": formJunction
            }
        ]
    }, [ establishments, products, saleData, formJunction ] )

    const { user } = useContext( UserContext );

    const loadEstab = () => {
        if ( establishments || establishments?.length > 0 ) setEstablishments( null )
        if ( products || products?.length > 0 ) setProducts( null )
        const ests = provideEstablishmentData( user.id );


        setEstablishments( ests );
    }

    const loadProd = () => {
        if ( products ) setProducts( null )

        establishments.forEach( est => {
            if ( est.establishment_id === saleData[ curStage - 1 ].establishment_id ) {
                setProducts( est.products );
            }
        } )
    }

    const loadSale = () => {
        if ( sale ) setSale( null );

        const _sale = provideSale( { product_id: saleData[2].product_id }, "asc" );

        setSale( _sale );
    }

    useEffect( () => {
        if ( sale ) formGenerator();
    }, [ sale ] )

    const [ confirmInfos, setConfirmInfos ] = useState( null );

    const confirmMachine = () => {
        const title = upperCaser( saleData[0]?.purpose || "" );

        let details = [];

        saleData.forEach( ( item, i ) => {

            if ( !i ) return;

            const _label = upperCaser( Object.keys( item )[0].split("_")[0] );

            let _info = "";

            if ( _label === "Establishment" )
            {
                const { establishment_name } = establishments.find( est => est.establishment_id === item.establishment_id );
                _info = upperCaser( establishment_name );
            }

            if ( _label === "Product" )
            {
                const { product_name } = products.find( prod => prod.product_id === item.product_id );
                _info = upperCaser( product_name );
            }

            if ( _info ) details.push( { _label, _info } )

        } )

        setConfirmInfos( {
            title,
            details
        } )
    }

    useEffect( () => {

        if ( curStage === 1 ) loadEstab()
        if ( curStage === 2 ) loadProd()

        if ( curStage === 3 ) {
            if ( saleData[0]?.purpose === "add" ) formGenerator();
            else loadSale();
        }

        if ( curStage === 4 ) {
            if ( saleData[0]?.purpose === "edit" ) formGenerator();
            else confirmMachine();
        }

    }, [ curStage ] )

    return (
        <div className='width-standard'>
            <DynamicControl 
                dynamicClass={ "sale" }
                arrControl={ stages || [] }
                dynamicData={ saleData }
                dynamicDataHandler={ handleSaleData }
                curStage={ curStage }
                thresholdStage={ thresholdStage }
                addStageHandler={ () => setCurStage( curStage + 1 ) }
                removeStageHandler={ () => setCurStage( curStage - 1 ) }
                confirmInfos={ confirmInfos }
            />
        </div>
    )
}