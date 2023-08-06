import {UPDATE_STATE_USER} from "../types";

const initialState = {
    users: [],
    clients: [],
    isClientAddModalOpen: false,
    isClientStatusModalOpen: false,
    selectedClient: null,
    selectedStatus: "",
    filteredClients: [],
    filteredStatus: "ALL",
    employeeClients: [],
    selectedUser: null,
    editUserModal: false
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_STATE_USER:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}