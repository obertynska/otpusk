import React from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";

const withAuthRedirect = (Component) => {

    const AuthRedirectComponent = (props) => {
        if(!props.isAuth) return <Redirect to='/login'/>
        return <Component {...props} />
    }

    const mapStateToProps = (state) => ({
        isAuth: state.authData.isAuth
    })

    const ConnectedAuthRedirectComponent = connect(mapStateToProps, null)(AuthRedirectComponent)

    return ConnectedAuthRedirectComponent
}

export default withAuthRedirect