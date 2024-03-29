import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.scss';
import App from './App';
import {includeCDNs} from './utils/functions';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from "./store"


includeCDNs("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js");
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
