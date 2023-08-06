import React, {useEffect} from 'react';
import {CURRENT_USER_DATA} from "../../tools/constants";
import {toast} from "react-toastify";
import {Modal, ModalBody} from "reactstrap";
import {connect} from "react-redux";
import {deleteUser, editUser, updateState} from "../../redux/actions/userAction";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const SuperAdminAdmins = (props) => {
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_DATA));
        if (currentUser == null || currentUser.role !== "ROLE_SUPER_ADMIN") {
            toast.error("Avtorizatsiyadan o'tilmagan!");
            props.history.push("/login");
        }
    }, []);

    const editUser = item => {
        props.updateState({
            editUserModal: true,
            selectedUser: item
        })
    };
    const edit = (e) => {
        e.preventDefault();
        props.editUser({
            ...props.selectedUser,
            username: e.target.username.value,
            role: e.target.role.value
        })
    };

    console.log(props.users)

    return (
        <div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-primary mb-3 me-3"
                table="table-to-simple-admin"
                filename="table-to-simple-admin"
                sheet="tablexls"
                buttonText="Download as Excel"/>
            <table id="table-to-simple-admin" className="table table-bordered table-dark table-striped table-hover">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Username</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {props.users?.filter(item => item.role === "ROLE_ADMIN")?.map((item, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>
                            <button type="button" className="btn btn-primary me-2" onClick={() => editUser(item)}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={() => props.deleteUser(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={props.editUserModal} toggle={() => props.updateState({editUserModal: false, selectedUser: null})}>
                <ModalBody>
                    <form onSubmit={edit}>
                        <input type="text" className="form-control" name="username" placeholder="Username" defaultValue={props.selectedUser ? props.selectedUser.username : ""}/>
                        <select name="role" className="form-select my-3" defaultValue={props.selectedUser ? props.selectedUser.role : ""}>
                            <option value="ROLE_SIMPLE">ROLE_SIMPLE</option>
                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                            <option value="ROLE_SUPER_ADMIN">ROLE_SUPER_ADMIN</option>
                        </select>
                        <button type="submit" className="btn btn-primary">Saqlash</button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.users.users,
        selectedUser: state.users.selectedUser,
        editUserModal: state.users.editUserModal,
    }
};

export default connect(mapStateToProps, {deleteUser,editUser, updateState})(SuperAdminAdmins);