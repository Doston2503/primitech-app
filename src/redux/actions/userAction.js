import {UPDATE_STATE_USER} from "../types";
import {toast} from "react-toastify";
import {CLIENTS_DATA, CURRENT_USER_DATA, USERS_DATA} from "../../tools/constants";
import {writeToLocalStorage} from "../../tools/helpers";


export function updateState(state) {
    return {
        type: UPDATE_STATE_USER,
        payload: state
    }
}

export const login = (data, history) => (dispatch, getState) => {
    const users = getState().users.users;
    const filteredUsers = users.filter(item => item.username === data.username && item.password === data.password);
    if (filteredUsers.length > 0) {
        const currentUser = filteredUsers[0];
        writeToLocalStorage(CURRENT_USER_DATA, currentUser)
            .then(() => {
                toast.success("Muvaffaqqiyatli");
                if (currentUser.role === "ROLE_SIMPLE") {
                    history.push("/simple/users")
                } else if (currentUser.role === "ROLE_ADMIN") {
                    history.push("/admin/employees")
                } else if (currentUser.role === "ROLE_SUPER_ADMIN") {
                    history.push("/superadmin/simples")
                }
            });
    } else {
        toast.error("Username yoki parol noto'g'ri!");
    }
};

export const saveClient = (data) => (dispatch, getState) => {
    const clients = getState().users.clients;
    dispatch(updateState({
        clients: clients.concat(data),
        filteredClients: getState().users.filteredStatus === "ALL" ? clients.concat(data) : clients.concat(data).filter(item => item.status === getState().users.filteredStatus),
        isClientAddModalOpen: false
    }));
    localStorage.setItem(CLIENTS_DATA, JSON.stringify(clients.concat(data)));
    toast.success("Mijoz saqlandi!");
};

export const changeClient = (data) => (dispatch, getState) => {
    const clients = getState().users.clients;
    dispatch(updateState({
        clients: clients.map(item => {
            return item.id === data.id ?
                data : item
        }),
        filteredClients: getState().users.filteredStatus === "ALL" ? clients.map(item => {
            return item.id === data.id ?
                data : item
        }) : clients.map(item => {
            return item.id === data.id ?
                data : item
        }).filter(item => item.status === getState().users.filteredStatus),
        isClientAddModalOpen: false,
        isClientStatusModalOpen: false,
        selectedClient: null,
        selectedStatus: ""
    }));
    localStorage.setItem(CLIENTS_DATA, JSON.stringify(clients.map(item => {
        return item.id === data.id ?
            data : item
    })));
    toast.success("Mijoz saqlandi!");
};

export const deleteClient = (id) => (dispatch, getState) => {
    const clients = getState().users.clients;
    dispatch(updateState({
        clients: clients.filter(item => item.id !== id),
        filteredClients: getState().users.filteredStatus === "ALL" ? clients.filter(item => item.id !== id) : clients.filter(item => item.id !== id).filter(item => item.status === getState().users.filteredStatus)
    }));
    localStorage.setItem(CLIENTS_DATA, JSON.stringify(clients.filter(item => item.id !== id)));
    toast.success("Mijoz o'chirildi")
};

export const filterClient = (value) => (dispatch, getState) => {
    const clients = getState().users.clients;
    dispatch(updateState({
        filteredClients: value === "ALL" ? clients : clients.filter(item => item.status === value),
        filteredStatus: value
    }))
};

export const getEmployeeClients = (userId) => (dispatch, getState) => {
    dispatch(updateState({
        employeeClients: JSON.parse(localStorage.getItem(CLIENTS_DATA)).filter(item => item.createdBy === userId)
    }))
};

export const deleteUser = (id) => (dispatch, getState) => {
    const users = getState().users.users;
    dispatch(updateState({
        users: users.filter(item => item.id !== id),
    }));
    localStorage.setItem(USERS_DATA, JSON.stringify(users.filter(item => item.id !== id)));
    toast.success("User o'chirildi")
};

export const editUser = (user) => (dispatch, getState) => {
    const users = getState().users.users;
    dispatch(updateState({
        users: users.map(item => {
            return item.id === user.id ?
                user : item
        }),
        editUserModal: false
    }));
    localStorage.setItem(USERS_DATA, JSON.stringify(users.map(item => {
        return item.id === user.id ?
            user : item
    })));
    toast.success("User o'zgartirildi")
};