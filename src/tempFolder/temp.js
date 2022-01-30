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

let transact_data = [
    {
        id: 0,
        establishment_id: 0,
        date: "2022-01-02"
    },
    {
        id: 1,
        establishment_id: 0,
        date: "2022-01-05"
    },
    {
        id: 2,
        establishment_id: 0,
        date: "2022-01-07"
    },
    {
        id: 3,
        establishment_id: 0,
        date: "2022-01-08"
    },
    {
        id: 4,
        establishment_id: 0,
        date: "2022-01-10"
    },
    {
        id: 5,
        establishment_id: 0,
        date: "2022-01-12"
    },
    {
        id: 6,
        establishment_id: 0,
        date: "2022-01-13"
    },
    {
        id: 7,
        establishment_id: 0,
        date: "2022-01-14"
    },
    {
        id: 8,
        establishment_id: 0,
        date: "2022-01-16"
    },
    {
        id: 9,
        establishment_id: 0,
        date: "2022-01-19"
    },
    {
        id: 10,
        establishment_id: 0,
        date: "2022-01-21"
    },
    {
        id: 11,
        establishment_id: 0,
        date: "2022-01-24"
    },
    {
        id: 12,
        establishment_id: 0,
        date: "2022-01-25"
    },
    {
        id: 13,
        establishment_id: 0,
        date: "2022-01-27"
    },
]

let sales_data = [
    {
        id: 0,
        transact_id: 0,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 3
    },
    {
        id: 1,
        transact_id: 0,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 5
    },
    {
        id: 2,
        transact_id: 1,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 8
    },
    {
        id: 3,
        transact_id: 1,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 7
    },
    {
        id: 4,
        transact_id: 2,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 4
    },
    {
        id: 5,
        transact_id: 2,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 9
    },
    {
        id: 6,
        transact_id: 3,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 4
    },
    {
        id: 7,
        transact_id: 3,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 4
    },
    {
        id: 8,
        transact_id: 4,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 9
    },
    {
        id: 9,
        transact_id: 4,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 12
    },
    {
        id: 10,
        transact_id: 5,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 8
    },
    {
        id: 11,
        transact_id: 5,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 8
    },
    {
        id: 12,
        transact_id: 6,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 8
    },
    {
        id: 13,
        transact_id: 6,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 9
    },
    {
        id: 14,
        transact_id: 7,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 3
    },
    {
        id: 15,
        transact_id: 7,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 3
    },
    {
        id: 16,
        transact_id: 8,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 6
    },
    {
        id: 17,
        transact_id: 8,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 6
    },
    {
        id: 18,
        transact_id: 9,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 7
    },
    {
        id: 19,
        transact_id: 9,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 7
    },
    {
        id: 20,
        transact_id: 10,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 4
    },
    {
        id: 21,
        transact_id: 11,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 5
    },
    {
        id: 22,
        transact_id: 12,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 7
    },
    {
        id: 23,
        transact_id: 12,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 7
    },
    {
        id: 24,
        transact_id: 13,
        product_id: 0,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 8
    },
    {
        id: 25,
        transact_id: 13,
        product_id: 1,
        base_price_sale: 10,
        gross_price_sale: 12,
        quantity_sale: 4
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
    let salesInfo = [];

    // transact id is more direct
    if ( "transact_id" in idContainer ) {
        sales_data.forEach( sale => {
            if ( sale.transact_id === idContainer.transact_id ) {
                salesInfo( {
                    sale_id: sale.id,
                    product_id: sale.product_id,
                    base_price_sale: sale.base_price_sale,
                    gross_price_sale: sale.gross_price_sale,
                    quantity_sale: sale.quantity_sale
                } )
            }
        } )
    } else {
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
    
        prod_id_arr.forEach( prod_id => {
            // let found = false;
            sales_data.forEach( sale => {
                if ( sale.product_id === prod_id ) {
                    let date = "";
    
                    transact_data.forEach( trans => {
                        if ( trans.id === sale.transact_id ) date = trans.date;
                    } )
    
                    if ( !date ) return;
    
                    salesInfo.push( {
                        sale_id: sale.id,
                        product_id: prod_id,
                        date,
                        base_price_sale: sale.base_price_sale,
                        gross_price_sale: sale.gross_price_sale,
                        quantity_sale: sale.quantity_sale
                    } )
                }
            } )
    
        } )

    }

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

const provideTransacts = ( establishment_id ) => {
    let transacts = [];

    transact_data.forEach( trans => {
        if ( trans.establishment_id === establishment_id ) {
            let saleTotal = 0;

            sales_data.forEach( sale => {
                if ( sale.transact_id === trans.id ) saleTotal = saleTotal + ( sale.gross_price_sale * sale.quantity_sale );
            } )

            transacts.push( {
                transaction_id: trans.id,
                date: trans.date,
                saleTotal
            } )
        }
    } )

    return transacts;
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

export { login_data, user_data, establishment_data, employee_data, products_data, sales_data, provideEstablishmentData, provideSale, provideTransacts }