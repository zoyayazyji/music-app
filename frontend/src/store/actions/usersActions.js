import axios from "../../axiosMusic";
import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_SUCCESS } from "../actionTypes";
import { showNotification } from "./commonActions";

const registerUserRequest = () => {
    return { type: REGISTER_USER_REQUEST };
};

const registerUserSuccess = () => {
    return { type: REGISTER_USER_SUCCESS };
};

const registerUserFailure = (error) => {
    return { type: REGISTER_USER_FAILURE, error };
};

export const registerUser = (userData, navigate) => {
    return async (dispatch) => {
        dispatch(registerUserRequest());
        try {
            await axios.post("/users", userData);
            dispatch(registerUserSuccess());
            navigate("/");
        } catch (e) {
            if (e?.response?.data) {
                dispatch(registerUserFailure("This User already exist"));
            } else {
                dispatch(registerUserFailure({ global: "Lost connection" }));
            }
        }
    };
};

const loginUserSuccess = (user) => {
    return { type: LOGIN_USER_SUCCESS, user };
};

const loginUserFailure = (error) => {
    return { type: LOGIN_USER_FAILURE, error };
};

export const loginUser = (userData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("users/session", userData);
            dispatch(loginUserSuccess(response.data));
            navigate("/");
        } catch (e) {
            console.dir(e);
            dispatch(loginUserFailure(e?.response?.data?.message));
        }
    };
};

const logoutUserSuccess = () => {
    return { type: LOGOUT_USER_SUCCESS };
};

const logoutUserFailure = (error) => {
    return { type: LOGOUT_USER_FAILURE, error };
};

export const logoutUser = (navigate) => {
    return async (dispatch, getState) => {
        try {
            await axios.delete("/users/session", {
                headers: {
                    'Authorization': getState().users.user?.token
                }
            });
            dispatch(logoutUserSuccess());
            navigate("/");
            dispatch(showNotification("You have successfully logged out"));
        } catch (e) {
            dispatch(logoutUserFailure(e?.response?.data));
            dispatch(showNotification("Failed to log out", "error"));
        }
    }
};                                                                                                                                                                      
