import './App.css';
import {connect} from "react-redux";
import {
    BrowserRouter as Router, Link,
    Route, Redirect
} from "react-router-dom";
import Login from "./redux/components/Login/Login";

import Tickets from "./redux/components/Tickets/Tickets";
import Header from "./redux/components/Header/Header";
import {appInitialize} from "./redux/authReduser";
import * as PropTypes from "prop-types";
import {Component} from "react";
import Preloader from "./redux/components/common/Preloader/Preloader";

class App extends Component {
    componentDidMount() {
        this.props.appInitialize()
    }

    render() {
        if (!this.props.appInitialized) return <Preloader/>

        return (
            <Router>
                <Header email={this.props.email} isAuth={this.props.isAuth}/>
                <Route path='/login'
                       render={() => <Login/>}/>
                <Route path='/tickets'
                       render={() => <Tickets/>}/>
            </Router>
        );
    }
}

App.propTypes = {isAuth: PropTypes.bool}


let mapStateToProps = (state) => ({
    isAuth: state.authData.isAuth,
    appInitialized: state.authData.appInitialized,
    email: state.authData.email
})

export default connect(mapStateToProps, {appInitialize})(App);
