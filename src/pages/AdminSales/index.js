import React, {useEffect, useState} from 'react';
import {CLIENTS_DATA, CURRENT_USER_DATA} from "../../tools/constants";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {ModalBody} from "reactstrap";

const AdminSales = (props) => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_DATA));
        if (currentUser == null || currentUser.role !== "ROLE_ADMIN") {
            toast.error("Avtorizatsiyadan o'tilmagan!");
            props.history.push("/login");
        }

        setSales(JSON.parse(localStorage.getItem(CLIENTS_DATA))?.filter(item => item.status === "SALE"))
    }, []);

    return (
        <div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-primary mb-3 me-3"
                table="table-to-sales"
                filename="table-to-sales"
                sheet="tablexls"
                buttonText="Download as Excel"/>
            <table id="table-to-sales" className="table table-bordered table-dark table-striped table-hover">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Full name</th>
                    <th>Phone number</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Region</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>CreatedBy</th>
                </tr>
                </thead>
                <tbody>
                {sales?.map((item, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.fullName}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.age}</td>
                        <td>{item.email}</td>
                        <td>{item.region}</td>
                        <td>{item.gender}</td>
                        <td>{item.status}</td>
                        <td>{props.users?.filter(item2 => item2.id === item.createdBy)[0]?.username}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
    }
};

export default connect(mapStateToProps, {})(AdminSales);