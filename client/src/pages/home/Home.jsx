
async function request() {
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(API_URL);
    const result = await res.json();
    console.log(result);
}
function Home() {
    // request();
    return (
        <div className="home">
            Let the charity begin
        </div>
    );
}

export default Home;