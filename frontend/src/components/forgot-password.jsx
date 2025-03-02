"use client"

import { useState } from "react"
import { Mail, Lock, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1 for email verification, 2 for new password
  const [email, setEmail] = useState("")
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user || user.email !== email) {
      setError("No account found with this email address")
      return
    }

    setError("")
    setStep(2)
  }

  const handlePasswordReset = (e) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    const user = JSON.parse(localStorage.getItem("user"))
    user.password = formData.newPassword
    localStorage.setItem("user", JSON.stringify(user))

    setSuccess("Password successfully reset! Redirecting to login...")
    setTimeout(() => {
      navigate("/login")
    }, 2000)
  }

  return (
    <div className="auth-page">
      <div className="auth-content">
        <Link to="/login" className="back-link">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Link>

        <div className="auth-header">
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">
            {step === 1 ? "Enter your email to reset your password" : "Create a new password"}
          </p>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="success-message">
            <p>{success}</p>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-group">
               
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-button">
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="auth-form">
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <div className="input-group">
            
                <input
                  type="password"
                  id="newPassword"
                  className="form-input"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, newPassword: e.target.value })
                    setError("")
                  }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <div className="input-group">
              
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-input"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value })
                    setError("")
                  }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-button">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword

