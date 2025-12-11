import { useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import "./registerForm.scss";

const AuthFormBook3D = () => {
    const [activeTab, setActiveTab] = useState("login");

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Minimum 2 characters')
                .required("Required field!"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Required field!"),
            password: Yup.string()
                .required("Password is required!")
                .min(6, "Minimum 6 characters"),
            confirmPassword: Yup.string()
                .required("Password confirmation is required!")
                .min(6, "Minimum 6 characters")
                .oneOf([Yup.ref('password'), null], 'Passwords must match')



        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2))
        }
    })



    return (
        <div className='container'>
            <div className="auth-book-3d">
                <div className="tabs">
                    <button
                        className={activeTab === "login" ? "active" : ""}
                        onClick={() => { setActiveTab("login"); }}
                    >
                        Login
                    </button>
                    <button
                        className={activeTab === "register" ? "active" : ""}
                        onClick={() => { setActiveTab("register"); }}
                    >
                        Register
                    </button>
                </div>
                <div className="book-container">
                    <div className={`book ${activeTab === "register" ? "flipped" : ""}`}>
                        <form className="page login-page" onSubmit={formik.handleSubmit}>
                            <h2>Login</h2>
                            <input onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur} type="email" name="email" placeholder="Email" required />
                            {formik.errors.email && formik.touched.email ? <div className='error-message'>{formik.errors.email}</div> : null}
                            <input onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur} type="password" name="password" placeholder="Password" required />
                            {formik.errors.password && formik.touched.password ? <div className='error-message'>{formik.errors.password}</div> : null}
                            <button type="submit">Login</button>
                        </form>

                        <form className="page register-page" onSubmit={formik.handleSubmit}>
                            <h2>Register</h2>
                            <input onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur} type="text" name="name" placeholder="Name and Surmane" required />
                            {formik.errors.name && formik.touched.name ? <div className='error-message'>{formik.errors.name}</div> : null}
                            <input onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur} type="email" name="email" placeholder="Email" required />
                            {formik.errors.email && formik.touched.email ? <div className='error-message'>{formik.errors.name}</div> : null}
                            <input onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur} type="password" name="password" placeholder="Password" required />
                            {formik.errors.password && formik.touched.password ? <div className='error-message'>{formik.errors.password}</div> : null}
                            <input onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                onBlur={formik.handleBlur} type="password" name="confirmPassword" placeholder="Confirm Password" required />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className='error-message'>{formik.errors.confirmPassword}</div> : null}
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AuthFormBook3D;