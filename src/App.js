import React, {useEffect} from 'react';
import {CLIENTS_DATA, USERS_DATA} from "./tools/constants";
import data from "./data/users";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./pages/Login";
import {updateState} from "./redux/actions/userAction";
import {connect} from "react-redux";
import {ToastContainer} from "react-toastify";
import AdminLayout from "./components/AdminLayout";

const App = (props) => {
    useEffect(() => {
        if (localStorage.getItem(USERS_DATA) == null) {
            localStorage.setItem(USERS_DATA, JSON.stringify(data));
        }
        if (localStorage.getItem(CLIENTS_DATA) == null) {
            localStorage.setItem(CLIENTS_DATA, JSON.stringify([]));
        }
        props.updateState({
            users: JSON.parse(localStorage.getItem(USERS_DATA)),
            clients: JSON.parse(localStorage.getItem(CLIENTS_DATA)),
            filteredClients: JSON.parse(localStorage.getItem(CLIENTS_DATA)),
        })
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Login} exact/>
                <Route path="/simple" component={AdminLayout}/>
                <Route path="/admin" component={AdminLayout}/>
                <Route path="/superadmin" component={AdminLayout}/>
            </Switch>
            <ToastContainer/>
        </BrowserRouter>
    );
};

export default connect(null, {updateState})(App);