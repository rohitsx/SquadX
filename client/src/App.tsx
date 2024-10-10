import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/landing/home";
import Login from "./components/signupSingin/login";
import Register from "./components/signupSingin/register";
import ForgotPassword from "./utils/forgotPassword"
import Logout from "./components/signupSingin/logout";
import Dashboard from "./components/landing/dashboard";
import Passcode from "./utils/passcode";
import ErrorPage from "./utils/passcode"
import ProfilePage from "./components/landing/profile";
import SettingsPage from  "./components/landing/setting";
import AboutSection from  "./components/landing/about";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/passcode" element={<Passcode />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/Settings" element={<SettingsPage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
