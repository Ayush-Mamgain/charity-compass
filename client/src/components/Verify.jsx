import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Verify({ formData, setViewOtp }) {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    async function resendOtp() {}

    async function verifyOtp(event) {
        event.preventDefault();
        const reqUrl = `${API_URL}/api/users/verifyOtp`;
        await fetch(reqUrl, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp, email: formData.email }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    setViewOtp(false);
                    registerUser();
                } else {
                    toast.error(result.message);
                }
            })
            .catch((error) => console.error(error));
    }

    async function registerUser() {
        //make a post request to register user
        const response = await fetch(`${API_URL}/api/otp/register`, {
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
            setTimeout(() => navigate("/loginUser"), 500);
        } else {
            toast.error(result.message);
        }
    }

    return (
        <div className="verify">
            <p>An OTP has been sent to <span>{formData.email}</span></p>
            <p>Please enter the OTP below to proceed your verification</p>
            <form className="verify-form">
                <input
                    type="text"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                />
                <button type="submit" onClick={verifyOtp}>
                    Submit
                </button>
            </form>
            <button onClick={resendOtp}>Resend</button>
            <Toaster position="top-center" />
        </div>
    );
}

export default Verify;
