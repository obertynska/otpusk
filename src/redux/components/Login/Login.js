import React from "react"
import {Field, reduxForm} from 'redux-form'
import {connect} from "react-redux";
import s from "./Login.module.css"
import {Redirect} from "react-router-dom";
import {login} from "../../authReduser";


const LoginForm = ({handleSubmit,errorMessage, login}) => {
    return (
        <form onSubmit={handleSubmit(login)} className={s.loginForm}>
            <Field name="email" component="input" placeholder="Email" type="email"/>
            <Field name="password" component="input" placeholder="Password" type="password"/>
            {errorMessage &&
            <div className={s.errorMessage}>{errorMessage}</div>
            }
            <button type="submit">log in</button>
        </form>

    )
}


const LoginReduxForm = reduxForm({
    form: 'login',
    touchOnBlur: false,
})(LoginForm)


const Login = ({login, isAuth, errorMessage}) => {
    if(isAuth){
        return <Redirect to = {`/tickets`}/>
    }else{
        return (
            <div className={s.loginForm__wrapper}>
                <h3>Login page</h3>
                <LoginReduxForm login={login} errorMessage={errorMessage}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.authData.isAuth,
    errorMessage: state.authData.errorMessage
})



export default connect(mapStateToProps, {login})(Login)