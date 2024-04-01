import { useState, useEffect } from "react";
import CharityCard from "./CharityCard";

function Bookmarks() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [savedCharities, setSavedCharities] = useState([]);

    async function getSavedCharities() {
        const reqUrl = `${API_URL}/api/users/getSavedCharities`;

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
                setSavedCharities(result.data);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        getSavedCharities();
    }, []);

    return (
        <div className="bookmarks">
            {savedCharities.map((charity) => (
                <CharityCard key={charity._id} charity={charity} />
            ))}
        </div>
    );
}

export default Bookmarks;
