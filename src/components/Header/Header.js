import {Link, Redirect} from "react-router-dom";
import s from "./Header.module.css"

const Header = ({isAuth, email}) => {
       return (
        <div className={s.loginBlock}>
            {isAuth
                ? <p>{email}</p>
                : <Link to='/login' className={s.loginBtn}>login</Link>
            }
        </div>
    )
}

export default Header