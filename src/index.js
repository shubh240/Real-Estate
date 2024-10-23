import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import store from './store';
import { I18nextProvider } from "react-i18next";
import i18n from "./component/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToastContainer />
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider >
);
