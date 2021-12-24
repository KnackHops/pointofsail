import { createContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

const initCur = {
    processed: "",
    raw: ""
}

const curRouteIndexes = [
    {
        paths: [ "", "/" ],
        processed: "landpage",
    },
    {
        paths: [ "/home" ],
        processed: "home"
    },
    {
        paths: [ "/profile" ],
        processed: "profile"
    },
    {
        paths: [ "/establishment" ],
        processed: "establishment"
    },
    {
        paths: [ "/login" ],
        processed: "login"
    },
    {
        paths: [ "/register" ],
        processed: "register"
    }
]

const subRouteIndexes = {
    "profile": [
        {
            paths: "/companions",
            processed: "companions"
        },
        {
            paths: "/subscription",
            processed: "subscription"
        },
        {
            paths: "/payment",
            processed: "payment"
        }
    ],
    "establishment": [
        {
            paths: "lishment/own",
            processed: "own"
        }
    ]
}

const RouteContext = createContext();

const LocationMonitor = ( { children } ) => {
    const [ curRoute, setCurRoute ] = useState( initCur );
    const [ subRoute, setSubRoute ] = useState("")

    const { pathname } = useLocation();

    const curRouteIndexer = () => {

        let foundCurRoute = false;

        curRouteIndexes.forEach( ( { paths, processed }, i ) => {

            paths.forEach( _path => {
                /* IF foundCurRoute is true without going through the filter below */
                /* it means it was turned to true from a previous loop therefore we return to skip until loop is done */
                if ( foundCurRoute ) return

                /* sets foundCurRoute to true if route is found */
                /* for home route, empty and "/" cannot be used of includes because it's too vague */
                /* hence why we use === instead */
                if ( i ) {
                    if ( pathname.includes( _path ) ) foundCurRoute = true
                } else {
                    if ( pathname === _path ) foundCurRoute = true
                }

                /* if foundCurRoute is true from the filter above this will then hit */
                /* sets the curRoute to the appropriate data */
                if ( foundCurRoute ) {

                    let capitalized = processed.charAt(0).toUpperCase() + processed.slice(1)

                    setCurRoute( {
                        processed,
                        capitalized,
                        raw: pathname
                     } )

                     let foundSubRoute = false;

                     if ( processed in subRouteIndexes ) {

                         subRouteIndexes[ processed ].forEach( _sub => {
                             if ( pathname.includes( _sub.paths ) ) {
                                 setSubRoute( _sub.processed );
                                 foundSubRoute = true;
                             }
                         } )
                     }

                     if ( !foundSubRoute && subRoute ) setSubRoute( "" );
                }

            })

        } )

        if ( !foundCurRoute ) {
            if ( subRoute ) setSubRoute("")
        }
    }

    useEffect( () => {
        curRouteIndexer();
    }, [ pathname ] )
    
    return (
        <div id="under_root">
            <RouteContext.Provider value={ { curRoute, subRoute } }>
                { children }
            </RouteContext.Provider>
        </div>
    )
}

export default LocationMonitor;
export { RouteContext };