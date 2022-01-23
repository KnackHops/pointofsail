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

const SalesGraph = ( { parentProductSale="none", cSelect=false, nextPrevBtns=false } ) => {
    const { user } = useContext( UserContext );
    const { getDateDifference } = useContext( FunctionContext );
    const [ currentDates, setCurrentDates ] = useState( [] );
    const [ productSale, setProductSale ] = useState( null );
    const [ salesInfoDisplay, setSalesInfo ] = useState( false );
    const [ daysToDisp, setDaysToDisp ] = useState( "fm" );

    useEffect( () => {
        if ( currentDates.length ) graphInfoMachine();
    }, [ currentDates ] )

    const datasSetter = ( ) => {
        if ( !currentDates.length || daysToDisp === "fm" ) setCurrentDates( getDateDifference() );
        else setCurrentDates( getDateDifference( null, Number( daysToDisp ) ) )
    }

    useEffect( () => {
        if ( productSale ) datasSetter();
    }, [ daysToDisp ] )

    const graphInfoMachine = () => {
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

        let labels = [];
        let datasets = [
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
            }
        ]

        let highestGross = 0;
        let lowestGross = 0;

        let highestNet = 0;

        currentDates.forEach( _d => {
            labels.push( _d.slice( 2 ) );

            let found = false;

            productSale.forEach( ( { gross_price_sale, base_price_sale, date, quantity_sale } ) => {

                if ( _d === date ) {
                    // get net and gross income
                    const net = ( gross_price_sale - base_price_sale ) * quantity_sale;
                    const gross = gross_price_sale * quantity_sale;

                    // get highest net income for indicator
                    if ( net > highestNet ) highestNet = net;

                    // get highest and lowest gross income for indicator
                    if ( gross > highestGross ) highestGross = gross;
                    if ( lowestGross === 0 ) lowestGross = gross
                    else if ( gross < lowestGross ) lowestGross = gross

                    // if found within the loop of finding a specific date, add to the last item added
                    // else, add an item to the array
                    if ( found ) {
                        let indexData = datasets[0].values.length -1;
                        let foundGross = 0;
                        let foundNet = 0;

                        datasets[0].values[ indexData ] = datasets[0].values[ indexData ] + base_price_sale;
                        datasets[1].values[ indexData ] = datasets[1].values[ indexData ] + gross_price_sale;
                        datasets[2].values[ indexData ] = foundGross = datasets[2].values[ indexData ] + gross;
                        datasets[3].values[ indexData ] = foundNet = datasets[3].values[ indexData ] + net;
                        if ( foundGross > highestGross ) highestGross = foundGross;
                        if ( foundNet > highestNet ) highestNet = foundNet;
                    } else {
                        datasets[0].values.push( base_price_sale );
                        datasets[1].values.push( gross_price_sale );
                        datasets[2].values.push( gross );
                        datasets[3].values.push( net );

                        found = true;
                    }
                }
            } )

            if ( !found ) {
                datasets[0].values.push( 0 );
                datasets[1].values.push( 0 );
                datasets[2].values.push( 0 );
                datasets[3].values.push( 0 );
            }

        } )

        const yMarkers = [
            {
                label: "Highest Gross",
                value: highestGross,
                options: { labelPos: 'right' }
            },
            {
                label: "Lowest Gross",
                value: lowestGross,
                options: { labelPos: 'right' }
            },
            {
                label: "Highest Net",
                value: highestNet,
                options: { labelPos: 'left' }
            }
        ]

        setSalesInfo( {
            labels,
            datasets,
            yMarkers
        } )

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
        return [ 
            currentDates[ indexDate ].slice( 0, 4 ), 
            currentDates[ indexDate ].slice( 5, 7 ),
            currentDates[ indexDate ].slice( 8 )
        ].map( item => Number ( item ) );
    }

    const graphNextOrPrevHandler = whichDo => {
        if ( !currentDates.length ) return
        const indexDate = whichDo.includes( "Prev" ) ? 0 : currentDates.length - 1
        const dateDo = whichDo.includes( "Prev" ) ? "sub" : "add";

        const [ year, month, day ] = dateGetter( indexDate );
        // need treshold for next where it can't be predicted where the end date will be
        // this is to prevent exceeding current Date
        setCurrentDates( getDateDifference( { year, month, day }, currentDates.length, dateDo ) )
    }

    return (
        <div className={`sales-graph-con ${ daysToDisp === "fm" ? daysToDisp : "d" + daysToDisp }-length`}>
            { salesInfoDisplay &&
            <>
                <ReactFrappeChart
                    title="Date: Y/M/D"
                    type="axis-mixed"
                    height={ 350 }
                    barOptions={ { spaceRation: .4 } }
                    lineOptions={ { dotSize: 3 } }
                    colors={ ['#7cd6fd', '#743ee2', 'red', 'green'] }
                    data={  salesInfoDisplay }
                /> 
                <div className="sales-graph-control fd">
                    { cSelect &&
                    <div className="sales-graph-days">
                        <h4> Days: </h4>
                        <CustomSelect arrList={ selectListDays } handler={ val => setDaysToDisp( val ) } classCustom="sales-graph" />
                    </div> }
                    { nextPrevBtns && 
                    <SalesGraphNextPrev 
                        curEndDate={ currentDates.length ? currentDates[ currentDates.length - 1 ] : null } 
                        handler={ graphNextOrPrevHandler } /> }
                </div>
            </> 
            }
        </div>
    )
}

export default SalesGraph;