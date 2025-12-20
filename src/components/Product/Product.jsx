import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './product.module.css'
import Loader from '../Loader/Loader';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true);
        axios.get('https://fakestoreapi.com/products').then((res)=>{
            setProducts(res.data)
            setLoading(false);
        }).catch((err)=>{console.log(err)
        setLoading(false);
        })

    },[])
    return (
      
      loading ? (
        <Loader/>
      ) : (
        <section className={classes.products_container}>
          {products.map(
            (
              singleProduct 
            ) => (
              <ProductCard productes={singleProduct} key={singleProduct.id}
              renderAdd={true} />
            )
          )}
        </section>
      )
    );
}
      
    


export default Product;
