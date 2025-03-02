import {
  ChevronRight,
  Truck,
  Clock,
  Heart,
  Star,
  ShoppingCart,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react"
import spring from "../images/spring.jpg"
import rose from "../images/Rose.jpg"
import tulip from "../images/tulip.jpg"
import orchid from "../images/orchid.png"
import flowershop from "../images/flowershop.png"


const LandingPage = () => {

  const featuredProducts = [
    {
      id: 1,
      name: "Spring Bouquet",
      price: 5000,
      image: spring,
      description: "Beautiful arrangement of spring flowers",
    },
    {
      id: 2,
      name: "Rose Collection",
      price: 6000,
      image: rose,
      description: "Elegant bouquet of premium roses",
    },
    {
      id: 3,
      name: "Tulip Surprise",
      price: 3500,
      image: tulip,
      description: "Colorful tulips to brighten any day",
    },
    {
      id: 4,
      name: "Orchid Delight",
      price: 6000,
      image: orchid,
      description: "Exotic orchids in a premium arrangement",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      text: "The flowers I ordered were absolutely stunning! They arrived on time and stayed fresh for weeks.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Brown",
      text: "I ordered flowers for my wife's birthday and she loved them. The arrangement was even more beautiful than the pictures.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Davis",
      text: "Excellent service and beautiful flowers. Will definitely order again!",
      rating: 4,
    },
  ]

  return (
    <div className="page-container">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1 className="logo-text">Flower Shop</h1>
          </div>
          <nav className="main-nav">
            <a href="#" className="nav-link">
              Home
            </a>
            <a href="#products" className="nav-link">
              Products
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#testimonials" className="nav-link">
              Testimonials
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <a href="/login" className="nav-link">
              Login
            </a>
          </nav>
          <div className="header-actions">
            <button className="icon-button">
              <ShoppingCart size={20} />
            </button>
            <button className="btn btn-primary shop-now-btn">Shop Now</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-background">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rZUGHrMpV1fA4L58eAGyxfpmN5ZO78.png"
              alt="Pink tulips on pink background"
              className="hero-bg-image"
            />
          </div>
          <div className="hero-container">
            <div className="hero-content">
              <h2 className="hero-title">Beautiful Flowers for Every Occasion</h2>
              <p className="hero-text">
                Discover our handcrafted bouquets made with the freshest flowers to make your special moments
                unforgettable.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary">
                  Shop Now <ChevronRight size={20} className="btn-icon" />
                </button>
                <button className="btn btn-outline">View Collections</button>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-container">
            <div className="features-grid">
              <div className="feature-card">
                <Truck size={40} className="feature-icon" />
                <h3 className="feature-title">Free Delivery</h3>
                <p className="feature-text">Free shipping on all orders over price150</p>
              </div>
              <div className="feature-card">
                <Clock size={40} className="feature-icon" />
                <h3 className="feature-title">Fresh Flowers</h3>
                <p className="feature-text">Handpicked daily for maximum freshness</p>
              </div>
              <div className="feature-card">
                <Heart size={40} className="feature-icon" />
                <h3 className="feature-title">Made with Love</h3>
                <p className="feature-text">Carefully crafted arrangements by expert florists</p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="products-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Featured Bouquets</h2>
              <p className="section-description">
                Explore our most popular flower arrangements, perfect for any occasion
              </p>
            </div>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
                  <div className="product-content">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">price{product.price}</span>
                      <button className="btn-icon-round">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button className="btn btn-primary view-all-btn">View All Products</button>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="section-container">
            <div className="about-grid">
              <div className="about-image">
                <img
                  src="/Flowershop.png"
                  alt="Our flower shop"
                 
                  className="rounded-image shadow"
                />
              </div>
              <div className="about-content">
                <h2 className="section-title">About Our Flower Shop</h2>
               
                <p className="about-text">
                  Founded in 2010, Flower Shop has been providing beautiful, fresh flower arrangements for all
                  occasions. Our team of experienced florists carefully selects the finest blooms to create stunning
                  bouquets that bring joy and beauty to your special moments.
                </p>
                <p className="about-text">
                  We pride ourselves on our commitment to quality, creativity, and customer satisfaction. Whether you're
                  celebrating a birthday, anniversary, or simply want to brighten someone's day, we're here to help you
                  express your feelings through the language of flowers.
                </p>
                <button className="btn btn-primary">Learn More About Us</button>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">What Our Customers Say</h2>
              <p className="section-description">Don't just take our word for it - hear from our satisfied customers</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className={i < testimonial.rating ? "star-filled" : "star-empty"} />
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <p className="testimonial-author">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="newsletter-section">
          <div className="section-container">
            <div className="newsletter-header">
              <h2 className="newsletter-title">Join Our Newsletter</h2>
              <p className="newsletter-description">
                Subscribe to receive updates on new arrivals, special offers, and seasonal tips for flower care
              </p>
            </div>
            <div className="newsletter-form-container">
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" className="newsletter-input" />
                <button type="submit" className="btn btn-dark">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-logo">Flower Shop</h3>
              <p className="footer-text">Bringing beauty and joy through flowers since 2010.</p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <Facebook size={20} />
                </a>
                <a href="#" className="social-link">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-link">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#products" className="footer-link">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#about" className="footer-link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="footer-link">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#contact" className="footer-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Customer Service</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Return Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Contact Us</h4>
              <ul className="contact-info">
                <li className="contact-item">
                  <MapPin size={18} className="contact-icon" />
                  <span>123 Flower Street, Garden City</span>
                </li>
                <li className="contact-item">
                  <Phone size={18} className="contact-icon" />
                  <span>(123) 456-7890</span>
                </li>
                <li className="contact-item">
                  <Mail size={18} className="contact-icon" />
                  <span>info@flowershop.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Flower Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

//sh