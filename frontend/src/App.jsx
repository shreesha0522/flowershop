import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/landing-page"
import LoginPage from "./components/login"
import SignupPage from "./components/signup"
import ForgotPassword from "./components/forgot-password"
import Dashboard from "./components/dashboard"
import "./Dashboard.css"
import "./app.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App

