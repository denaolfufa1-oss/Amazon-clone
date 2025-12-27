import React,{useContext} from 'react';
import classes from './cart.module.css';
import LayOut from '../../components/LayOut/LayOut';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

const Cart = () => {
    const [{basket,user}, dispatch] = useContext(DataContext);
    const total = basket.reduce((amount,item) => {
        return item.price * item.amount + amount},0);
        const increment = (item) => {
          dispatch({
            type: Type.ADD_TO_BASKET,
            item: item,
          });
        }
        const decrement = (id) =>{
          dispatch({
            type: Type.REMOVE_FROM_BASKET,
            id:id,
          });
        }
    return (
      <LayOut>
        <section className={classes.container}>
          <div className={classes.cart_container}>
            <h2>hello</h2>
            <h3>your shopping basket</h3>
            <hr />
            {basket?.length == 0 ? (
              <p>Your Shopping Basket is empty</p>
            ) : (
              basket?.map((item, i) => {
                return (
                  <section className={classes.item_container}>
                    <div>
                      <ProductCard
                        key={i}
                        productes={item}
                        renderDesc={true}
                        flex={true}
                        renderAdd={false}
                      />
                    </div>

                    <div className={classes.btn_container}>
                      <button
                        className={classes.btn}
                        onClick={() => increment(item)}
                      >
                        <IoIosArrowUp size={30} />
                      </button>
                      <span>{item.amount}</span>
                      <button
                        className={classes.btn}
                        onClick={() => decrement(item.id)}
                      >
                        <IoIosArrowDown size={30} />
                      </button>
                    </div>
                  </section>
                );
              })
            )}
          </div>
          {basket?.length !== 0 && (
            <div className={classes.subtotal}>
              <div>
                <h2>Subtotal ({basket?.length} items): </h2>
                <CurrencyFormat amount={total} />
              </div>
              <span>
                <div>
                  <input type="checkbox" />
                  <small>This order contains gift </small>
                </div>

                <Link to="/payment">Continue to checkout</Link>
              </span>
            </div>
          )}
        </section>
      </LayOut>
    );
}

export default Cart;
