"use client"

import { useState } from "react"
import { CreditCard, Calendar, CheckCircle, Clock } from "lucide-react"
import { usePayment } from "./paymentContext"
import "../Dashboard.css"

const BillsAndPayment = () => {
  const [activeTab, setActiveTab] = useState("Payment History")
  const { paymentHistory } = usePayment()

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      lastFour: "4242",
      expiry: "09/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      lastFour: "8888",
      expiry: "12/25",
      isDefault: false,
    },
  ]

  const renderPaymentHistory = () => (
    <div className="payment-history">
      {paymentHistory.length === 0 ? (
        <div className="empty-history">
          <p>No payment history available</p>
        </div>
      ) : (
        paymentHistory.map((payment) => (
          <div key={payment.id} className="payment-card">
            <div className="payment-header">
              <div className="payment-info">
                <h3>{payment.id}</h3>
                <span className="payment-date">
                  <Calendar size={14} />
                  {payment.date}
                </span>
              </div>
              <div className={`payment-status price{payment.status.toLowerCase()}`}>
                {payment.status === "Delivered" ? <CheckCircle size={14} /> : <Clock size={14} />}
                {payment.status}
              </div>
            </div>
            <div className="payment-items">
              {payment.items.map((item, index) => (
                <span key={index} className="payment-item">
                  {item}
                </span>
              ))}
            </div>
            <div className="payment-footer">
              <span className="payment-method">{payment.paymentMethod}</span>
              <span className="payment-amount">price{payment.amount.toFixed(2)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  )

  const renderPaymentMethods = () => (
    <div className="payment-methods">
      {paymentMethods.map((method) => (
        <div key={method.id} className="method-card">
          <div className="method-icon">
            <CreditCard size={24} />
          </div>
          <div className="method-details">
            <h3>
              {method.type} •••• {method.lastFour}
            </h3>
            <p>Expires {method.expiry}</p>
            {method.isDefault && <span className="default-badge">Default</span>}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="content">
      <div className="content-header">
        <h2>Bills & Payments</h2>
      </div>

      <div className="payment-tabs">
        <button
          className={`tab-btn price{activeTab === "Payment History" ? "active" : ""}`}
          onClick={() => setActiveTab("Payment History")}
        >
          Payment History
        </button>
        <button
          className={`tab-btn price{activeTab === "Payment Methods" ? "active" : ""}`}
          onClick={() => setActiveTab("Payment Methods")}
        >
          Payment Methods
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "Payment History" ? renderPaymentHistory() : renderPaymentMethods()}
      </div>
    </section>
  )
}

export default BillsAndPayment

