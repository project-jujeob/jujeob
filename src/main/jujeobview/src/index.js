import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts.css';
import {BrowserRouter} from "react-router-dom";
import Footer from "./common/Footer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
    <Footer />
  </BrowserRouter>
);

reportWebVitals();
