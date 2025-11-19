import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/core/DashBoard";
import ProfilePage from "./pages/core/ProfilePage";
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
