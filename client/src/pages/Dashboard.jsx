import { useEffect } from "react";

function Dashboard() {
    const API_URL = import.meta.env.VITE_API_URL;
    //get the user details from the server
    async function getUserInfo() {
        const userInfoUrl = `${API_URL}/api/users/getUserInfo`;
        const response = await fetch(userInfoUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        console.log(result);
    }
    
    useEffect(() => {
        getUserInfo();
    }, []);

    return <div className="dashboard"></div>;
}

export default Dashboard;
