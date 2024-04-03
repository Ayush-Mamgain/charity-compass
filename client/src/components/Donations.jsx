import { useState, useEffect } from "react";
import DonationCard from "./DonationCard";

function Donations() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [donations, setDonations] = useState([]);

    async function fetchDonations() {
        const reqUrl = `${API_URL}/api/users/getDonations`;
        await fetch(reqUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        fetchDonations();
    }, []);

    return (
        <div className="donations">
            {donations.map((donation) => (
                <DonationCard key={donation._id} donation={donation} />
            ))}
        </div>
    );
}

export default Donations;
