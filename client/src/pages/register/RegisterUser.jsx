import { useState } from "react";
import "./RegisterUser.css";
import loginBg from "./login-bg.png";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function RegisterUser() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        createPassword: '',
        confirmPassword: ''
    });

    const [viewPassword, setViewPassword] = useState(false);

    function changeHandler(event) {
        // console.log(formData);
        setFormData((prevData) => {
            return {
                ...prevData,
                [event.target.name]:
                    event.target.type === "checkbox"
                        ? event.target.checked
                        : event.target.value,
            };
        });
    }

    function submitHandler(event) {
        //make a post request to register user
        event.preventDefault();
    }

    return (
        <div className="login">
            <img src={loginBg} alt="login background" className="login__bg" />
            <form onSubmit={submitHandler} className="login__form">
                <h1 className="login__title">Register</h1>
                <div className="login__inputs">
                <div className="login__box">
                        <input
                            name="text"
                            type="username"
                            placeholder="Username"
                            required
                            className="login__input"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="login__box">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email ID"
                            required
                            className="login__input"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="login__box">
                        <input
                            name="createPassword"
                            type="password"
                            placeholder="Create Password"
                            required
                            className="login__input"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="login__box">
                        <input
                            name="confirmPassword"
                            type={viewPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            required
                            className="login__input"
                            onChange={changeHandler}
                        />
                        <div
                            className="eye-holder"
                            onClick={() => {
                                setViewPassword((prevValue) => !prevValue);
                            }}
                        >
                            {!viewPassword ? (
                                <FaEye className="eye" />
                            ) : (
                                <FaEyeSlash className="eye" />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="login__button"
                    onClick={submitHandler}
                >
                    Login
                </button>
                <div className="login__register">
                    Don't have an account?{" "}
                    <NavLink to="/loginUser">Login</NavLink>
                </div>
            </form>
        </div>
    );
}

export default RegisterUser;
