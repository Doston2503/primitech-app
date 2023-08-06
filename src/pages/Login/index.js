import React from 'react';
import {login} from "../../redux/actions/userAction";
import {connect} from "react-redux";

const Login = (props) => {
    const login = (e) => {
        e.preventDefault();
        props.login({
            username: e.target.username.value,
            password: e.target.password.value
        }, props.history)
    };
    return (
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="text-center">Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={login}>
                                    <input type="text" className="form-control" name="username" placeholder="Username"
                                           required/>
                                    <input type="password" className="form-control my-3" name="password"
                                           placeholder="Password"
                                           required/>
                                    <button type="submit" className="btn btn-success d-block w-100">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.users.users
    }
};

export default connect(mapStateToProps, {login})(Login);