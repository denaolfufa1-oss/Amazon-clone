import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../components/LayOut/LayOut.jsx';
import { db } from '../../Utility/firebase.js';
import { DataContext } from '../../components/DataProvider/DataProvider.jsx';
import classes from './orders.module.css'
import ProductCard from '../../components/Product/ProductCard.jsx'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // 2. Create a reference and a query
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      // 3. Use the onSnapshot function
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      // 4. Cleanup listener on unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]); // 5. Added 'user' to dependency array

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>you don't have orders yet.</div>
          )}
          {/* order's */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard
                        flex={true}
                        productes={order}
                        key={order.id}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
