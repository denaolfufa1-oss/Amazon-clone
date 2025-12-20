import React from 'react';
import CarouselEffect from '../../components/Carousel/CarouselEffect.jsx';
import Category from '../../components/Category/Category.jsx';
import Product from '../../components/Product/Product.jsx';
import LayOut from '../../components/LayOut/LayOut.jsx';

const Landing = () => {
  
  return (
    
    <LayOut>
      <CarouselEffect />
      <Category />
      <Product />
    </LayOut> 
  ); 
};

export default Landing;
