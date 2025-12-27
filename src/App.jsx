import React, { useContext, useEffect } from 'react';
import Routing from './Routing.jsx';
import { DataContext } from './components/DataProvider/DataProvider.jsx';
import { Type } from './Utility/Action.type.js';
import { auth } from './Utility/firebase.js';


const App = () => {
  const [{user}, dispatch] =useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser)
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
        dispatch({
          type: Type.SET_USER,
          user: null,
        });

      }
    }
    )

  },[])
  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;

