import React from 'react';
import ReactDOM from 'react-dom/client';
import "react-toastify/dist/ReactToastify.css";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {applyMiddleware, createStore} from "redux";
import {Provider} from 'react-redux'
import {rootReducer} from "./redux/reducer/rootReducer";
import thunk from "redux-thunk";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);


