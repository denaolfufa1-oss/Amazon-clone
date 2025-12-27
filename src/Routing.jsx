import React from 'react';
import {BrowserRouter as Router, Route, Routes, redirect} from 'react-router-dom';
import Cart from './pages/Cart/Cart.jsx';
import Orders from './pages/Orders/Orders.jsx';
import Payment from './pages/Payment/Payment.jsx';
import Result from './pages/Result/Result.jsx';
import Landing from './pages/Landing/Landing.jsx';
import Auth from "./pages/Auth/Auth.jsx";
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx';
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import ProtectedRoute from './components/Product/ProtectedRoute/ProtectedRoute.jsx';

const stripePromise = loadStripe(
  "pk_test_51Sia4hGx1eC8t1XcCbMhubp2koBasYoY7wy7UXHw8bBPmOYTwu792dYothI5ph4ALBtn7oVaKse31QSfQoQaaUwd00jphcSBEs"
);

const Routing = () => {
    return (
      <Router basename="/Amazon-clone">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute msg={"you must log in to proceed to orders"} redirect={"/payment"}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute msg={"you must log in to pay"} redirect={"/payment"}>
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route path="/category/:categoryName" element={<Result />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </Router>
    );
}

export default Routing;
