import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Logout from "./components/signupSingin/logout";
import Dashboard from "./components/pages/dashboard";
import ErrorPage from "./utils/passcode";
import ProfilePage from "./components/pages/profile";
import SettingsPage from "./components/pages/setting";
import AboutSection from "./components/pages/about";
import { GoogleOAuthProvider } from "@react-oauth/google";
import env from "./utils/enviroment";
import "./index.css";
import Auth from "./components/signupSingin/auth";
import Username from "./components/signupSingin/username";
import Privacypolicy from "./components/signupSingin/privacypolicy";

function App() {
  return (
    <GoogleOAuthProvider clientId={env.google_client_id}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/duo/:duoName/:duoId" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/username/:access_token/:credential"
            element={<Username />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/Settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="*" element={<ErrorPage />} />
		  <Route path="privacypolicy" element={<Privacypolicy/>}/>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
