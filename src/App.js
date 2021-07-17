import './App.css';
import {connect} from "react-redux";
import {
    BrowserRouter as Router, Link,
    Route, Redirect
} from "react-router-dom";

import {appInitialize, showUserTickets} from "./redux/authReduser";
import * as PropTypes from "prop-types";
import {useEffect} from "react";
import Preloader from "./components/common/Preloader/Preloader";
import Login from "./components/Login/Login";
import Tickets from "./components/Tickets/Tickets";
import Header from "./components/Header/Header";


const App = ({appInitialize, appInitialized, email, isAuth}) => {

    useEffect(appInitialize, [])

    if (!appInitialized) return <Preloader/>

    return (
        <Router>
            <Header email={email} isAuth={isAuth}/>
            <Route path='/login'
                   render={() => <Login/>}/>
            <Route path='/tickets'
                   render={() => <Tickets isAuth={isAuth} showUserTickets={showUserTickets}/>}/>
        </Router>
    );
}


let mapStateToProps = (state) => ({
    isAuth: state.authData.isAuth,
    appInitialized: state.authData.appInitialized,
    email: state.authData.email
})

export default connect(mapStateToProps, {appInitialize})(App);
