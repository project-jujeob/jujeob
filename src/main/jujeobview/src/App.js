import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductList from "./product/ProductList";
import MainPage from "./MainPage";
import ProductListShow from "./product/ProductListShow";
import ProductItemDetail from "./product/ProductItemDetail";
import BbsList from "./Board/BulletinBoardSystem/BbsList";


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path='/ProductList' element={<ProductList />}/>
                {/*<Route path='/ProudctList/:productNo' component={ProductListShow} />*/}
                <Route path='/ProuductItemDetail/:productNo' element={<ProductItemDetail /> } />

                {/*Board*/}
                <Route path='/BbsList' element={<BbsList />}/>
            </Routes>
        </div>
    );
}

export default App;