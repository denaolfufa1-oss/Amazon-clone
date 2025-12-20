import React, { useEffect, useState } from 'react';
import LayOut from '../../components/LayOut/LayOut.jsx';
import classes from './productdetail.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from "../../API/EndPoint.jsx";
import ProductCard from '../../components/Product/ProductCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data); // Note: We don't need a success setLoading(false) here if using .finally()
        console.log(res);
      })
      .catch((err) => {
        console.log(err); // If fetch fails, ensure product state is cleared/handled if needed
      })
      .finally(() => {
        // THIS IS THE CRITICAL FIX: Ensures loading stops only when the request finishes.
        setLoading(false);
      }); // !!! REMOVE THE LINE BELOW !!! // setLoading(false); <--- DO NOT INCLUDE THIS LINE HERE!
  }, [productId]);

  return (
    <LayOut>
      {loading ? (
        <Loader />
      ) : (<ProductCard productes={product} flex={true}
      renderDesc={true}
      renderAdd={false}
      />)}
    </LayOut>
  );
};

export default ProductDetail;
