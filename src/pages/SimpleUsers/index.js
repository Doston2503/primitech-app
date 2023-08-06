import React, {useEffect} from 'react';
import {CURRENT_USER_DATA} from "../../tools/constants";
import {toast} from "react-toastify";
import {updateState, saveClient, changeClient, deleteClient, filterClient} from "../../redux/actions/userAction";
import {connect} from "react-redux";
import {Modal, ModalBody} from "reactstrap"
import {formatDate} from "../../tools/helpers";
import {v4 as uuidv4} from 'uuid';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const SimpleUsers = (props) => {
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_DATA));
        if (currentUser == null || currentUser.role !== "ROLE_SIMPLE") {
            toast.error("Avtorizatsiyadan o'tilmagan!");
            props.history.push("/login");
        }
    }, []);

    const openModal = () => {
        props.updateState({isClientAddModalOpen: true})
    };

    const closeModal = () => {
        props.updateState({isClientAddModalOpen: false, selectedClient: null})
    };

    const saveClient = (e) => {
        e.preventDefault();
        const tempClient = {
            fullName: e.target.fullName.value,
            email: e.target.email.value,
            age: e.target.age.value,
            gender: e.target.gender.value,
            region: e.target.region.value,
            phoneNumber: e.target.phoneNumber.value,
            createdAt: formatDate(new Date()),
            createdBy: JSON.parse(localStorage.getItem(CURRENT_USER_DATA)).id
        };
        if (props.selectedClient){
            props.changeClient({
                ...props.selectedClient,
                ...tempClient,
            })
        } else {
            props.saveClient({
                id: uuidv4(),
                status: "CREATED",
                ...tempClient
            })
        }
    };

    const openStatusModal = (client) => {
        props.updateState({
            isClientStatusModalOpen: true,
            selectedClient: client,
            selectedStatus: client.status
        })
    };

    const closeStatusModal = () => {
        props.updateState({
            isClientStatusModalOpen: false,
            selectedClient: null,
            selectedStatus: ""
        })
    };

    const changeStatus = (e) => {
        e.preventDefault();
        const status = e.target.status.value;

        props.changeClient({
            ...props.selectedClient,
            status: status,
            meetingTime: status === "MEET" ? e.target.meetingTime.value : "",
            meetingPlace: status === "MEET" ? e.target.meetingPlace.value : "",
            reason: status === "REJECTED" ? e.target.reason.value : "",
            createdAt: formatDate(new Date()),
        })
    };

    const editClient = (client) => {
        props.updateState({
            isClientAddModalOpen: true,
            selectedClient: client
        })
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <select name="status" className="form-select"
                            onChange={(e) => props.filterClient(e.target.value)}>
                        <option value="ALL">Hammasi</option>
                        <option value="CREATED">Yaratilgan</option>
                        <option value="SALE">Sotuv</option>
                        <option value="MEET">Uchrashuv</option>
                        <option value="CONNECT_FAIL">Bog'lanib bo'lmadi</option>
                        <option value="REJECTED">Rad etilgan</option>
                    </select>
                </div>
                <div className="d-flex">

                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-primary me-3"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download as Excel"/>
                    <button type="button" className="btn btn-success" onClick={openModal}>Mijoz qo'shish</button>

                </div>
            </div>
            <h4 className="text-center mt-3">Client List</h4>

            <table id="table-to-xls" className="table table-dark table-bordered table-striped table-hover ">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Region</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {props.filteredClients?.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td>{item.region}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.status} {item.status === "MEET" ? `(${item.meetingTime}, ${item.meetingPlace})` : item.status === "REJECTED" ? `(${item.reason})` : ""}</td>
                        <td>
                            <button type="button" className="btn btn-secondary me-2"
                                    onClick={() => openStatusModal(item)}>Holatni o'zgartirish
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => editClient(item)}>Edit
                            </button>
                            <button type="button" className="btn btn-danger ms-2"
                                    onClick={() => props.deleteClient(item.id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal isOpen={props.isClientAddModalOpen} toggle={closeModal}>
                <ModalBody>
                    <form onSubmit={saveClient}>
                        <input type="text" defaultValue={props.selectedClient ? props.selectedClient.fullName: ""} className="form-control" name="fullName" placeholder="Full name"/>
                        <input type="text" defaultValue={props.selectedClient ? props.selectedClient.email: ""} className="form-control my-3" name="email" placeholder="Email"/>
                        <input type="text" defaultValue={props.selectedClient ? props.selectedClient.phoneNumber: ""} className="form-control" name="phoneNumber" placeholder="Phone number"/>
                        <input type="text" defaultValue={props.selectedClient ? props.selectedClient.age: ""} className="form-control my-3" name="age" placeholder="Age"/>
                        <select name="gender" defaultValue={props.selectedClient ? props.selectedClient.gender: ""} className="form-select">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select name="region" defaultValue={props.selectedClient ? props.selectedClient.region: ""} className="form-control my-3">
                            <option value="Navoiy">Navoiy</option>
                            <option value="Toshkent">Toshkent</option>
                            <option value="Buxoro">Buxoro</option>
                        </select>
                        <button type="submit" className="btn btn-success ms-auto d-block">Saqlash</button>
                    </form>
                </ModalBody>
            </Modal>
            <Modal isOpen={props.isClientStatusModalOpen} toggle={closeStatusModal}>
                <ModalBody>
                    <form onSubmit={changeStatus}>
                        <select name="status" className="form-select"
                                onChange={(e) => props.updateState({selectedStatus: e.target.value})}>
                            <option value="CREATED">Yaratilgan</option>
                            <option value="SALE">Sotuv</option>
                            <option value="MEET">Uchrashuv</option>
                            <option value="CONNECT_FAIL">Bog'lanib bo'lmadi</option>
                            <option value="REJECTED">Rad etilgan</option>
                        </select>
                        {props.selectedStatus === "MEET" ?
                            <>
                                <input type="text" className="form-control mt-3" name="meetingTime"
                                       placeholder="Uchrashuv vaqti" required/>
                                <input type="text" className="form-control mt-3" name="meetingPlace"
                                       placeholder="Uchrashuv joyi (lokatsiyasi)" required/>
                            </> : props.selectedStatus === "REJECTED" ?
                                <textarea className="form-control mt-3" placeholder="Sababi" name="reason"
                                          required/> : ""
                        }

                        <button type="submit" className="btn btn-success d-block ms-auto mt-3">Saqlash</button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        clients: state.users.clients,
        isClientAddModalOpen: state.users.isClientAddModalOpen,
        isClientStatusModalOpen: state.users.isClientStatusModalOpen,
        selectedClient: state.users.selectedClient,
        selectedStatus: state.users.selectedStatus,
        filteredClients: state.users.filteredClients,
    }
};

export default connect(mapStateToProps, {updateState, saveClient, changeClient, deleteClient, filterClient})(SimpleUsers);