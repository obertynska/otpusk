import {authenticateUser, createToken, getUser, validateToken} from "../sdk";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA',
    SET_AUTH_ERROR = 'SET_AUTH_ERROR',
    SET_APP_INITIALIZE = 'SET_APP_INITIALIZE'

let initialState = {
    appInitialized: false,
    isAuth: false,
    errorMessage: '',
    email: ''
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                isAuth: true,
                email: action.email
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                errorMessage: action.message
            }
        case SET_APP_INITIALIZE:
            return {
                ...state,
                appInitialized: true
            }
        default:
            return state
    }
}

const setIsAuthorized = (email) => {
    return {
        type: SET_AUTH_USER_DATA,
        email
    }
}

const setErrorMessage = (message) => {
    return {
        type: SET_AUTH_ERROR,
        message
    }
}


export const login = ({password, email, rememberMe=false}) => dispatch => {
    if(rememberMe === true){
        let token = createToken(email, password)
        window.localStorage.setItem('token', token);
    }

    return authenticateUser(password, email)
        .then(data => {
            if (data.status === 200) {
                dispatch(setIsAuthorized(email))
            }

        })
        .catch((err)=> {
            let message = "Email or password is incorrect"
            dispatch(setErrorMessage(message))
        })
}

const isinitialized = () => ({
    type: SET_APP_INITIALIZE
})

export const appInitialize = () => dispatch => {
   let token = window.localStorage.getItem('token');

   if(token){
      validateToken(token)
          .then(res=> {
             if(res){
                 getUser(token)
                     .then((res)=>{
                         if(res) {
                             dispatch(setIsAuthorized(res.email))
                         }
                     })
                     .catch(err => console.error(err))
             }
          })
          .catch(err => console.error(err))
   }

   dispatch(isinitialized())


}

export default authReducer