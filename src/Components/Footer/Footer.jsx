import React from 'react'
import './Footer.css';
import    footer_logo from '../Assets/logo.png'; // Adjust the path as necessary
import instagram_icon from '../Assets/instagram_icon.png'; // Adjust the path as necessary
import pintester_icon from '../Assets/pintester_icon.png'; // Adjust the path as necessary
import whattsapp_icon from '../Assets/whatsapp_icon.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="Footer Logo" />
        <p>CRAZYSHOPPING</p>
        </div>
        <ul className="footer-links">
contac            <li><Link to='/company' style={{ textDecoration: 'none', color: 'inherit' }}>Company</Link></li>
            <li><Link to='/products' style={{ textDecoration: 'none', color: 'inherit' }}>Products</Link></li>
            <li><Link to='/offers' style={{ textDecoration: 'none', color: 'inherit' }}>Offers</Link></li>
            <li><Link to='/about' style={{ textDecoration: 'none', color: 'inherit' }}>About</Link></li>
            <li><Link to='/contact' style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link></li>
        </ul>
        <div className="footer-socials-icons">
            <div className="footer-icons-containers">
                <a href={process.env.REACT_APP_INSTAGRAM_URL || '#'} target="_blank" rel="noopener noreferrer">
                  <img src={instagram_icon} alt="Instagram" />
                </a>
            </div>
            <div className="footer-icons-containers">
                <img src={pintester_icon} alt="" />
            </div>
            <div className="footer-icons-containers">
                <a href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER || '919986573492'}`} target="_blank" rel="noopener noreferrer">
                  <img src={whattsapp_icon} alt="WhatsApp" />
                </a>
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
