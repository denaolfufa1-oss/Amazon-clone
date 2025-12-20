import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cart from './pages/Cart/Cart.jsx';
import Orders from './pages/Orders/Orders.jsx';
import Payment from './pages/Payment/Payment.jsx';
import Result from './pages/Result/Result.jsx';
import Landing from './pages/Landing/Landing.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx';

const Routing = () => {
    return (
      <Router basename="/Amazon-clone">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Auth" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/category/:categoryName" element={<Result />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </Router>
    );
}

export default Routing;
