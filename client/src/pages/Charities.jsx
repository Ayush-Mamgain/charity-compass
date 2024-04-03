import { useEffect, useState } from "react";
import CharityFilter from "../components/CharityFilter";
import CharityCard from "../components/CharityCard";

function Charities() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [charities, setCharities] = useState([]);
    const [category, setCategory] = useState('');

    async function getCharityByCategory() { //when the page initially loads all charities should be fetched
        const reqUrl = `${API_URL}/api/charity/getCharityByCategory`;
        await fetch(reqUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({categoryName: category})
        })
        .then(response => response.json())
        .then(result => setCharities(result.data))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getCharityByCategory();
    }, [category]);

    return (
        <div className="charities">
            <CharityFilter category={category} setCategory={setCategory} />
            <div className="charity-container">
                {
                    charities.map(charity => <CharityCard key={charity._id} charity={charity}/>)
                }
            </div>
        </div>
    )
}

export default Charities;