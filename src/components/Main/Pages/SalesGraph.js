import { useContext, useEffect, useState } from "react";
import ReactFrappeChart from "react-frappe-charts";
import CustomSelect from "../../../non-hooks/CustomSelect";
import { provideSale } from "../../../tempFolder/temp";
import { FunctionContext, UserContext } from "../../UnderRootContent";
import SalesGraphNextPrev from "./SalesGraphNextPrev";
import './SalesGraph.css'

const selectListDays = [
    {
        label: "Full Month",
        value: "fm"
    },
    {
        label: "14 days",
        value: "14"
    },
    {
        label: "7 days",
        value: "7"
    }
]

const SalesGraph = ( { className="default-sales-graph", parentProductSale="none", cSelect=false, nextPrevBtns=false, whichToDisplay="default", colors=[ "orange", "blue" ] } ) => {
    const { user } = useContext( UserContext );
    const { getDateDifference } = useContext( FunctionContext );
    // this will tell which to display
    // raw sale data 
    const [ productSale, setProductSale ] = useState( null );
    // dates to be used
    // an array
    // const [ currentDates, setCurrentDates ] = useState( [] );
    // actual info to be displayed
    const [ salesInfoDisplay, setSalesInfo ] = useState( null );
    // tells how many days to display
    const [ daysToDisp, setDaysToDisp ] = useState( "fm" );

    // useEffect( () => {
    //     if ( currentDates.length ) graphInfoMachine();
    // }, [ currentDates ] )

    const datasSetter = ( ) => {
        // if ( !currentDates.length || daysToDisp === "fm" ) setCurrentDates( getDateDifference() );
        // else setCurrentDates( getDateDifference( null, Number( daysToDisp ) ) )
        const currentDates = daysToDisp === "fm" ? getDateDifference() : getDateDifference( null, Number( daysToDisp ) );

        graphInfoMachine( currentDates )
    }

    useEffect( () => {
        // if ( productSale ) datasSetter();
        if ( productSale ) datasSetter()
    }, [ daysToDisp, whichToDisplay ] )

    const graphDataMachine = ( _date ) => {

        let datas = [];
        let found = false;

        productSale.forEach( ( { gross_price_sale, base_price_sale, date, quantity_sale } ) => {
            // default = base_price_sale, gross_price_sale, gross, net, quantity_sale
            // gross = gross, quantity_sale
            // net = net, quantity_sale
            // prices = base_price_sale, gross_price_sale
            if ( _date === date ) {
                // get net and gross income
                let val = {};
                // const net = ( gross_price_sale - base_price_sale ) * quantity_sale;
                if ( whichToDisplay === "default" || whichToDisplay === "net" ) val.net = ( gross_price_sale - base_price_sale ) * quantity_sale;
                // const gross = gross_price_sale * quantity_sale;
                if ( whichToDisplay === "default" || whichToDisplay === "gross"  ) val.gross = gross_price_sale * quantity_sale;

                if ( found ) {

                    // if default or prices
                    // first item is base_price_sale ( index 0 )
                    // second item is gross_price_sale ( index 1 )
                    // corresponding item is added to come up with total
                    if ( whichToDisplay === "default" || whichToDisplay === "prices" ) {
                        datas[0] = base_price_sale + datas[0];
                        datas[1] = gross_price_sale + datas[1];
                    }

                    // if default
                    // gross is item number 3 ( index 2 )
                    // if gross
                    // gross is item number 1 ( index 0 )
                    if ( whichToDisplay === "default" ) datas[2] = val.gross + datas[2]
                    else if ( whichToDisplay === "gross" ) datas[0] = val.gross + datas[0]

                    // if default
                    // gross is item number 4 ( index 3 )
                    // if gross
                    // gross is item number 1 ( index 0 )
                    if ( whichToDisplay === "default" ) datas[3] = val.net + datas[3]
                    else if ( whichToDisplay === "net" ) datas[0] = val.net + datas[0]

                    // if not prices, last item will always be quantity sale
                    if ( whichToDisplay !== "prices" ) datas[ datas.length - 1 ] = quantity_sale + datas[ datas.length - 1 ]
                } else {

                    // if default or prices
                    // base_price_sale, and gross_price_sale is passed
                    if ( whichToDisplay === "default" || whichToDisplay === "prices" ) {
                        datas.push( base_price_sale )
                        datas.push( gross_price_sale )
                    }

                    if ( whichToDisplay !== "prices" ) {
                        if ( whichToDisplay !== "net" ) datas.push( val.gross )
                        if ( whichToDisplay !== "gross" ) datas.push( val.net )

                        datas.push( quantity_sale )
                    }

                    // datas = [ base_price_sale, gross_price_sale, gross, net ];

                    found = true;
                }
            }
        } )

        if ( !found ) {
            if ( whichToDisplay === "default" ) datas = [ 0, 0, 0, 0, 0 ]
            else datas = [ 0, 0 ]
        }

        return datas;
    }

    const dataSetsMachine = () => {

        // gross
        // Gross
        // Quantity

        if ( whichToDisplay === "gross" ) {
            return [
                {
                    name: "Gross", chartType: "line", values: []
                },
                {
                    name: "Quantity", chartType: "bar", values: []
                }
            ]
        }

        // net
        // Net
        // Quantity

        if ( whichToDisplay === "net" ) {
            return [
                {
                    name: "Net", chartType: "line", values: []
                },
                {
                    name: "Quantity", chartType: "bar", values: []
                }
            ]
        }

        // prices
        // Base Price Sale
        // Gross Price Sale

        if ( whichToDisplay === "prices" ) {
            return [
                {
                    name: "Base Price", chartType: "line", values: []
                },
                {
                    name: "Full Price", chartType: "line", values: []
                }
            ]
        }

        // default
        // Base Price Sale
        // Gross Price Sale
        // Gross
        // Net
        // Quantity

        return [
            {
                name: "Base Price", chartType: "bar", values: []
            },
            {
                name: "Full Price", chartType: "bar", values: []
            },
            {
                name: "Gross", chartType: "line", values: []
            },
            {
                name: "Net", chartType: "line", values: []
            },
            {
                name: "Quantity", chartType: "line", values: []
            }
        ]
    }

    const graphInfoMachine = currentDates => {
        /* this will be dynamic */
        /* adjust date */
        /* custom select: last 7 days, last 14 days, last 30 days and so on */
        /* remove bars and lines */
        /* if per 7/14/30 days */
        /* will add a prev/next button */
        /* toggle between sale and price change */
        /* as to not muddy the chart with too much bars/lines */
        /* right now the graph can't handle multiple items */
        /* will adjust for that soon dot tm */
        /* will have to make curdate dynamic soon tm */

        if ( !whichToDisplay ) return

        let labels = [];
        let datasets = dataSetsMachine();

        currentDates.forEach( _date => {
            labels.push( _date.slice( 2 ) );

            const values = graphDataMachine( _date );

            values.forEach( ( val, i ) => datasets[ i ].values.push( val ) );
        } )

        setSalesInfo( {
            labels,
            datasets
        } )

        // let datasets = [
        //     {
        //         name: "Base Price", chartType: "bar", values: []
        //     },
        //     {
        //         name: "Full Price", chartType: "bar", values: []
        //     },
        //     {
        //         name: "Gross", chartType: "line", values: []
        //     },
        //     {
        //         name: "Net", chartType: "line", values: []
        //     }
        // ]

        // let highestGross = 0;
        // let lowestGross = 0;

        // let highestNet = 0;

        // currentDates.forEach( _d => {
        //     labels.push( _d.slice( 2 ) );

        //     let found = false;

        //     productSale.forEach( ( { gross_price_sale, base_price_sale, date, quantity_sale } ) => {

        //         if ( _d === date ) {
        //             get net and gross income
        //             const net = ( gross_price_sale - base_price_sale ) * quantity_sale;
        //             const gross = gross_price_sale * quantity_sale;

        //             get highest net income for indicator
        //             if ( net > highestNet ) highestNet = net;

        //             get highest and lowest gross income for indicator
        //             if ( gross > highestGross ) highestGross = gross;
        //             if ( lowestGross === 0 ) lowestGross = gross
        //             else if ( gross < lowestGross ) lowestGross = gross

        //             if found within the loop of finding a specific date, add to the last item added
        //             else, add an item to the array
        //             if ( found ) {
        //                 let indexData = datasets[0].values.length -1;
        //                 let foundGross = 0;
        //                 let foundNet = 0;

        //                 datasets[0].values[ indexData ] = datasets[0].values[ indexData ] + base_price_sale;
        //                 datasets[1].values[ indexData ] = datasets[1].values[ indexData ] + gross_price_sale;
        //                 datasets[2].values[ indexData ] = foundGross = datasets[2].values[ indexData ] + gross;
        //                 datasets[3].values[ indexData ] = foundNet = datasets[3].values[ indexData ] + net;
        //                 if ( foundGross > highestGross ) highestGross = foundGross;
        //                 if ( foundNet > highestNet ) highestNet = foundNet;
        //             } else {
        //                 datasets[0].values.push( base_price_sale );
        //                 datasets[1].values.push( gross_price_sale );
        //                 datasets[2].values.push( gross );
        //                 datasets[3].values.push( net );

        //                 found = true;
        //             }
        //         }
        //     } )

        //     if ( !found ) {
        //         datasets[0].values.push( 0 );
        //         datasets[1].values.push( 0 );
        //         datasets[2].values.push( 0 );
        //         datasets[3].values.push( 0 );
        //     }

        // } )

        // const yMarkers = [
        //     {
        //         label: "Highest Gross",
        //         value: highestGross,
        //         options: { labelPos: 'right' }
        //     },
        //     {
        //         label: "Lowest Gross",
        //         value: lowestGross,
        //         options: { labelPos: 'right' }
        //     },
        //     {
        //         label: "Highest Net",
        //         value: highestNet,
        //         options: { labelPos: 'left' }
        //     }
        // ]

        // setSalesInfo( {
        //     labels,
        //     yMarkers,
        //     datasets
        // } )
    }

    const checkProductSale = () => {
        if ( !productSale ) {
            if ( parentProductSale === "none" ) {
                const sale = provideSale( { userid: user.id } );
    
                setProductSale( sale );
            } else {
                setProductSale( parentProductSale );
            }
        } else datasSetter();
    }

    useEffect( () => {
        checkProductSale();
    }, [ parentProductSale, productSale ] )

    const dateGetter = indexDate => {
        // return [ 
        //     currentDates[ indexDate ].slice( 0, 4 ), 
        //     currentDates[ indexDate ].slice( 5, 7 ),
        //     currentDates[ indexDate ].slice( 8 )
        // ].map( item => Number ( item ) );

        const curYear = `${new Date().getFullYear()}`.slice( 0, 2 );
        const dateStr = curYear + salesInfoDisplay?.labels[ indexDate ];

        return [ 
            dateStr.slice( 0, 4 ), 
            dateStr.slice( 5, 7 ),
            dateStr.slice( 8 )
        ].map( item => Number ( item ) );
    }

    const resetHandler = () => {
        graphInfoMachine( getDateDifference( null, salesInfoDisplay.labels.length ) )
    }

    const graphNextOrPrevHandler = whichDo => {
        const datesLength = salesInfoDisplay.labels.length;
        if ( !datesLength ) return
        const indexDate = whichDo.includes( "Prev" ) ? 0 : datesLength - 1
        const dateDo = whichDo.includes( "Prev" ) ? "sub" : "add";

        const [ year, month, day ] = dateGetter( indexDate );
        // need treshold for next where it can't be predicted where the end date will be
        // this is to prevent exceeding current Date
        // setCurrentDates( getDateDifference( { year, month, day }, currentDates.length, dateDo ) )

        graphInfoMachine( getDateDifference( { year, month, day }, datesLength, dateDo ) )
    }

    return (
        <div className={`sales-graph-con ${ daysToDisp === "fm" ? daysToDisp : "d" + daysToDisp }-length ${className}-con`}>
            { salesInfoDisplay &&
            <>
                <div className="graph-con">
                    <ReactFrappeChart
                        title="Date: Y/M/D"
                        type="axis-mixed"
                        height={ 350 }
                        width={ 1835 }
                        barOptions={ { spaceRation: .4 } }
                        lineOptions={ { dotSize: 3 } }
                        colors={ colors }
                        data={  salesInfoDisplay }
                    /> 
                </div>
                <div className="sales-graph-control fd">
                    { cSelect &&
                    <div className="sales-graph-days">
                        <h4> Days: </h4>
                        <CustomSelect arrList={ selectListDays } handler={ val => setDaysToDisp( val ) } classCustom="sales-graph" />
                    </div> }
                    { nextPrevBtns && 
                    <SalesGraphNextPrev 
                        handler={ graphNextOrPrevHandler }
                        resetHandler={ resetHandler } /> }
                </div>
            </> 
            }
        </div>
    )
}

export default SalesGraph;