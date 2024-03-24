import { useState } from "react";
import "./RegisterUser.css";
import loginBg from "./login-bg.png";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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

    async function submitHandler(event) {
        //make a post request to register user
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }); //no need to use catch block here, response will always be returned
            const result = await response.json();
            console.log(result);
            if (result.success) {
                toast.success(result.message);
                //Sign in the user (update global state)
                setTimeout(() => navigate('/loginUser'), 1000);
            } else {
                toast.error(result.message);
            }
        } catch(error) {
            console.error(error);
            //navigate to the default error page
        }
    }

    return (
        <div className="login">
            <img src={loginBg} alt="login background" className="login__bg" />
            <form onSubmit={submitHandler} className="login__form">
                <h1 className="login__title">Register</h1>
                <div className="login__inputs">
                    <div className="login__box">
                        <input
                            type="text"
                            name="username"
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
                            name="password"
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
                    Register
                </button>
                <div className="login__register">
                    Don't have an account?{" "}
                    <NavLink to="/loginUser">Login</NavLink>
                </div>
            </form>
            <Toaster position="top-center" />
        </div>
    );
}

export default RegisterUser;
