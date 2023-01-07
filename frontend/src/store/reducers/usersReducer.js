import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOGOUT_USER_SUCCESS } from "../actionTypes";

const initialState = {
    user: null,
    registerError: null,
    loginError: null,
    loading: false,
    notificationOpened: false,
    notificationType: "",
    notificationMessage: ""
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return { ...state, loading: true };
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false };
        case REGISTER_USER_FAILURE:
            return { ...state, loading: false, registerError: action.error };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.user };
        case LOGIN_USER_FAILURE:
            return { ...state, loginError: action.error };
        case "SHOW_NOTIFICATION":
            return { ...state, notificationOpened: true, notificationMessage: action.message, notificationType: action.variant }
        case "HIDE_NOTIFICATION":
            return { ...state, notificationOpened: false };
        case LOGOUT_USER_SUCCESS:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default usersReducer;
