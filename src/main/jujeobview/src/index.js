import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts.css';
import {BrowserRouter} from "react-router-dom";
import Footer from "./common/Footer";
import {AuthProvider} from "./user/Context";
import axios from "axios";

// Axios 인터셉터 설정
axios.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios.post('/api/auth/token/refresh', {
                refreshToken: localStorage.getItem('refreshToken')
            }).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    console.log('Access token refreshed!');
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
                    return axios(originalRequest);
                }
            });
        }
        return Promise.reject(error);
    }
);

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
