import React, {useEffect, useState}from 'react';
import LayOut from '../../components/LayOut/LayOut.jsx';
import { useParams } from 'react-router-dom';
import classes from './result.module.css'
import { productUrl } from "../../API/EndPoint.jsx";
import axios from 'axios';
import ProductCard from '../../components/Product/ProductCard.jsx';



const Result = () => {
  const [results, setResults] = useState([]);
  const {categoryName} = useParams();
  console.log(categoryName);
  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
    return (
      <LayOut>
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category/{categoryName}</p>
          <hr />
          <div className={classes.products_container}>
            {results?.map((productes) => (
              <ProductCard
              key={productes.id}
              productes={productes}
              renderAdd={true}
              renderDesc={false}/>
            ))}

          </div>
        </section>
      </LayOut>
    );
}

export default Result;
