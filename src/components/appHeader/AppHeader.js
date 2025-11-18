import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    const activeClass = "active-link"; 

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            to='/'
                            className={({ isActive }) => isActive ? activeClass : ""}
                        >
                            Characters
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/comics'
                            className={({ isActive }) => isActive ? activeClass : ""}
                        >
                            Comics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/login'
                            className={({ isActive }) => isActive? "login-button active" : "login-button"}
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;
