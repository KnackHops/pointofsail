import { Route, Routes } from "react-router-dom";
import MainHeader from "./Header/MainHeader";
import Main from "./Main/Main";

const UnderRootContent = () => {
    return (
        <>
            <MainHeader />
            <Routes>
                <Route path="" element={ <Main /> }>
                    
                </Route>
            </Routes>  
        </>
    )
}

export default UnderRootContent;