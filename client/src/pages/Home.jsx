import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

function Home({ loggedIn, setLoggedIn }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    
    async function logoutHandler() {
        try {
            const logoutUrl = `${API_URL}/api/users/logout`;
            const response = await fetch(logoutUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            console.log(result);

            if (result.success) {
                toast.success(
                    result.message.trim() || "User logged out successfully"
                );
                //update the global login state
                setLoggedIn(false);
            } else {
                toast.error(result.message.trim() || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }
    if(error) return <Error />
    return (
        <div className="home">
            Let the charity begin
            {loggedIn ? (
                <>
                    <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                    <button onClick={logoutHandler}>Logout</button>
                </>
            ) : (
                <>
                    <button onClick={() => navigate('/registerUser')}>Register</button>
                    <button onClick={() => navigate('/loginUser')}>Login</button>
                </>
            )}
        </div>
    );
}

export default Home;
