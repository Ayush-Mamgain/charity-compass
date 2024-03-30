import { useEffect, useState } from "react";

function CharityFilter({ category, setCategory }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [categories, setCategories] = useState([]);

    async function getAllCategories() {
        const reqUrl = `${API_URL}/api/category/getAllCategories`;
        await fetch(reqUrl, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => setCategories(result.data))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    function filterHandler(event) {
        setCategory(event.target.value);
    }

    return (
        <div className="charity-filter">
            {
                categories.map(category => <label key={category._id}>
                    <input type="radio" value={category.name} name='category' onChange={filterHandler}/>
                    {category.name}
                </label>)
            }
        </div>
    )
}

export default CharityFilter;