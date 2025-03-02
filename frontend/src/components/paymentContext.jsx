// paymentContext.js
"use client"
import { createContext, useContext, useState, useEffect } from "react"

const PaymentContext = createContext()

export function PaymentProvider({ children }) {
  const [paymentHistory, setPaymentHistory] = useState([])

  const addPaymentToHistory = (payment) => {
    setPaymentHistory((prevHistory) => [payment, ...prevHistory])
  }

  // Fetch payment history from the backend API
  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/payments/1", {
        headers: {
          "Content-Type": "application/json",
          // Optionally include your auth token
          // "Authorization": "Bearer <token>"
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPaymentHistory(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching payment history", error);
    }
  }

  useEffect(() => {
    fetchPaymentHistory();
  }, [])

  return (
    <PaymentContext.Provider value={{ paymentHistory, addPaymentToHistory }}>
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider")
  }
  return context
}
