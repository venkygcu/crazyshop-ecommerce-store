import React, { useContext, useMemo, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() =>
    all_products.filter((product) => product.category === props.category),
    [all_products, props.category]
  );

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

  return (
    <div className='shop-category'>
      <img  className='shopcategory-banner' src={props.banner} alt="" />
      
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-{sorted.length}</span> out of {filtered.length} products
        </p>
        <div className="shopcategory-sort">
          <label htmlFor="sort-select" style={{ marginRight: 8 }}>Sort by</label>
          <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
          <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
        {sorted.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
