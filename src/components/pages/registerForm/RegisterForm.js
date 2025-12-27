import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

import { Helmet } from "react-helmet";
import * as Yup from "yup";

import "./registerForm.scss";

const InputField = ({ label, name, type, formik, placeholder, autoComplete }) => (
    <div className="form-group">
        {label && <label htmlFor={name}>{label}</label>}

        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors[name] && formik.touched[name] ? "input error" : "input"}
            autoComplete={autoComplete}
        />

        {formik.errors[name] && formik.touched[name] && (
            <div className="hata-message">{formik.errors[name]}</div>
        )}
    </div>
);

const AuthFormBook3D = (props) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("login");
    const [message, setMessage] = useState("")

    const loginFormik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6, "Minimum 6 characters").required("Required")
        }),
        onSubmit: async (values) => {
            try {
                const res = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });

                const data = await res.json();
                console.log('LOGIN RESPONSE:', data);


                if (!res.ok) {
                    throw new Error(data.error || 'Login failed');
                }

                localStorage.setItem('user', JSON.stringify(data.user));

                setMessage('✅ Login successful!');
                setTimeout(() => {
                    setMessage('');
                    props.setLogin(true);
                    navigate('/characters');
                }, 1500);

            } catch (err) {
                setMessage('❌ ' + err.message);
            }
        }

    });

    const registerFormik = useFormik({
        initialValues: { name: "", email: "", password: "", confirmPassword: "" },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "Minimum 2 characters").required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required")
        }),
        onSubmit: async (values) => {
            try {
                const res = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: values.name,
                        email: values.email,
                        password: values.password
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Registration failed');
                }

                setMessage('✅ Registration successful!');
                setTimeout(() => {
                    setMessage('');
                    setActiveTab('login');
                    registerFormik.resetForm();
                }, 1500);

            } catch (err) {
                setMessage('❌ ' + err.message);
            }
        }


    });

    return (
        <div className="container">
            <Helmet>
                <meta
                    name="register form"
                    content="Marvel login or register form"
                />
                <title>{activeTab === "login" ? "Login" : "Register"}</title>
            </Helmet>

            <div className="auth-book-3d">
                {message && <div className="success-message">{message}</div>}
                <div className="tabs">
                    <button
                        className={activeTab === "login" ? "active" : ""}
                        onClick={() => { setActiveTab("login"); setMessage("") }}
                    >
                        Login
                    </button>

                    <button
                        className={activeTab === "register" ? "active" : ""}
                        onClick={() => { setActiveTab("register"); setMessage("") }}
                    >
                        Register
                    </button>
                </div>
                <div className={`book-container ${activeTab === "register" ? "shift-left" : ""}`}>
                    <form className={`page ${activeTab === "login" ? "active" : ""}`} onSubmit={loginFormik.handleSubmit}>
                        <h2>Login</h2>

                        <InputField name="email" type="email" placeholder="Email" autoComplete="email" formik={loginFormik} />
                        <InputField
                            name="password"
                            type="password"
                            placeholder="Password"
                            formik={loginFormik}
                            autoComplete="current-password"
                        />


                        <button type="submit">Login</button>
                    </form>

                    <form className={`page ${activeTab === "register" ? "active" : ""}`}
                        onSubmit={registerFormik.handleSubmit}>
                        <h2>Register</h2>

                        <InputField name="name" type="text" placeholder="Name" formik={registerFormik} />
                        <InputField name="email" type="email" placeholder="Email" autoComplete="reg-email" formik={registerFormik} />
                        <InputField
                            name="password"
                            type="password"
                            placeholder="Password"
                            formik={registerFormik}
                            autoComplete="new-password"
                        />
                        <InputField name="confirmPassword" type="password" placeholder="Confirm Password" autoComplete="confirm-password" formik={registerFormik} />

                        <button type="submit">Register</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AuthFormBook3D;
