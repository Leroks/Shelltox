import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Advertisements from "./components/Advertisements/Advertisements";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/dashboard/Dashboard";
import ChatHome from "./components/Chat/ChatHome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
          <Route
            exact
            path="/advertisements"
            element={<Advertisements />}
          ></Route>
          <Route exact path="/users/:userId" element={<Profile />}></Route>
          <Route exact path="/admin" element={<Dashboard />}></Route>
          <Route exact path={"/chat"} element={<ChatHome />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
