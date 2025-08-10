ed import React, { useContext } from 'react';
import './mobile-reset.css';
import './App.css';
import './mobile-optimizations.css';
import './mobile-utilities.css';
import './mobile-final.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Contact from './Pages/Contact';
import Item from './Components/Item/Item';
import { ShopContext } from './Context/ShopContext';
// Inline pages to keep changes minimal
const Company = () => (
  <div style={{ maxWidth: 960, margin: '40px auto', padding: 20 }}>
    <h1>Company</h1>
    <p>Welcome to Eshwar's E-commerce. We focus on quality products and excellent customer experience.</p>
  </div>
);

const ProductsPage = () => {
  const { all_products } = useContext(ShopContext);
  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 20 }}>
      <h1>All Products</h1>
      <div className="shopcategory-products" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {all_products.map((p) => (
          <Item key={p.id} id={p.id} name={p.name} image={p.image} new_price={p.new_price} old_price={p.old_price} />
        ))}
      </div>
    </div>
  );
};

const OffersPage = () => {
  const { all_products } = useContext(ShopContext);
  const offers = all_products.filter(p => Number(p.old_price) > Number(p.new_price));
  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 20 }}>
      <h1>Offers</h1>
      <div className="shopcategory-products" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {offers.map((p) => (
          <Item key={p.id} id={p.id} name={p.name} image={p.image} new_price={p.new_price} old_price={p.old_price} />
        ))}
      </div>
    </div>
  );
};

const About = () => (
  <div style={{ maxWidth: 960, margin: '40px auto', padding: 20 }}>
    <h1>About</h1>
    <p>We are passionate about delivering great products at competitive prices. Our mission is to make shopping simple and enjoyable.</p>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory banner={men_banner}  category="men" />} />
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
                        <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/company' element={<Company />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/offers' element={<OffersPage />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
