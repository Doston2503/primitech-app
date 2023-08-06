import React, {useEffect, useState} from 'react';
import {CURRENT_USER_DATA, USERS_DATA} from "../../tools/constants";
import {connect} from "react-redux";
import {getEmployeeClients} from "../../redux/actions/userAction";
import {Modal, ModalBody} from "reactstrap";
import {toast} from "react-toastify";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const AdminEmployees = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_DATA));
        if (currentUser == null || currentUser.role !== "ROLE_ADMIN") {
            toast.error("Avtorizatsiyadan o'tilmagan!");
            props.history.push("/login");
        }
    }, []);

    const openModal = (user) => {
        setIsOpen(true);
        props.getEmployeeClients(user.id);
    };
    return (
        <div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-primary mb-3 me-3"
                table="table-to-employee"
                filename="table-to-employee"
                sheet="tablexls"
                buttonText="Download as Excel"/>
            <table id="table-to-employee" className="table table-bordered table-dark table-striped table-hover">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Username</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {JSON.parse(localStorage.getItem(USERS_DATA))?.filter(item => item.role ==="ROLE_SIMPLE").map((item, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td><button type="button" className="btn btn-info" onClick={() => openModal(item)}>Mijozlar</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isOpen} toggle={() => {setIsOpen(false)}} size="xl">
                <ModalBody>
                    <div className="row">
                        <div className="col-md-3">
                            <h6>Sotuvlar soni: </h6>
                            <p>{props.employeeClients.filter(item => item.status === "SALE")?.length}</p>
                        </div>
                        <div className="col-md-3">
                            <h6>Rad etilganlar soni: </h6>
                            <p>{props.employeeClients.filter(item => item.status === "REJECTED")?.length}</p>
                        </div>
                        <div className="col-md-3">
                            <h6>Uchrashuv belgilanganlar soni: </h6>
                            <p>{props.employeeClients.filter(item => item.status === "MEET")?.length}</p>
                        </div>
                        <div className="col-md-3">
                            <h6>Bog'lanib bo'lmaganlar soni: </h6>
                            <p>{props.employeeClients.filter(item => item.status === "CONNECT_FAIL")?.length}</p>
                        </div>
                    </div>
                    <table id="table-to-employee-all" className="table table-bordered table-dark table-striped table-hover">
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
                        </tr>
                        </thead>
                        <tbody>
                        {props.employeeClients.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.fullName}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.age}</td>
                                <td>{item.email}</td>
                                <td>{item.region}</td>
                                <td>{item.gender}</td>
                                <td>{item.status} {item.status === "MEET" ? `(${item.meetingTime}, ${item.meetingPlace})` : item.status === "REJECTED" ? `(${item.reason})` : ""}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-primary mb-3 me-3"
                        table="table-to-employee-all"
                        filename="table-to-employee-all"
                        sheet="tablexls"
                        buttonText="Download as Excel"/>
                </ModalBody>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        employeeClients: state.users.employeeClients
    }
};

export default connect(mapStateToProps, {getEmployeeClients})(AdminEmployees);