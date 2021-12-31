const login_data = [
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

const user_data = [
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

const establishment_data = [
    {
        id: 0,
        name: "admin store"
    }
]

const employee_data = [
    {
        userid: 0,
        establishment_id: 0,
        role: "owner"
    },
    {
        userid: 1,
        establishment_id: 0,
        role: "employee"
    }
]

const products_data = [
    {
        id: 0,
        establishment_id: 0,
        name: "coke",
        barcode: "barcodeqr",
        qrcode: "cokeqr",
        base_price: 10,
        gross_price: 12,
        quantity: 20
    }
]

const sales_data = [
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

const provideSale = ( idContainer ) => {
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

        sales_data.forEach( sale => {

            if ( sale.product_id === prod_id ) salesInfo.push( sale )

        } )
    } )

    return salesInfo;
} 

export { login_data, user_data, establishment_data, employee_data, products_data, sales_data, provideEstablishmentData, provideSale }