let login_data = [
    {
        userid: 0,
        username: "admin0",
        password: "Admin@"
    },
    {
        userid: 1,
        username: "barry0",
        password: "Barry@"
    }
]

let user_data = [
    {
        id: 0,
        name: "Admin Me",
        email: "admin@gmail.com",
        mobile: "09123456789"
    },
    {
        id: 1,
        name: "Barry Lukas",
        email: "barry@gmail.com",
        mobile: "09987654321"
    }
]

let establishment_data = [
    {
        id: 0,
        name: "admin store"
    },
    {
        id: 1,
        name: "admin store 2"
    }
]

let employee_data = [
    {
        userid: 0,
        establishment_id: 0,
        role: "owner"
    },
    {
        userid: 1,
        establishment_id: 0,
        role: "employee"
    },
    {
        userid: 0,
        establishment_id: 1,
        role: "employee"
    },
    {
        userid: 1,
        establishment_id: 1,
        role: "owner"
    }
]

let products_data = [
    {
        id: 0,
        establishment_id: 0,
        name: "coke",
        barcode: "barcodecoke",
        qrcode: "qrcoke",
        base_price: 10,
        gross_price: 12,
        quantity: 20
    },
    {
        id: 1,
        establishment_id: 0,
        name: "sprite",
        barcode: "barcodesprite",
        qrcode: "qrsprite",
        base_price: 10,
        gross_price: 12,
        quantity: 20
    }
]

let sales_data = [
    {
        id: 0,
        product_id: 0,
        date: "2021-12-02",
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 3
    },
    {
        id: 1,
        product_id: 0,
        date: "2021-12-05",
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 5
    },
    {
        id: 2,
        product_id: 0,
        date: "2021-12-12",
        base_price_sale: 8,
        gross_price_sale: 12,
        quantity_sale: 3
    },
    {
        id: 3,
        product_id: 0,
        date: "2021-12-16",
        base_price_sale: 8,
        gross_price_sale: 12,
        quantity_sale: 4
    },
    {
        id: 4,
        product_id: 0,
        date: "2021-12-18",
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 2
    },
    {
        id: 5,
        product_id: 0,
        date: "2021-12-22",
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 10
    },
    {
        id: 6,
        product_id: 0,
        date: "2021-12-23",
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 6
    },
    {
        id: 7,
        product_id: 0,
        date: "2021-12-24",
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 9
    },
    {
        id: 8,
        product_id: 0,
        date: "2021-12-25",
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 13
    },
    {
        id: 9,
        product_id: 0,
        date: "2021-12-26",
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 12
    },
    {
        id: 10,
        product_id: 0,
        date: "2021-12-27",
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 15
    },
    {
        id: 11,
        product_id: 1,
        date: "2021-12-27",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 14
    },
    {
        id: 12,
        product_id: 0,
        date: "2022-01-01",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 4
    },
    {
        id: 13,
        product_id: 0,
        date: "2022-01-03",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 8
    },
    {
        id: 14,
        product_id: 0,
        date: "2022-01-04",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 10
    },
    {
        id: 15,
        product_id: 0,
        date: "2022-01-05",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 24
    },
    {
        id: 16,
        product_id: 0,
        date: "2022-01-06",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 13
    },
    {
        id: 17,
        product_id: 0,
        date: "2022-01-08",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 17
    },
    {
        id: 18,
        product_id: 0,
        date: "2022-01-11",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 14
    },
    {
        id: 19,
        product_id: 0,
        date: "2022-01-12",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 15
    },
    {
        id: 20,
        product_id: 0,
        date: "2022-01-13",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 16
    },
    {
        id: 21,
        product_id: 0,
        date: "2022-01-15",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 13
    },
    {
        id: 22,
        product_id: 0,
        date: "2022-01-16",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 16
    },
    {
        id: 22,
        product_id: 0,
        date: "2022-01-18",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 16
    },
    {
        id: 22,
        product_id: 0,
        date: "2022-01-20",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 15
    },
    {
        id: 23,
        product_id: 0,
        date: "2022-01-23",
        base_price_sale: 10,
        gross_price_sale: 13,
        quantity_sale: 15
    },
    {
        id: 24,
        product_id: 0,
        date: "2022-01-23",
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 14
    }
]

const provideEstablishmentData = ( userid = "none", establishment_id="none" ) => {
    if ( userid !== "none" ) {

        let return_data = [];

        employee_data.forEach( emp => {
            if ( emp.userid === userid ) {
                return_data.push({
                    establishment_id: emp.establishment_id,
                    employee_role: emp.role
                })
            }
        } )

        if ( !return_data.length ) return []

        return_data.forEach( ( ret, i ) => {
            let mod_return = ret;

            establishment_data.forEach( est => {
                if ( ret.establishment_id === est.id ) {
                    mod_return["establishment_name"] = est.name
                }
            } )

            let products = [];

            products_data.forEach( prod => {
                if ( prod.establishment_id === ret.establishment_id ) {

                    products.push({
                        product_id: prod.id,
                        product_name: prod.name,
                        barcode: prod.barcode,
                        qrcode: prod.qrcode,
                        base_price: prod.base_price,
                        gross_price: prod.gross_price,
                        product_quantity: prod.quantity
                    })
                }
            } )

            mod_return["products"] = products;

            return_data[i] = mod_return;
        } )

        return return_data;
    }
}

const provideSale = ( idContainer, orderBy="desc" ) => {
    let establishment_id_arr = [];

    if ( "userid" in idContainer ) {

        employee_data.forEach( emp => {

            if ( emp.userid === idContainer.userid ) establishment_id_arr.push( emp.establishment_id )

        } )

    } 
    else if ( "establishment_id" in idContainer ) establishment_id_arr.push( idContainer.establishment_id )

    let prod_id_arr = []

    if ( "product_id" in idContainer ) prod_id_arr.push( idContainer.product_id )
    else {
        establishment_id_arr.forEach( est_id => {
    
            products_data.forEach( prod => {
    
                if ( est_id === prod.establishment_id ) prod_id_arr.push( prod.id )
    
            } )
        } )
    }

    /* checks if product id arr has something, else, return empty */
    if ( !prod_id_arr.length ) return []

    let salesInfo = [];

    prod_id_arr.forEach( prod_id => {
        // let found = false;
        sales_data.forEach( sale => {
            if ( sale.product_id === prod_id ) salesInfo.push( {
                sale_id: sale.id,
                product_id: prod_id,
                date: sale.date,
                base_price_sale: sale.base_price_sale,
                gross_price_sale: sale.gross_price_sale,
                quantity_sale: sale.quantity_sale
            } )
            // if ( found ) {
            //     salesInfo.forEach( ( _saleInf, i ) => {
            //         if ( _saleInf.product_id === prod_id && _saleInf.date === sale.date ) {
            //             const quantity_total = _saleInf.quantity_sale + sale.quantity_sale;

            //             const saleTotal_base = 
            //             ( _saleInf.base_price_sale * _saleInf.quantity_sale ) 
            //             + 
            //             ( sale.base_price_sale * sale.quantity_sale );

            //             const saleTotal_gross = 
            //             ( _saleInf.gross_price_sale * _saleInf.quantity_sale ) 
            //             + 
            //             ( sale.gross_price_sale * sale.quantity_sale );

            //             const newSaleBase = saleTotal_base / quantity_total;
            //             const newSaleGross = saleTotal_gross / quantity_total;

            //             salesInfo[ i ].quantity_sale = quantity_total;
            //             salesInfo[ i ].base_price_sale = newSaleBase;
            //             salesInfo[ i ].gross_price_sale = newSaleGross;
            //         } 
            //     } )
            // } else {
            //     if ( sale.product_id === prod_id ) {
            //         found = true;

            //         salesInfo.push( {
            //             sale_id: sale.id,
            //             product_id: prod_id,
            //             date: sale.date,
            //             base_price_sale: sale.base_price_sale,
            //             gross_price_sale: sale.gross_price_sale,
            //             quantity_sale: sale.quantity_sale
            //         } )
            //     }
            // }
        } )

    } )
    let orderedSales = [];

    orderedSales = salesInfo.sort( ( a, b ) => {
        if ( a.date.slice( 5, 7 ) > b.date.slice( 5, 7 ) ) {
            if ( orderBy === "asc" ) return -1
            else return 1
        }
        if ( a.date.slice( 5, 7 ) < b.date.slice( 5, 7 ) ) {
            if ( orderBy === "asc" ) return 1
            else return -1
        }
        if ( a.date.slice(8) > b.date.slice(8) ) {
            if ( orderBy === "asc" ) return -1
            else return 1
        }
        if ( a.date.slice(8) < b.date.slice(8) ) {
            if ( orderBy === "asc" ) return 1
            else return -1
        }
        return 0
    } )

    return salesInfo;
} 

const addSale = ( { product_id, quantity_sale, gross_price_sale, base_price_sale } ) => {
    return new Promise( resolve => {
        const _dt = new Date();
        const year = _dt.getFullYear()
        const month = ( _dt.getMonth() + 1 ) < 10 ? "0" + ( _dt.getMonth() + 1 ) : _dt.getMonth() + 1;
        const day = ( _dt.getDate() + 1 ) < 10 ? "0" + ( _dt.getDate() + 1 ) : _dt.getDate() + 1;

        const date = `${ year }-${ month }-${ day }`;

        sales_data.push( {
            id: sales_data[ sales_data.length - 1 ].id + 1,
            product_id,
            date,
            base_price_sale,
            gross_price_sale,
            quantity_sale
        } )

        resolve( true )
    } )
}

export { login_data, user_data, establishment_data, employee_data, products_data, sales_data, provideEstablishmentData, provideSale }