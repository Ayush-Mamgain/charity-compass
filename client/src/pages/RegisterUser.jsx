import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Verify from "../components/Verify";

function RegisterUser() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [viewPassword, setViewPassword] = useState(false);
    const [viewOtp, setViewOtp] = useState(false);

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

    async function sendOtp(event) {
        event.preventDefault();
        const reqUrl = `${API_URL}/api/otp/sendOtp`;
        await fetch(reqUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: formData.email})
        })
        .then(response => response.json())
        .then(result => {
            if(result.success) {
                toast.success(result.message);
                setTimeout(() => setViewOtp(true), 1000);
            } else {
                toast.error(result.message);
            }
        })
        .catch(error => console.error(error));
    }

    if (viewOtp) return <Verify formData={formData} setViewOtp={setViewOtp}/>;
    return (
        <div className="register-user">
            <form onSubmit={sendOtp} className="register-form">
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
                    <div className="pass">
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
                            {!viewPassword ? (
                                <FaEye className="eye" />
                            ) : (
                                <FaEyeSlash className="eye" />
                            )}
                        </div>
                    </div>
                </div>
                <button type="submit">
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
