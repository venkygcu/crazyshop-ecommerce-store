import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/productDisplay/ProductDisplay';
import DiscriptionBox from '../Components/DescriptionBox/DiscriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_products } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_products.find((e) => e.id === Number(productId));

  if (!product) {
    return <div style={{ padding: 20 }}>Product not found.</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DiscriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
