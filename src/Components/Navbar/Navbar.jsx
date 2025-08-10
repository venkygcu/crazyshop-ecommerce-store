import React, { useState, useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

  const [menu,setMenu] = useState("Shop");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {getTotalCartItems}= useContext(ShopContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false); // Close mobile menu when item is clicked
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">  
        <img src={logo} alt="" />
        <p>Eshwar's E-commerce</p>
      </div>
      
      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <li onClick={()=>{handleMenuClick("shop")}}><Link style={{ textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{handleMenuClick("mens")}}><Link style={{ textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{handleMenuClick("womens")}}><Link style={{ textDecoration: 'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{handleMenuClick("kids")}}><Link  style={{ textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      
      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
      
    </div>
  )
}

export default Navbar
