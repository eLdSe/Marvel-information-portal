import { useState } from "react";
import "./registerForm.scss";

const AuthFormBook3D = ({ onLogin, onRegister }) => {
    const [activeTab, setActiveTab] = useState("login");
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
    const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

    const clearValues = ()=>{
        setLoginData({ email: "", password: "" });
        setError(false)
        setRegisterData({name: "", email: "", password: "", confirmPassword: "", });
        setErrorMessage('')
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginData.password.length < 6) {
            setErrorMessage('"Password must be at least 6 characters long"')
            setError(true)
            return
        }
        else if (loginData.password.length >= 6) {
            setMessage("Successfully logged in! ");
            onLogin && onLogin(loginData);
            setError(false)
            setLoginData({ email: "", password: "" });
            setTimeout(() => {
                setMessage("")
            }, 4000);
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            setErrorMessage('"Passwords do not match!"')
            setError(true)
            return;
        }
        if (registerData.password.length < 6 && registerData.confirmPassword.length) {
            setErrorMessage('Password must be at least 6 characters long')
            setError(true)
            return
        }
        else {
            setMessage("You have registered. Welcome !");
            onRegister && onRegister(registerData);
            setError(false)
            setRegisterData({name: "", email: "", password: "", confirmPassword: "", });
            setTimeout(() => {
                setMessage("")
            }, 4000);
        }

    }


    return (
        <div className='container'>
            <div className="auth-book-3d">
                {message ? <div className="notification">
                    {message}
                </div> : null}
                <div className="tabs">
                    <button
                        className={activeTab === "login" ? "active" : ""}
                        onClick={() => {setActiveTab("login"); clearValues()}}
                    >
                        Login
                    </button>
                    <button
                        className={activeTab === "register" ? "active" : ""}
                        onClick={() => {setActiveTab("register"); clearValues()}}
                    >
                        Register
                    </button>
                </div>
                <div className="book-container">
                    <div className={`book ${activeTab === "register" ? "flipped" : ""}`}>
                        <form className="page login-page" onSubmit={handleLoginSubmit}>
                            <h2>Login</h2>
                            <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
                            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
                            {error ? <p className="error-message">{errorMessage}</p> : null}
                            <button type="submit">Login</button>
                        </form>

                        <form className="page register-page" onSubmit={handleRegisterSubmit}>
                            <h2>Register</h2>
                            <input type="text" name="name" placeholder="Name and Surmane" value={registerData.name} onChange={handleRegisterChange} required />
                            <input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} required />
                            <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} required />
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={registerData.confirmPassword} onChange={handleRegisterChange} required />
                            {error ? <p className="error-message">{errorMessage}</p> : null}
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AuthFormBook3D;
