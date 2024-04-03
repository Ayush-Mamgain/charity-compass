import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Verify() {
    cosnt[(otp, setOtp)] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    async function submitHandler() {
        const reqUrl = `${API_URL}/api/verifyOtp`;
        await fetch(reqUrl, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    toast.success(result.message);
                    navigate("/loginUser");
                } else {
                    toast.error(result.message);
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="verify">
            <form className="verify-form">
                <input
                    type="text"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                />
                <button type="submit" onClick={submitHandler}>
                    Submit
                </button>
            </form>
            <button onClick={}>Resend</button>
            <Toaster position="top-center" />
        </div>
    );
}

export default Verify;
