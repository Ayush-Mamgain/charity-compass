import RegisterUser from "./pages/register/RegisterUser";
import { Routes, Route } from "react-router-dom";
import LoginUser from "./pages/login/LoginUser.jsx";

function App() {
    return (
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route exact path="/loginUser" element={<LoginUser />} />
                <Route exact path="/registerUser" element={<RegisterUser />} />
            </Routes>
    );
}

export default App;
