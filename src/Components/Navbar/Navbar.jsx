import React, { useState, useContext, useEffect } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

  const [menu,setMenu] = useState("Shop");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {getTotalCartItems}= useContext(ShopContext);
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(!!localStorage.getItem('authToken'));
  const [authUser, setAuthUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('authUser') || 'null'); } catch { return null; }
  });
  const isAdmin = authUser?.email === 'gunjivenkatesh072@gmail.com';

  useEffect(() => {
    const handler = () => {
      setIsAuthed(!!localStorage.getItem('authToken'));
      try { setAuthUser(JSON.parse(localStorage.getItem('authUser') || 'null')); } catch { setAuthUser(null); }
    };
    window.addEventListener('auth-changed', handler);
    return () => window.removeEventListener('auth-changed', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setIsAuthed(false);
    setAuthUser(null);
    window.dispatchEvent(new Event('auth-changed'));
    navigate('/login');
  };

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
        <img src={logo} alt="CRAZYSHOPPING logo" />
        <p>CRAZYSHOPPING</p>
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
        {isAdmin && <li onClick={()=>{handleMenuClick("admin")}}><Link style={{ textDecoration: 'none'}} to='/admin'>Admin</Link>{menu==="admin"?<hr/>:<></>}</li>}
      </ul>
      
      <div className="nav-login-cart">
        {isAuthed ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
      
    </div>
  )
}

export default Navbar
