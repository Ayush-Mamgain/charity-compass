import { useState } from "react";
// import "./RegisterUser.css";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

function RegisterUser({ loggedIn, setLoggedIn }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
                setTimeout(() => navigate("/loginUser"), 500); //no need to use timeout here
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error(error);
            //navigate to the default error page
            setError(true);
        } finally {
        }
    }

    if (error) return <Error />;
    else
        return (
            <div className="register-user">
                {/* <img src={loginBg} alt="login background" /> */}
                <form onSubmit={submitHandler}>
                    <h1>Register</h1>
                    <div>
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                onChange={changeHandler}
                            />
                        </div>
                        <div>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email ID"
                                required
                                onChange={changeHandler}
                            />
                        </div>
                        <div>
                            <input
                                name="password"
                                type="password"
                                placeholder="Create Password"
                                required
                                onChange={changeHandler}
                            />
                        </div>
                        <div>
                            <input
                                name="confirmPassword"
                                type={viewPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                required
                                onChange={changeHandler}
                            />
                            <div
                                onClick={() => {
                                    setViewPassword((prevValue) => !prevValue);
                                }}
                            >
                                {!viewPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={submitHandler}>
                        Register
                    </button>
                    <div>
                        Don't have an account?{" "}
                        <NavLink to="/loginUser">Login</NavLink>
                    </div>
                </form>
                <Toaster position="top-center" />
            </div>
        );
}

export default RegisterUser;
