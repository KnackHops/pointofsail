import { useContext, useEffect, useMemo, useState } from "react";
import { provideEstablishmentData, provideTransacts } from "../../../tempFolder/temp";
import DynamicControl from "../../../wrappers/_DynamicControl2";
import { UserContext } from "../../UnderRootContent";

const SaleControl = (  ) => {
    const [ curStage, setCurStage ] = useState( 0 );

    // this will be dynamic
    const [ dynamicSaleData, setDynamicSaleData ] = useState( [] );

    const { user } = useContext( UserContext );
    const [ establishments, setEstablishments ] = useState( null );
    const [ products, setProducts ] = useState( null );
    const [ transacts, setTransacts ] = useState( null );

    useEffect( () => {

        // checks for resetting establishments, products, and sales
        if ( curStage < 1 ) if ( establishments ) setEstablishments( null );

        if ( curStage < 2 ) if ( products ) setProducts( null );

        if ( curStage < 2 ) if ( transacts ) setTransacts ( null );

        // checks for filling establishments, products, and sales
        if ( curStage === 1 ) {
            const est = provideEstablishmentData( user.id );
            setEstablishments( est );
        }

        if ( curStage === 2 ) {
            const est_id = dynamicSaleData[ 1 ]?.[ "Establishment" ];

            if ( dynamicSaleData[0]?.["purpose"] === "add" ) {
    
                establishments.find( ( est ) => {
                    if ( est_id === est[ "establishment_id" ] ) setProducts( est[ "products" ] );
                } )
            } else {
                const trans = provideTransacts( est_id );

                setTransacts( trans );
            }
        }

    }, [ curStage ] )

    const stageHandler = _curStage => {
        setCurStage( _curStage )
    }

    const addConfirmHandler = ( { quantity=0 }, base_price_mod = null, gross_price_mod = null ) => {
        if ( !quantity ) return { 
            ok: false, 
            confirmArr: [], 
            _hasError: { has: true, errorMessage: "quantity empty or 0" } }
        if ( isNaN( quantity ) || Number( quantity ) === Infinity ) return { 
            ok: false, 
            confirmArr: [], 
            _hasError: { has: true, errorMessage: "Quantity Invalid! Please input proper value" } }
        
        let prodTotal = 0;
        const prodIndex = dynamicSaleData[2]?.[ "Product" ].length - 1;

        products.forEach( prod => {
            if ( prod.product_id === dynamicSaleData[2]?.["Product"][ prodIndex ] ) {
                prodTotal = prod.gross_price * quantity;
            }
        });

        return {
            ok: true,
            confirmArr: [ { label: "Total for this item: " + prodTotal } ],
            _hasError: { has: false }
        }

    }

    const stages = useMemo( () => {
        let arr = [
            {
                "btns": {
                    multiple: false,
                    "btnsInfo": [
                        {
                            label: "Add",
                            keyName: "purpose",
                            type: "button",
                            data: "add"
                        },
                        {
                            label: "Edit",
                            keyName: "purpose",
                            type: "button",
                            data: "edit"
                        }
                    ]
                }
            }
        ]

        if ( curStage >= 1 && establishments ) {

            arr[ 1 ] = {
                "list": {
                    multiple: false,
                    listInfo: establishments,
                    keyName: "Establishment",
                    keyNameExtract: "establishment_id",
                    keyNameLabel: [ "establishment_name" ],
                    capitalizedKeyNameLabel: true
                }
            }
        }

        if ( curStage >= 2 ) {

            // if we are adding sale
            // we display the products
            // as product name
            if ( products && dynamicSaleData[0]?.["purpose"] === "add" ) arr[ 2 ] = {
                "list": {
                    multiple: true,
                    listInfo: products,
                    keyName: "Product",
                    keyNameExtract: "product_id",
                    keyNameLabel: [ "product_name" ],
                    capitalizedKeyNameLabel: true
                }
            }

            // if we are editing sales
            // we display the sales made
            // as dates and their corresponding total
            if ( transacts && dynamicSaleData[0]?.["purpose"] === "edit" ) arr[ 2 ] = {
                "list": {
                    multiple: false,
                    listInfo: transacts,
                    keyName: "Transaction",
                    keyNameExtract: "transaction_id",
                    keyNameLabel: [ "date", "saleTotal" ],
                    objNameLabelAppend: [ "", "Total: " ],
                    capitalizedKeyNameLabel: false
                }
            }
        }

        if ( curStage >= 3 ) {

            if ( dynamicSaleData[0]?.[ "purpose" ] === "add" ) arr[ 3 ] = {
                "inp": {
                    multiple: true,
                    confirmHandler: addConfirmHandler,
                    inpInfo: [
                        {
                            label: "Quantity: ",
                            id: "quantity",
                            keyName: "quantity",
                            type: "text",
                            initValue: ""
                        }
                    ]
                }
            }
        }

        arr.push( {} )

        return arr;
    }, [ curStage, establishments, products, transacts ] )

    const saleDataCheckCleanse = () => {
        // curStage 0
        // will empty it all out
        if ( curStage === 0 && dynamicSaleData.length ) setDynamicSaleData( [] );
        // curStage 1
        // picking establishment
        // retain the first item, add || edit
        if ( curStage === 1 && dynamicSaleData.length > 1 ) setDynamicSaleData( dynamicSaleData.slice( 0, 1 ) );
        // curStage 2
        // only applicable on edit
        // picking product
        // will retain first and second item,
        // add || edit
        // establishment_id
        if ( curStage === 2 && dynamicSaleData.length > 2 ) if ( dynamicSaleData[0]["purpose"] === "edit" ) setDynamicSaleData( dynamicSaleData.slice( 0, 2 ) );
    }

    useEffect( saleDataCheckCleanse, [ curStage ] )

    const saleDataHandler = ( data, multiple, _curStage ) => {
        let _saleData = dynamicSaleData;

        const _key = Object.keys( data )[0];
        // if multiple add the array into the multiple
        if ( multiple ) {
            // if it already exist, push the data into the inside array
            // if not we set the initial array
            if ( _saleData?.[ _curStage ] ) _saleData[ _curStage ][ _key ].push( data[ _key ] ); 
            else _saleData[ _curStage ] = { [ _key ]: [ data[ _key ] ] }
        } else {
            // if it already exist, overwrite
            // if not we set the obj
            _saleData[ _curStage ] = data
        }

        setDynamicSaleData( _saleData )
    }

    const checkPointHandler = stageCheckpoint => {
        let _saleData = dynamicSaleData;
    }

    return (
        <div className={`width-standard sale-control-con`}>
            <DynamicControl 
                {
                    ...{ curStage, stageHandler, stages, checkPointHandler }
                }
                stageTreshold={ 4 }
                stageCheckpoint={ 0 }
                dynamicDataHandler={ saleDataHandler }
            />
        </div>
    )
}