import React, { useState,useContext } from 'react';
import classes from './signup.module.css'
import { Link,useNavigate,useLocation } from 'react-router-dom';
import {auth} from'../../Utility/firebase'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword, getAdditionalUserInfo} from 'firebase/auth'
import { DataContext } from '../../components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import { ClipLoader } from 'react-spinners';

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword]=useState("")
  const [error, setError]=useState("")
  const [loading,setLoading]=useState({
    signIn:false,
    signUp:false
  })

  const[{user}, dispatch]=useContext(DataContext);
  const navigate =useNavigate()
  const navStateData = useLocation()

            // console.log(user);
  
  const authHandler = async(e)=>{
    e.preventDefault();
    // console.log(e.target.name)
    if(e.target.name=="signin"){
      setLoading({...loading, signIn:true})
      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({ ...loading, signIn: false });
        navigate(navStateData?.state?.redirect||"/");

      }).catch((err)=>{
        setError(err.message)
        setLoading({ ...loading, signUP: false });
      })


    }else{
      setLoading({ ...loading, signUP: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUP: false });
          navigate(navStateData?.state?.redirect || "/");

        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUP: false });
        });

    }
  }
  // console.log(email,password)
    return (
      <section className={classes.login}>
        {/* logo */}
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1206px-Amazon_logo.svg.png"
            alt=""
          />
        </Link>
        {/* form */}
        <div className={classes.login_container}>
          <h1>Sign In</h1>
          {navStateData?.state?.msg &&(
            <small style={{
              padding:"5px",
              textAlign:"center",
              color:"red",
              fontWeight:"bold"
            }}>
              {navStateData?.state?.msg}
              </small>)}
          <form action="">
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </div>
            <button
              type="submit"
              name="signin"
              onClick={authHandler}
              className={classes.login_signInButton}
            >
              {loading.signIn ? (
                <ClipLoader color="#000" size={15} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <p>
            By agreeing to sign this document through the WebSign interface, the
            Signatory provides their express, irrevocable consent to be bound by
            the terms and conditions set forth above.
          </p>
          <button
            type="submit"
            name="signup"
            onClick={authHandler}
            className={classes.login_registerButton}
          >
            {loading.signUp ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "create Your Amazon Account"
            )}
          </button>
          {error && (
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          )}
        </div>
      </section>
    );
        
      
    
}

export default Auth;
