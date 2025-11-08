import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import BusinessOnboarding from "./pages/WelcomePage";
import DashBoard from "./pages/core/DashBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/onboarding" element={<BusinessOnboarding />} />

        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
