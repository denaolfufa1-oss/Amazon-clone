import React from 'react';
import { Link } from 'react-router-dom';
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from './Header.module.css';
import LowerHeader from '../Header/LowerHeader.jsx';
import { useContext } from 'react';
import { DataContext } from '../DataProvider/DataProvider.jsx';


const Header = () => {
  const [{basket},dispatch]=useContext(DataContext);
  const totalItem = basket?.reduce((amount,item) => {
    return item.amount + amount},0);
  console.log(basket.length);
    return (
      <section className={classes.fixed}>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            {/* search */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="" name="" id="" />
            <BsSearch size={35} />
          </div>
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg/1200px-Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to="/Auth">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </Link>
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
        <LowerHeader />
      </section>
    );
}

export default Header;
