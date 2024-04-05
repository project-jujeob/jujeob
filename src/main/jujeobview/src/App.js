import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductList from "./product/ProductList";
import MainPage from "./MainPage";
import ProductListShow from "./product/ProductListShow";
import ProductItemDetail from "./product/ProductItemDetail";


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path='/ProductList' element={<ProductList />}/>
                <Route path='/ProductItemDetail/:productNo' element={<ProductItemDetail /> } />
                <Route path='/ProductItemDetail' element={<ProductItemDetail /> } />
            </Routes>
        </div>
    );
}

export default App;