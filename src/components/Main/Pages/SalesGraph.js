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

const SalesGraph = ( { titleGraph="", graphClass="default-sales-graph", parentProductSale="none", cSelect=false, nextPrevBtns=false, whichToDisplay="default", colors=[ "orange", "blue" ] } ) => {
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

        productSale.forEach( ( { gross_price_sale, base_price_sale, date, paidDate, quantity_sale } ) => {
            // default = base_price_sale, gross_price_sale, gross, net, quantity_sale
            // gross = gross, quantity_sale
            // net = net, quantity_sale
            // prices = base_price_sale, gross_price_sale
            const _dateChecked = !paidDate ? date : paidDate;

            if ( _dateChecked === _date ) {
                // if this is unpaid and default display
                // we get the gross, and the net
                // we assign them to unpaidGross, and unpaidNet on the chart
                // if this is the first item with this date we create the initial data
                // we return after assigning unpaidGross, unpaidNet, and quantity_sale

                if ( !paidDate ) {
                    // we dont display unpaid for gross and net graph
                    if ( whichToDisplay === "gross" || whichToDisplay === "net" ) return;

                    // default, prices, unpaid
                    // first and second item for two is the base_price_sale and the gross_price_sale
                    if ( found ) {
                        if ( base_price_sale ) datas[0] = ( datas[0] + base_price_sale ) / 2;
                        datas[1] = ( datas[1] + gross_price_sale ) / 2;
                    } else {
                        datas.push( base_price_sale, gross_price_sale );
                    }

                    if ( whichToDisplay !== "prices" ) {
                        const unpaidGross = gross_price_sale * quantity_sale;
                        const unpaidNet = ( gross_price_sale - base_price_sale ) * quantity_sale;
    
                        if ( found ) {
                            // if found
                            // and default
                            // we are gonna send it to index 4 and 5
                            // index 2, and 3 is flat net and gross so we dont touch it
                            // for unpaid
                            // we send base_price_sale, gross_price_sale, unpaidGross, unpaidNet, quantity
                            let unpaidGIndex = whichToDisplay === "default" ? 4 : 2;
                            let unpaidNIndex = whichToDisplay === "default" ? 5 : 3;

                            datas[ unpaidGIndex ] = datas[ unpaidGIndex ] + unpaidGross;
                            datas[ unpaidNIndex ] = datas[ unpaidNIndex ] + unpaidNet;
                            datas[ datas.length - 1 ] = datas[  datas.length - 1  ] + quantity_sale;
                        } else {
                            if ( whichToDisplay === "default" ) datas.push( 0, 0, unpaidGross, unpaidNet, quantity_sale );
                            else datas.push( unpaidGross, unpaidNet, quantity_sale );
                        }
                    }
                    
                    // turn found to true
                    // aside from net and gross
                    if ( !found ) found = true;
                    return;
                // we return, if it's unpaid
                // since we don't need the other data
                } else if ( whichToDisplay === "unpaid" ) return;

                let val = {};

                // get net and gross income
                // const net = ( gross_price_sale - base_price_sale ) * quantity_sale;
                if ( whichToDisplay === "default" || whichToDisplay === "net" ) val.net = ( gross_price_sale - base_price_sale ) * quantity_sale
                // const gross = gross_price_sale * quantity_sale;
                if ( whichToDisplay === "default" || whichToDisplay === "gross"  ) val.gross = gross_price_sale * quantity_sale;

                if ( found ) {
                    // if default or prices
                    // first item is base_price_sale ( index 0 )
                    // second item is gross_price_sale ( index 1 )
                    // corresponding item is added to come up with total
                    if ( whichToDisplay === "default" || whichToDisplay === "prices" ) {
                        if ( base_price_sale ) datas[0] = ( base_price_sale + datas[0] ) / 2;
                        datas[1] = ( gross_price_sale + datas[1] ) / 2;
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

                        if ( whichToDisplay === "default" ) datas.push( 0, 0 )

                        datas.push( quantity_sale )
                    }
                    // datas = [ base_price_sale, gross_price_sale, gross, net ];

                    found = true;
                }
            }
        } )

        if ( !found ) {
            if ( whichToDisplay === "default" ) for ( let i = 0; i < 7; i++) datas[ i ] = 0;
            else if ( whichToDisplay === "unpaid" ) for ( let i = 0; i < 5; i++ ) datas[ i ] = 0;
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

        // unpaids
        // unpaid base price sale
        // unpaid gross price sale
        // quantity

        if ( whichToDisplay === "unpaid" ) {
            return [
                {
                    name: "Base Price", chartType: "bar", values: []
                },
                {
                    name: "Full Price", chartType: "bar", values: []
                },
                {
                    name: "UnpaidGross", chartType: "line", values: []
                },
                {
                    name: "UnpaidNet", chartType: "line", values: []
                },
                {
                    name: "Quantity", chartType: "line", values: []
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
                name: "UnpaidGross", chartType: "line", values: []
            },
            {
                name: "UnpaidNet", chartType: "line", values: []
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
        <div className={`sales-graph-con ${ daysToDisp === "fm" ? daysToDisp : "d" + daysToDisp }-length ${ graphClass }-con`}>
            <div className="title-graph">
                <h3>
                    { titleGraph }
                </h3>
            </div>
            { salesInfoDisplay &&
            <>
                <div className="graph-con">
                    <ReactFrappeChart
                        title={ `Date: Y/M/D ${ whichToDisplay === "unpaid" ? "" : (  whichToDisplay === "default" || whichToDisplay === "prices" ? "unpaid included" : "unpaid not included" ) } ` }
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