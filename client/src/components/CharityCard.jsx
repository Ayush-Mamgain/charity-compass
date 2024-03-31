import { useState } from "react";
import { BsBookmark,BsBookmarkCheckFill } from "react-icons/bs";

function CharityCard({charity}) {
    console.log(charity);
    const API_URL = import.meta.env.VITE_API_URL;
    const [expand, setExpand] = useState(false);
    const [bookmark, setBookmark] = useState(charity.bookmarked);

    async function updateBookmark() {
        const reqUrl = `${API_URL}/api/users/updateBookmark`;
        await fetch(reqUrl, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({charityId: charity._id})
        })
        .then(result => setBookmark(prevMark => !prevMark));
    }

    return (
        <div className="charity-card">
            <div className="charity-header">
                <h2>{charity.name}</h2>
                <button onClick={() => setExpand(prev=>!prev)}>+</button>
                {
                    bookmark ? <BsBookmarkCheckFill onClick={updateBookmark}/> : <BsBookmark onClick={updateBookmark}/>
                }
            </div>
            {
                expand && 
                <div className="charity-info">
                    <p>{charity.description}</p>
                    <p>{charity.address.name}</p>
                    <a href={charity.website}>Official website</a>
                    <p>DONATE: {charity.donationLink}</p>
                </div>
            }
        </div>
    )
}

export default CharityCard;