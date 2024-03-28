import RegisterUser from "./pages/RegisterUser.jsx";
import { Routes, Route } from "react-router-dom";
import LoginUser from "./pages/LoginUser.jsx";
import Home from "./pages/Home.jsx";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard.jsx";
// import { Toaster } from "react-hot-toast";

function App() {
    const API_URL = import.meta.env.VITE_API_URL;
    const loginCheckUrl = `${API_URL}/api/users/getLoginStatus`;
    const [loggedIn, setLoggedIn] = useState(false);

    async function updateLoginStatus() {
        try {
            const response = await fetch(loginCheckUrl, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            setLoggedIn(result.data?.isLoggedIn);
        } catch (error) {
            setLoggedIn(false);
        }
    }
    useEffect(() => {
        updateLoginStatus();
    }, []);

    //instead user state should be taken from the server
    return (
            <Routes>
                <Route exact path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                <Route exact path="/loginUser" element={<LoginUser loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                <Route exact path="/registerUser" element={<RegisterUser loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                <Route exact path="/dashboard" element={<Dashboard />}/>
            </Routes>
    );
}

export default App;
