"use client"

import { useState } from "react"
import { User, Mail, Lock, Bell, Save } from "lucide-react"
import "../Dashboard.css"

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Account")
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: {
      email: true,
      orders: true,
      promotions: false,
      updates: true,
    },
  })

  const [passwordError, setPasswordError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (name === "newPassword" || name === "confirmPassword") {
      setPasswordError("")
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [name]: checked,
      },
    })
  }

  // API integration for account update
  const handleAccountUpdate = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Account updated successfully!");
      } else {
        setPasswordError(data.error || "Failed to update account");
      }
    } catch (error) {
      setPasswordError("Error updating account");
    }
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // API integration for password update (simulate update via user update endpoint)
  const handlePasswordUpdate = async (e) => {
    e.preventDefault()

    if (!formData.currentPassword) {
      setPasswordError("Current password is required")
      return
    }

    if (formData.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    try {
      const response = await fetch('http://localhost:4000/api/users/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.newPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Password updated successfully!");
      } else {
        setPasswordError(data.error || "Failed to update password");
      }
    } catch (error) {
      setPasswordError("Error updating password");
    }

    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  // API integration for notification preferences update
  const handleNotificationUpdate = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/notifications/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.notifications),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Notification preferences updated successfully!");
      } else {
        setPasswordError(data.error || "Failed to update notifications");
      }
    } catch (error) {
      setPasswordError("Error updating notifications");
    }
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Account":
        return (
          <div className="settings-form-container">
            <div className="settings-form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-with-icon">
                <User size={18} />
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
            </div>

            <div className="settings-form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
              </div>
            </div>

            <button className="save-btn" onClick={handleAccountUpdate}>
              <Save size={16} />
              Save Changes
            </button>
          </div>
        )
      case "Password":
        return (
          <div className="settings-form-container">
            <form onSubmit={handlePasswordUpdate}>
              <div className="settings-form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="settings-form-group">
                <label htmlFor="newPassword">New Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="settings-form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {passwordError && <div className="error-message">{passwordError}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}

              <button type="submit" className="save-btn">
                <Save size={16} />
                Update Password
              </button>
            </form>
          </div>
        )
      case "Notifications":
        return (
          <div className="settings-form-container">
            <div className="notification-options">
              <div className="notification-option">
                <div>
                  <h3>Email Notifications</h3>
                  <p>Receive emails about your account activity</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    name="email"
                    checked={formData.notifications.email}
                    onChange={handleCheckboxChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notification-option">
                <div>
                  <h3>Order Updates</h3>
                  <p>Receive updates about your orders</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    name="orders"
                    checked={formData.notifications.orders}
                    onChange={handleCheckboxChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notification-option">
                <div>
                  <h3>Promotional Emails</h3>
                  <p>Receive emails about promotions and discounts</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    name="promotions"
                    checked={formData.notifications.promotions}
                    onChange={handleCheckboxChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notification-option">
                <div>
                  <h3>Product Updates</h3>
                  <p>Receive updates about new products and features</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    name="updates"
                    checked={formData.notifications.updates}
                    onChange={handleCheckboxChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <button className="save-btn" onClick={handleNotificationUpdate}>
              <Save size={16} />
              Save Preferences
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section className="content">
      <div className="content-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <button
            className={`settings-tab ${activeTab === "Account" ? "active" : ""}`}
            onClick={() => setActiveTab("Account")}
          >
            <User size={18} />
            Account
          </button>
          <button
            className={`settings-tab ${activeTab === "Password" ? "active" : ""}`}
            onClick={() => setActiveTab("Password")}
          >
            <Lock size={18} />
            Password
          </button>
          <button
            className={`settings-tab ${activeTab === "Notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("Notifications")}
          >
            <Bell size={18} />
            Notifications
          </button>
        </div>

        <div className="settings-content">
          <h3 className="settings-title">{activeTab} Settings</h3>
          {renderTabContent()}
        </div>
      </div>
    </section>
  )
}

export default SettingsPage
