import { useEffect, useState } from "react";
import Donations from "../components/Donations";
import Bookmarks from "../components/Bookmarks";

function Dashboard() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState({});
    const [viewDonations, setViewDonations] = useState(false);
    const [viewBookmarks, setViewBookmarks] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    //get the user details from the server
    async function getUserInfo() {
        const userInfoUrl = `${API_URL}/api/users/getUserProfile`;

        await fetch(userInfoUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => setUser(result.data))
            .catch((error) => console.error(error));
    }

    async function getTotalContribution() {
        const reqUrl = `${API_URL}/api/users/getTotalDonation`;
        await fetch(reqUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) =>{
                console.log(result.data);
                setTotalAmount((result.data.totalDonation/100).toFixed(2));
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        getUserInfo();
        getTotalContribution();
    }, []);

    return (
        <div className="dashboard">
            <div className="user-card">
                <div className="user-image">
                    <img src="" alt="" />
                </div>
                <div className="user-info">
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    <p>Contribution so far: ₹{totalAmount}</p>
                    <div className="user-buttons">
                        <button
                            onClick={() => {
                                setViewDonations((prevValue) => !prevValue);
                                setViewBookmarks(false);
                            }}
                        >
                            Recent Donations
                        </button>
                        <button
                            onClick={() => {
                                setViewBookmarks((prevValue) => !prevValue);
                                setViewDonations(false);
                            }}
                        >
                            Saved Charities
                        </button>
                    </div>
                    {(viewDonations || viewBookmarks) && (
                        <div className="view-container">
                            {viewDonations && <Donations />}
                            {viewBookmarks && <Bookmarks />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
