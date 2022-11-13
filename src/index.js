import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
// import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        <Provider store={store}>
            <ModalProvider>

                    <App />

            </ModalProvider>
        </Provider>


);


