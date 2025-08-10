import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png'; // make sure folder name is 'Assets'

const Breadcrum = ({ product }) => {
  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt="" /> SHOP BY CATEGORY <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrum;
