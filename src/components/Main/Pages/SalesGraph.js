import { useContext, useEffect, useState } from "react";
import ReactFrappeChart from "react-frappe-charts";
import { provideSale } from "../../../tempFolder/temp";
import { FunctionContext, UserContext } from "../../UnderRootContent";
import './SalesGraph.css'

const SalesGraph = ( { parentProductSale="none" } ) => {
    const { user } = useContext( UserContext );
    const { getDateDifference } = useContext( FunctionContext );
    const [ currentDates, setCurrentDates ] = useState( [] );
    const [ productSale, setProductSale ] = useState( null );
    const [ salesInfoDisplay, setSalesInfo ] = useState( false );

    useEffect( () => {
        if ( !currentDates.length ) setCurrentDates( getDateDifference() );
    }, [] )

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
        /* will have to make curdate dynamic soon tm*/ 

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
            labels.push( _d.date );

            let found = false;

            productSale.forEach( ( { gross_price_sale, base_price_sale, date, quantity_sale } ) => {

                if ( _d.date === date ) {
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

                        datasets[0].values[ indexData ] = datasets[0].values[ indexData ] + base_price_sale;
                        datasets[1].values[ indexData ] = datasets[1].values[ indexData ] + gross_price_sale;
                        datasets[2].values[ indexData ] = datasets[2].values[ indexData ] + gross;
                        datasets[3].values[ indexData ] = datasets[3].values[ indexData ] + net;
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
        if ( parentProductSale === "none" && !productSale ) {
            const sale = provideSale( { userid: user.id } );

            setProductSale( sale );
        } else {
            if ( productSale ) {
                graphInfoMachine();
            } else {
                setProductSale( parentProductSale );
            }
        }
    }

    useEffect( () => {
        checkProductSale();
    }, [ parentProductSale, productSale ] )

    return (
        <div className="sales-graph-con">
            { salesInfoDisplay &&
            <>
                <ReactFrappeChart
                    title="my dopest chart"
                    type="axis-mixed"
                    height={ 350 }
                    barOptions={ { spaceRation: .4 } }
                    lineOptions={ { dotSize: 3 } }
                    colors={ ['#7cd6fd', '#743ee2', 'red', 'green'] }
                    data={  salesInfoDisplay }
                /> 
                <div className="sales-graph-control">
                    <p>
                        yo
                    </p>
                </div>
            </> 
            }
        </div>
    )
}

export default SalesGraph;