import React,{useContext} from 'react';
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './product.module.css'
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider.jsx';
import { Type } from '../../Utility/action.type.js';

const ProductCard = ({ productes, flex, renderDesc,i,renderAdd }) => {
  const { title, image, rating, price, id, description} = productes;


  const [state, dispatch] = useContext(DataContext);
  console.log("Is dispatch available?", !!dispatch);
  console.log(state);

  const addToCart = () => {
    dispatch({ 
        type: "ADD_TO_BASKET", 
        item: {
            id,
            title,
            image,
            rating,
            price,
            description
        }
    });
  }



  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <div>
        <Link to={`/product/${id}`}>
          <img src={image} alt="" />
        </Link>
      </div>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          {/* ratin */}
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd &&
        <button className={classes.button} onClick={addToCart}>
              add to cart
            </button>
        }
         
       
      </div>
    </div>
  );
};

export default ProductCard;
