import { useState } from "react";
import "./LoginUser.css";
import loginBg from "./login-bg.png";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function LoginUser() {
    const [formData, setFormData] = useState({
        email: "",
        password: '',
        rememberMe: false,
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
                <h1 className="login__title">Login</h1>
                <div className="login__inputs">
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
                            name="password"
                            type={viewPassword ? "text" : "password"}
                            placeholder="Password"
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
                <div className="login__check">
                    <div className="login__check-box">
                        <input
                            type="checkbox"
                            className="login__check-input"
                            id="user-check"
                            onChange={changeHandler}
                            value={formData.rememberMe}
                        />
                        <label
                            htmlFor="user-check"
                            className="login__check-label"
                        >
                            Remember me
                        </label>
                    </div>
                    <NavLink className="login__forgot" to="/forgotPassword">
                        Forgot password
                    </NavLink>
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
                    <NavLink to="/registerUser">Register</NavLink>
                </div>
            </form>
        </div>
    );
}

export default LoginUser;
