"use client";
import './styles/css/bootstrap/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import './styles/css/bootstrap/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redux stuffs
/*
import store from './redux/app/store';
import { Provider } from 'react-redux';
import ErrorBoundary from '../src/ErrorBoundary'
*/

//import { ErrorBoundary } from "react-error-boundary";
/*
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <App />
    </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
