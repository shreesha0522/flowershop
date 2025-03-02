"use client"

import { useState } from "react"
import { Plus, Heart, Calendar, Gift, Star, Sparkles } from "lucide-react"
import "../Dashboard.css"
import valentine from "../images/Rose.jpg"
import spring from "../images/spring.jpg"
import birthday from "../images/pinkrose.jpg"
import premium from "../images/orchid.png"
import anniversary from "../images/redROse.jpg"


const Collections = () => {
  const [activeCollection, setActiveCollection] = useState(null)

  const collections = [
    {
      id: 1,
      name: "Valentine's Day",
      description: "Special arrangements for Valentine's Day",
      icon: Heart,
      products: 12,
      image: valentine,
    },
    {
      id: 2,
      name: "Spring Collection",
      description: "Fresh spring flowers and arrangements",
      icon: Sparkles,
      products: 18,
      image:spring,
    },
    {
      id: 3,
      name: "Birthday Specials",
      description: "Perfect flowers for birthday celebrations",
      icon: Gift,
      products: 15,
      image:birthday,
    },
    {
      id: 4,
      name: "Anniversary",
      description: "Romantic arrangements for anniversaries",
      icon: Calendar,
      products: 10,
      image: anniversary,
    },
    {
      id: 5,
      name: "Premium Selection",
      description: "Our finest and most luxurious arrangements",
      icon: Star,
      products: 8,
      image: premium,
    },
  ]

  return (
    <section className="content-collection">
      <div className="content-header">
        <h2>Collections</h2>
        <button className="create-btn">
          <Plus size={16} />
          Create Collection
        </button>
      </div>

      <div className="collections-grid">
        {collections.map((collection) => (
          <div
            className={`collection-card price{activeCollection === collection.id ? "active" : ""}`}
            key={collection.id}
            onClick={() => setActiveCollection(collection.id)}
          >
            <div className="collection-image">
              <img src={collection.image || "/placeholder.svg"} alt={collection.name} />
              <div className="collection-icon">
                <collection.icon size={24} />
              </div>
            </div>
            <div className="collection-info">
              <h3 className="collection-name">{collection.name}</h3>
              <p className="collection-description">{collection.description}</p>
              <div className="collection-meta">
                <span className="collection-products">{collection.products} products</span>
              </div>
            </div>
          </div>
        ))}

        <div className="collection-card add-collection">
          <div className="add-collection-content">
            <Plus size={32} />
            <p>Create New Collection</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collections

