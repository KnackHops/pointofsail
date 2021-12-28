import { useEffect, useState } from "react";
import ReactFrappeChart from "react-frappe-charts";

const SalesGraph = ( { productSale } ) => {
    const [ salesInfoDisplay, setSalesInfo ] = useState( false );

    const graphInfoMachine = () => {
        const today = new Date();
        /* this will be dynamic */
        /* adjust date */
        /* custom select: last 7 days, last 14 days, last 30 days and so on */
        /* remove bars and lines */
        /* if per 7/14/30 days */
        /* will add a prev/next button */

        const curDate = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        let labels = [];
        let datasets = [
            {
                name: "Base Price", chartType: "line", values: []
            },
            {
                name: "Full Price", chartType: "line", values: []
            },
            {
                name: "Gross", chartType: "bar", values: []
            },
            {
                name: "Net", chartType: "bar", values: []
            }
        ]

        for ( let x = ( curDate - 6 ); x <= curDate; x++ ) {
            labels.push( month + "/" + x + "/" + year );

            let found = false;

            productSale.forEach( ( { gross_price_sale, base_price_sale, date, quantity_sale } ) => {
                const dateSale = Number( date.slice(8) );

                if ( dateSale === x ) {
                    const net = ( gross_price_sale - base_price_sale ) * quantity_sale;

                    datasets[0].values.push( base_price_sale );
                    datasets[1].values.push( gross_price_sale );
                    datasets[2].values.push( gross_price_sale * quantity_sale );
                    datasets[3].values.push( net );

                    found = true;
                }

            } )

            if ( !found ) {
                datasets[0].values.push( 0 );
                datasets[1].values.push( 0 );
                datasets[2].values.push( 0 );
                datasets[3].values.push( 0 );
            }
        }

        setSalesInfo( {
            labels,
            datasets
        } )

    }

    useEffect( () => {
        if ( productSale ) graphInfoMachine()
    }, [ productSale ] )
    return (
        <div className="sales-graph-con">
            { salesInfoDisplay && 
            <ReactFrappeChart
                title="my dopest chart"
                type="axis-mixed"

                barOptions={{spaceRation: .5}}
                height={ 250 }
                colors={ ['#7cd6fd', '#743ee2', '#7cd6fd', '#743ee2'] }
                data={  salesInfoDisplay }
            /> }
        </div>
    )
}

export default SalesGraph;