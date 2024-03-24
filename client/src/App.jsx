import RegisterUser from "./pages/register/RegisterUser";
import { Routes, Route } from "react-router-dom";
import LoginUser from "./pages/login/LoginUser.jsx";
import Home from "./pages/home/Home.jsx";
// import { Toaster } from "react-hot-toast";

function App() {
    return (
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/loginUser" element={<LoginUser />} />
                <Route exact path="/registerUser" element={<RegisterUser />} />
            </Routes>
    );
}

export default App;
