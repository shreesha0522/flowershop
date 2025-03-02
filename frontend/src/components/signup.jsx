"use client"

import { useState } from "react"
import { User, Mail, Lock } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const SignupPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const response = await axios.post("http://localhost:4000/api/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      if (response.status === 201) {
        alert("Signup successful!")
        navigate("/login")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="auth-page">
      <div className="auth-content">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Please fill up your information</p>
        </div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="input-group">
            
              <input type="text" id="name" name="name" className="form-input" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
             
              <input type="email" id="email" name="email" className="form-input" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
                  <input type="password" id="password" name="password" className="form-input" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-group">
         
              <input type="password" id="confirmPassword" name="confirmPassword" className="form-input" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="auth-prompt">Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
