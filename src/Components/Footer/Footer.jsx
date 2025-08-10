import React from 'react'
import './Footer.css';
import    footer_logo from '../Assets/logo.png'; // Adjust the path as necessary
import instagram_icon from '../Assets/instagram_icon.png'; // Adjust the path as necessary
import pintester_icon from '../Assets/pintester_icon.png'; // Adjust the path as necessary
import whattsapp_icon from '../Assets/whatsapp_icon.png'; // Adjust the path as necessary

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="Footer Logo" />
        <p>Eshwar's E-commerce</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>offers</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-socials-icons">
            <div className="footer-icons-containers">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icons-containers">
                <img src={pintester_icon} alt="" />
            </div>
            <div className="footer-icons-containers">
                <img src={whattsapp_icon} alt="" />
            </div>
    </div>
    <div className="footer-copyright">
        <hr />
        <p>Copyright@2025(August/9)-All rights reserved</p>
    </div>
    </div>
  )
}

export default Footer
