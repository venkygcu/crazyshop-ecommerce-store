import React, { useContext, useMemo, useState, useEffect } from 'react';
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
import Checkout from './Pages/Checkout';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Contact from './Pages/Contact';
import Admin from './Pages/Admin';
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
  const [q, setQ] = useState('');
  const [categories, setCategories] = useState({ men: true, women: true, kid: true });
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => setPage(1), [q, categories, sort]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return all_products.filter((p) => {
      const catOk = categories[p.category] === true;
      const qOk = !ql || p.name.toLowerCase().includes(ql);
      return catOk && qOk;
    });
  }, [all_products, q, categories]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case 'price-asc':
        return arr.sort((a, b) => a.new_price - b.new_price);
      case 'price-desc':
        return arr.sort((a, b) => b.new_price - a.new_price);
      case 'name-asc':
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return arr;
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  const toggleCat = (key) => setCategories((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 20 }}>
      <h1 style={{ marginBottom: 16 }}>All Products</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 24 }}>
        {/* Filters */}
        <aside style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, height: 'fit-content' }}>
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products"
              style={{ width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 6 }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <h3 style={{ margin: '0 0 8px' }}>Categories</h3>
            {['men', 'women', 'kid'].map((c) => (
              <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0' }}>
                <input type="checkbox" checked={!!categories[c]} onChange={() => toggleCat(c)} />
                <span style={{ textTransform: 'capitalize' }}>{c}</span>
              </label>
            ))}
          </div>

          <div>
            <h3 style={{ margin: '0 0 8px' }}>Sort</h3>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6 }}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </aside>

        {/* Results */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              Showing {start + 1}-{Math.min(start + pageSize, sorted.length)} of {sorted.length} results
            </div>
          </div>

          <div className="shopcategory-products" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {paged.map((p) => (
              <Item key={p.id} id={p.id} name={p.name} image={p.image} new_price={p.new_price} old_price={p.old_price} />
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
            <button onClick={() => setPage((x) => Math.max(1, x - 1))} disabled={currentPage === 1}>
              Prev
            </button>
            <span style={{ padding: '6px 12px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => setPage((x) => Math.min(totalPages, x + 1))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </section>
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
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/company' element={<Company />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/offers' element={<OffersPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
