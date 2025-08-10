import React, { useState } from 'react'
import './DescriptionBox.css'

const DiscriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description')

  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div 
              className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </div>
            <div 
              className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : 'fade'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (122)
            </div>
        </div>
             <div className="descriptionbox-description">
                <p>Where Style Meets Comfort

Discover the latest trends in fashion with our exclusive collection of men's, women's, and kids' clothing. From everyday essentials to statement pieces, we bring you high-quality, stylish, and affordable apparel for every occasion. Shop effortlessly with our user-friendly website, secure payments, fast delivery, and easy returns.</p>
              <p>
                Fashion That Cares
Discover stylish, eco-conscious clothing made with love for the planet and people. Our sustainable fashion line blends comfort, durability, and design – perfect for conscious shoppers who don’t compromise on style.
              </p>

        </div>
      
    </div>
  )
}

export default DiscriptionBox
