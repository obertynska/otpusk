import {authenticateUser, createToken, getFlights, getUser, validateToken} from "../sdk";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA',
    SET_AUTH_ERROR = 'SET_AUTH_ERROR',
    SET_APP_INITIALIZE = 'SET_APP_INITIALIZE',
    SET_USER_TOKEN = 'SET_USER_TOKEN',
    SET_FLIGHTS = 'SET_FLIGHTS',
    SET_SEARCHED_FLIGHTS = 'SET_SEARCHED_FLIGHTS'

let initialState = {
    appInitialized: false,
    isAuth: false,
    errorMessage: '',
    email: '',
    flights: {},
    isSearching: false,
    searchedFlights: {}
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
        case SET_FLIGHTS:
            return {
                ...state,
                flights: {...action.flights}
            }
        case SET_SEARCHED_FLIGHTS:
            return {
                ...state,
                isSearching: true,
                searchedFlights: {...action.searchedFlights}
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

export const setSearchedFlights = (searchedFlights) => {
    return {
        type: SET_SEARCHED_FLIGHTS,
        searchedFlights
    }
}

const setErrorMessage = (message) => {
    return {
        type: SET_AUTH_ERROR,
        message
    }
}


export const login = ({password, email, rememberMe = false}) => dispatch => {
    if (rememberMe === true) {
        let token = createToken(email, password)
        window.localStorage.setItem('token', token);
    }

    return authenticateUser(password, email)
        .then(data => {
            if (data.status === 200) {
                dispatch(setIsAuthorized(email))
            }

        })
        .catch((err) => {
            let message = "Email or password is incorrect"
            dispatch(setErrorMessage(message))
        })
}

const isinitialized = () => ({
    type: SET_APP_INITIALIZE
})

export const appInitialize = () => dispatch => {
    let token = window.localStorage.getItem('token');

    if (token) {
        validateToken(token)
            .then(res => {
                if (res) {
                    getUser(token)
                        .then((res) => {
                            if (res) {
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


const setUserFlights = (flights) => {
    return {
        type: SET_FLIGHTS,
        flights
    }
};




export const showUserTickets = () => dispatch => {

    let token = window.localStorage.getItem('token');

    if (token) {
        getFlights(token)
            .then(response => response.body)
            .then(rb => {
                const reader = rb.getReader();

                return new ReadableStream({
                    start(controller) {
                        function push() {
                            reader.read().then(({done, value}) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                controller.enqueue(value);
                                push();
                            })
                        }

                        push();
                    }
                });
            })
            .then(stream => {
                // Respond with our stream
                return new Response(stream, {headers: {"Content-Type": "text/html"}}).text();
            })
            .then(result => {
                // Do things with result
                let flights = JSON.parse(result)
                dispatch(setUserFlights(flights.data))
            });
    }
}


export default authReducer