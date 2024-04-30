import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts.css';
import {BrowserRouter} from "react-router-dom";
import Footer from "./common/Footer";
import {AuthProvider} from "./user/Context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
        <Footer />
    </BrowserRouter>
);

reportWebVitals();