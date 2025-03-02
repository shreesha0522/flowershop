"use client"
import { useState } from "react"
import { CreditCard, Check, ChevronLeft, Lock, ChevronsRight } from "lucide-react"
import { usePayment } from "./paymentContext"
import "../Dashboard.css"
import "../Payment.css"

const Payment = ({ cart, setCart, setActivePage }) => {
  const [step, setStep] = useState(1) // 1: Payment details, 2: Order Review, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const { addPaymentToHistory } = usePayment()

  // Calculate totals from the cart
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  // Simple validation: ensure required fields are not empty
  const validateForm = () => {
    const newErrors = {}
    if (!formData.cardName.trim()) newErrors.cardName = "Name is required"
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required"
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // When user clicks "Review Order"
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setStep(2)
    }
  }

  // When user clicks "Confirm Payment" on the review screen
  const handlePaymentConfirmation = async () => {
    setIsProcessing(true)
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`
    const paymentRecord = {
      orderId,
      userId: 1, // Replace with the authenticated user's id if available
      date: new Date(),
      items: cart.map((item) => `${item.name} × ${item.quantity}`),
      amount: total,
      status: "Processing",
      paymentMethod: `${formData.cardName} (•••• ${formData.cardNumber.slice(-4)})`,
      billingAddress: {
        cardName: formData.cardName,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country,
      },
    }

    try {
      const response = await fetch("http://localhost:4000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentRecord),
      })
      const data = await response.json()
      if (response.ok) {
        addPaymentToHistory(data.data)
        setStep(3)
        // Optionally simulate an update (e.g., status update) after a delay
        setTimeout(async () => {
          await fetch(`http://localhost:4000/api/payments/${data.data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Delivered" }),
          })
        }, 5000)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error("Error processing payment", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBackToCart = () => {
    setStep(1)
  }

  const handleBackToShopping = () => {
    setCart([])
    setActivePage("Flowers")
  }

  // Render the payment form (Step 1)
  const renderPaymentForm = () => (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-section">
          <h3>Payment Method</h3>
          <div className="payment-methods">
            <div
              className={`payment-method-option ${paymentMethod === "credit-card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("credit-card")}
            >
              <CreditCard size={24} />
              <span>Credit Card</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Card Details</h3>
          <div className="form-group">
            <label htmlFor="cardName">Name on Card</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="John Smith"
              className={errors.cardName ? "error" : ""}
            />
            {errors.cardName && <span className="error-message">{errors.cardName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="4111111111111111"
              maxLength="19"
              className={errors.cardNumber ? "error" : ""}
            />
            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="12/34"
                maxLength="5"
                className={errors.expiryDate ? "error" : ""}
              />
              {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
                className={errors.cvv ? "error" : ""}
              />
              {errors.cvv && <span className="error-message">{errors.cvv}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Billing Address</h3>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Main St"
              className={errors.address ? "error" : ""}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
                className={errors.city ? "error" : ""}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="10001"
                className={errors.zipCode ? "error" : ""}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select id="country" name="country" value={formData.country} onChange={handleInputChange}>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="back-btn" onClick={() => setActivePage("Cart")}>
            <ChevronLeft size={16} />
            Back to Cart
          </button>
          <button type="submit" className="continue-btn">
            Review Order
            <ChevronsRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )

  // Render the order review screen (Step 2)
  const renderOrderReview = () => (
    <div className="order-review">
      <h3>Review Your Order</h3>
      <div className="review-items">
        {cart.map((item) => (
          <div className="review-item" key={item.id}>
            <div className="review-item-details">
              <h4>{item.name}</h4>
              <div className="review-item-meta">
                <span>Qty: {item.quantity}</span>
                <span>price{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="review-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>price{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>price{shipping.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax</span>
          <span>price{tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>price{total.toFixed(2)}</span>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="back-btn" onClick={handleBackToCart}>
          <ChevronLeft size={16} />
          Edit Payment Details
        </button>
        <button type="button" className="pay-btn" onClick={handlePaymentConfirmation} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Confirm Payment"}
          {!isProcessing && <Lock size={16} />}
        </button>
      </div>
    </div>
  )

  // Render the confirmation screen (Step 3)
  const renderConfirmation = () => (
    <div className="payment-confirmation">
      <div className="confirmation-icon">
        <Check size={48} />
      </div>
      <h2>Payment Successful!</h2>
      <p>Your order has been placed and will be delivered soon.</p>
      <p className="order-number">Order #: {Math.floor(100000 + Math.random() * 900000)}</p>
      <div className="confirmation-details">
        <div className="confirmation-section">
          <h4>Order Summary</h4>
          <div className="summary-row">
            <span>Total Amount</span>
            <span>price{total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Payment Method</span>
            <span>Credit Card (•••• {formData.cardNumber.slice(-4)})</span>
          </div>
        </div>
        <div className="confirmation-section">
          <h4>Shipping Details</h4>
          <p>{formData.cardName}</p>
          <p>{formData.address}</p>
          <p>
            {formData.city}, {formData.zipCode}
          </p>
          <p>{formData.country}</p>
        </div>
      </div>
      <button className="continue-shopping-btn" onClick={handleBackToShopping}>
        Continue Shopping
      </button>
    </div>
  )

  return (
    <section className="content">
      <div className="content-header">
        <h2>Checkout</h2>
        <div className="checkout-steps">
          <div className={`checkout-step ${step >= 1 ? "active" : ""}`}>
            <div className="step-number">1</div>
            <span className="step-name">Payment</span>
          </div>
          <div className="step-connector"></div>
          <div className={`checkout-step ${step >= 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <span className="step-name">Review</span>
          </div>
          <div className="step-connector"></div>
          <div className={`checkout-step ${step >= 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <span className="step-name">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="payment-container">
        <div className="payment-main">
          {step === 1 && renderPaymentForm()}
          {step === 2 && renderOrderReview()}
          {step === 3 && renderConfirmation()}
        </div>

        <div className="payment-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map((item) => (
              <div className="summary-item" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>price{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>price{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>price{shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>price{tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>price{total.toFixed(2)}</span>
          </div>
          <div className="secure-payment">
            <Lock size={14} />
            <span>Secure Payment</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Payment
