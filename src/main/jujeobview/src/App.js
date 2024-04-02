import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductList from "./product/ProductList";
import MainPage from "./MainPage";


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path='/ProductList' element={<ProductList />}>
                </Route>
            </Routes>
        </div>
    );
}

export default App;