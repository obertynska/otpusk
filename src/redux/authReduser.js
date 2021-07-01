import {authenticateUser} from "../sdk";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA',
    SET_AUTH_ERROR = 'SET_AUTH_ERROR'

let initialState = {
    isAuth: false,
    errorMessage: ''
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                isAuth: true
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                errorMessage: action.message
            }
        default:
            return state
    }
}

const setIsAuthorized = () => {
    return {
        type: SET_AUTH_USER_DATA
    }
}

const setErrorMessage = (message) => {
    return {
        type: SET_AUTH_ERROR,
        message
    }
}


export const login = ({password, email}) => dispatch => {

    return authenticateUser(password, email)
        .then(data => {
            if (data.status === 200) {
                dispatch(setIsAuthorized())
            }

        })
        .catch((err)=> {
            let message = "Email or password is incorrect"
            dispatch(setErrorMessage(message))
        })
}

export default authReducer