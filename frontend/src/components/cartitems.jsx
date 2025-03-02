"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import "../Dashboard.css"
import "../cartitems.css"

const CartItems = ({ cart, setCart, setActivePage }) => {
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    // Calculate total price whenever cart changes
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotalPrice(total)
  }, [cart])

  const increaseQuantity = (productId) => {
    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const decreaseQuantity = (productId) => {
    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)))
  }

  const removeItem = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const handleCheckout = () => {
    setActivePage("Payment")
  }

  if (cart.length === 0) {
    return (
      <section className="content">
        <div className="content-header">
          <h2>Your Cart</h2>
        </div>
        <div className="empty-cart">
          <ShoppingBag size={64} />
          <h3>Your cart is empty</h3>
          <p>Add some beautiful flowers to your cart!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="content">
      <div className="content-header">
        <h2>Your Cart</h2>
        <button className="btn btn-outline" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <span className="cart-item-category">{item.category}</span>
                <div className="cart-item-price">price{item.price.toFixed(2)}</div>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => increaseQuantity(item.id)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="cart-item-subtotal">price{(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label="Remove item">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>price{totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>price1500</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>price{(totalPrice + 200).toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  )
}

export default CartItems

