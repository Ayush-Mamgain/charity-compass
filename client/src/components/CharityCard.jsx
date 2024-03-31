import { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import getUserInfo from "../utils/getUserInfo";
import Payment from "./Payment";

function CharityCard({ charity }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [expand, setExpand] = useState(false);
    const [bookmark, setBookmark] = useState(charity.bookmarked);

    async function updateBookmark() {
        const reqUrl = `${API_URL}/api/users/updateBookmark`;
        await fetch(reqUrl, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ charityId: charity._id }),
        }).then((result) => setBookmark((prevMark) => !prevMark));
    }
    
    return (
        <div className="charity-card">
            <div className="charity-header">
                <h2>{charity.name}</h2>
                <button onClick={() => setExpand((prev) => !prev)}>+</button>
                {bookmark ? (
                    <BsBookmarkCheckFill onClick={updateBookmark} />
                ) : (
                    <BsBookmark onClick={updateBookmark} />
                )}
            </div>
            {expand && (
                <div className="charity-info">
                    <p>{charity.description}</p>
                    <p>{charity.address.name}</p>
                    <a href={charity.website}>Official website</a>
                    <Payment charityId={charity._id}/>
                </div>
            )}
        </div>
    );
}

export default CharityCard;
