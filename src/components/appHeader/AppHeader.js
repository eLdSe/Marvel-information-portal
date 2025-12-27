import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './appHeader.scss';

const AppHeader = (props) => {
    const activeClass = "active-link";

    return (
        <header className="app__header">
            <div className="app__header-top">
                <h1 className="app__title">
                    <Link to='/'>
                        <span>Marvel</span> information portal
                    </Link>
                </h1>
            </div>

            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            to='characters'
                            className={({ isActive }) =>
                                isActive ? activeClass : ""
                            }
                        >
                            Characters
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/comics'
                            className={({ isActive }) =>
                                isActive ? activeClass : ""
                            }
                        >
                            Comics
                        </NavLink>
                    </li>
                    {/*                    <li>
                        <NavLink
                            to='/login'
                            className={({ isActive }) =>
                                isActive ? "login-button active" : "login-button"
                            }
                            style={{ 'display': props.login ? 'none' : 'block' }}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            onClick={() => onOutput()}
                            className="login-button"
                            style={{ 'display': props.login ? 'block' : 'none' }}

                        >
                            Log-out
                        </NavLink>
                    </li> */}
                    <li className="profile">
                        {/* КНОПКА (гамбургер / аватар / иконка) */}
                        {props.login ? (
                            <NavLink to='/profile' className="profile__btn">
                                <div className="profile__avatar">
                                    <span className="avatar__head"></span>
                                    <span className="avatar__body"></span>
                                </div>
                            </NavLink>
                        ) : (
                            <NavLink to="/login" className="login-button">
                                Login
                            </NavLink>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
