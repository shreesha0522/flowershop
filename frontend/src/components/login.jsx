"use client"

import { useState } from "react"
import { Mail, Lock } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      })

      if (response.status === 200) {
        const { access_token } = response.data.data
        localStorage.setItem("token", access_token)
        alert("Login successful!")
        navigate("/dashboard")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
    if (error) setError("")
  }

  return (
    <div className="auth-page">
      <div className="auth-content">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Please sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 rounded-md p-3 mb-4">
            <p className="text-red-500 text-sm font-medium text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
             
              <input type="email" id="email" name="email" className="form-input" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
            
              <input type="password" id="password" name="password" className="form-input" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="auth-prompt">
            Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
