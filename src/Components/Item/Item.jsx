import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value || 0));

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={props.image} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">{formatINR(props.new_price)}</div>
        <div className="item-price-old">{formatINR(props.old_price)}</div>
      </div>
    </div>
  );
};

export default Item;
