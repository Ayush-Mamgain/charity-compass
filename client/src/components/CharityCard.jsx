
function CharityCard({charity}) {
    return (
        <div className="donation-card">
            <h2>{charity.name}</h2>
            <p>{charity.description}</p>
            <p>Category: {charity.category.name}</p>
            <a href={charity.website}>Website</a>
            <p>Country: {charity.address.country}</p>
            <a href={charity.donationLink}>DONATE</a>
        </div>
    )
}

export default CharityCard;