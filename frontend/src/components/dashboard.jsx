"use client"

import { useState } from "react"
import { Search, Bell, Package, ShoppingBag, CreditCard, Settings, Flower } from "lucide-react"
import { PaymentProvider } from "./paymentContext"
import "../Dashboard.css"
import Collections from "./collections"
import BillsAndPayment from "./billsAndPayment"
import SettingsPage from "./settings"
import CartItems from "./cartitems"
import Payment from "./payment"
import redRose from "../images/redROse.jpg"
import sunFlower from "../images/sunFlower.jpg"
import pinkRose from "../images/pinkrose.jpg"
import tulip from "../images/tulip.jpg"
import lily from "../images/lilly.jpg"
import mixed from "../images/mixedflower.jpg"

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activePage, setActivePage] = useState("Flowers")
  const [cart, setCart] = useState([])

  const products = [
    {
      id: 1,
      name: "Red Roses",
      price: 2500,
      stock: 24,
      category: "Bouquets",
      image: redRose,
    },
    {
      id: 2,
      name: "Sunflower",
      price: 2800,
      stock: 18,
      category: "Bouquets",
      image: sunFlower,
    },
    {
      id: 3,
      name: "Tulip",
      price: 3000,
      stock: 12,
      category: "Bouquets",
      image: tulip,
    },
    {
      id: 4,
      name: "Pink Roses",
      price: 3200,
      stock: 15,
      category: "Bouquets",
      image: pinkRose,
    },
    {
      id: 5,
      name: "Lily",
      price: 4000,
      stock: 10,
      category: "Bouquets",
      image: lily,
    },
    {
      id: 6,
      name: "Mixed flowers",
      price: 5000,
      stock: 8,
      category: "Bouquets",
      image: mixed,
    },
    

  ]

  const categories = ["All", "Roses", "Bouquets", "Arrangements"]

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  const addToCart = (product) => {
    // Check if product is already in cart
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      // If already in cart, increase quantity
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      // If not in cart, add with quantity 1
      setCart([...cart, { ...product, quantity: 1 }])
    }

    // Show a brief notification
    alert(`Added price{product.name} to cart!`)
  }

  const renderContent = () => {
    switch (activePage) {
      case "Flowers":
        return (
          <section className="content">
            <div className="content-header">
              <h2>Flowers</h2>
              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-btn price{activeCategory === category ? "active" : ""}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <div className="product-header">
                      <h3 className="product-name">{product.name}</h3>
                      <span className="product-category">{product.category}</span>
                    </div>
                    <div className="product-price">price{product.price.toFixed(2)}</div>
                    <div className="product-footer">
                      <span className="product-stock">{product.stock} in stock</span>
                      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      case "Collections":
        return <Collections />
      case "Cart":
        return <CartItems cart={cart} setCart={setCart} setActivePage={setActivePage} />
      case "Payment":
        return <Payment cart={cart} setCart={setCart} setActivePage={setActivePage} />
      case "Bills & Payments":
        return <BillsAndPayment />
      case "Settings":
        return <SettingsPage />
      default:
        return null
    }
  }

  return (
    <PaymentProvider>
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="brand">
            <Flower className="brand-icon" />
            <h1>Bloom & Blossom</h1>
          </div>

          <nav className="nav-menu">
            <ul>
              <li
                className={`nav-item price{activePage === "Flowers" ? "active" : ""}`}
                onClick={() => setActivePage("Flowers")}
              >
                <ShoppingBag className="nav-icon" />
                <span>Flowers</span>
              </li>
              <li
                className={`nav-item price{activePage === "Collections" ? "active" : ""}`}
                onClick={() => setActivePage("Collections")}
              >
                <Package className="nav-icon" />
                <span>Collections</span>
              </li>
              <li className={`nav-item price{activePage === "Cart" ? "active" : ""}`} onClick={() => setActivePage("Cart")}>
                <ShoppingBag className="nav-icon" />
                <span>Cart</span>
                {cart.length > 0 && (
                  <div className="nav-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</div>
                )}
              </li>
              <li
                className={`nav-item price{activePage === "Bills & Payments" ? "active" : ""}`}
                onClick={() => setActivePage("Bills & Payments")}
              >
                <CreditCard className="nav-icon" />
                <span>Bills & Payments</span>
              </li>
              <li
                className={`nav-item price{activePage === "Settings" ? "active" : ""}`}
                onClick={() => setActivePage("Settings")}
              >
                <Settings className="nav-icon" />
                <span>Settings</span>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <header className="header">
            <div className="search-container">
              <Search className="search-icon" />
              <input type="text" placeholder="Search flowers..." className="search-input" />
            </div>
            <div className="header-actions">
              <button className="notification-btn">
                <Bell />
              </button>
              <div className="user-profile">
                <div className="avatar"></div>
                {cart.length > 0 && (
                  <div className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</div>
                )}
              </div>
            </div>
          </header>

          {renderContent()}
        </main>
      </div>
    </PaymentProvider>
  )
}

export default Dashboard

