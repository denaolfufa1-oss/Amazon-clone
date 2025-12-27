import React, { useContext, useState } from "react";
import LayOut from "../../components/LayOut/LayOut.jsx";
import classes from "./payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider.jsx";
import ProductCard from "../../components/Product/ProductCard.jsx";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat.jsx";
import { axiosInstance } from "../../API/Axios.js";
import { ClipLoader } from 'react-spinners';
import { db } from "../../Utility/firebase.js";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection } from "firebase/firestore";
import { Type } from "../../Utility/action.type.js";

const Payment = () => {
  const [{ user, basket },dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing,setProcessing] = useState(false)

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // 2 client side
    const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3.database
      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

dispatch({type:Type.EMPTY_BASKET})

      setProcessing(false);
      navigate("/orders",{state:{msg:"you have placed new order"}})
    } catch (error) {
      console.log(error)
      setProcessing(false)
    }
    // 1
    // backend

    

    
  };
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>checkout({totalItem})items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email} </div>
            <div>evansina</div>
            <div>Gorgia</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery </h3>
          <div>
            {basket?.map((item) => (
              <ProductCard productes={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>payment method </h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_detail}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order|</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait....</p>
                      </div>
                    ) : (
                      "pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
