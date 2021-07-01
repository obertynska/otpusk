import './App.css';
import {connect} from "react-redux";
import {
    BrowserRouter as Router, Link,
    Route, Redirect
} from "react-router-dom";
import Login from "./redux/components/Login/Login";

import Tickets from "./redux/components/Tickets/Tickets";
import Header from "./redux/components/Header/Header";

function App({isAuth}) {

    return (
        <Router>
            <Header isAuth={isAuth}/>
            <Route exact path='/login'
                   render={() => <Login/>}/>
            <Route exact path='/tickets'
                   render={() => <Tickets/>}/>
        </Router>
    );
}


let mapStateToProps = (state) => ({
    isAuth: state.authData.isAuth
})

export default connect(mapStateToProps, null)(App);
