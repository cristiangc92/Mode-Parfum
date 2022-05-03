import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import Home from "./Components/Home/Home.jsx";
import FavPage from "./Components/FavPage/FavPage.jsx";
import Details from "./Components/Details/Details";
import Dashboard from "./Components/Dashboard/Dashboard";
import Success from "./Components/Success/Success";
import PasswordReset from "./Components/PasswordReset/PasswordReset.jsx";
import NewPassword from "./Components/NewPassword/NewPassword"; 
import History from "./Components/History/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/" element={<NavBar />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Cart/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/FavPage" element={<FavPage />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/success" element={<Success />} />
        <Route path="details/:id/SignIn" element={<SignIn />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/newPassword" element={<NewPassword />} /> 
        <Route path="/shopping" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
