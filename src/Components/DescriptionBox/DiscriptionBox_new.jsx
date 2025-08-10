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
          {activeTab === 'description' ? (
            <>
              <p>
                <strong>Where Style Meets Comfort</strong><br/>
                Discover the latest trends in fashion with our exclusive collection of men's, women's, and kids' clothing. From everyday essentials to statement pieces, we bring you high-quality, stylish, and affordable apparel for every occasion. Shop effortlessly with our user-friendly website, secure payments, fast delivery, and easy returns.
              </p>
              <p>
                <strong>Fashion That Cares</strong><br/>
                Discover stylish, eco-conscious clothing made with love for the planet and people. Our sustainable fashion line blends comfort, durability, and design – perfect for conscious shoppers who don't compromise on style.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Customer Reviews (122)</strong><br/>
                See what our customers are saying about this product.
              </p>
              <div className="review-item">
                <p><strong>★★★★★ Sarah M.</strong> - "Amazing quality and perfect fit! Highly recommend."</p>
              </div>
              <div className="review-item">
                <p><strong>★★★★☆ John D.</strong> - "Great product, fast delivery. Very satisfied with my purchase."</p>
              </div>
              <div className="review-item">
                <p><strong>★★★★★ Emma L.</strong> - "Love the style and comfort. Will definitely buy again!"</p>
              </div>
            </>
          )}
        </div>
    </div>
  )
}

export default DiscriptionBox