import {Link} from "react-router-dom";
import s from "./Header.module.css"

const Header = ({isAuth}) => {
    return (
        <div className={s.loginBlock}>
            {isAuth
                ? <p>authorized user</p>
                : <Link to='/login' className={s.loginBtn}>login</Link>
            }
        </div>
    )
}

export default Header