import react from 'react';
import {
    Link
  } from "react-router-dom";
  import EasyHardCss from '../EasyHard/EasyHard.css'

function EasyHard() {
  const setLevelValue = (value)=> {
    sessionStorage.setItem('level', value)
  }
    return (
      <div className="easyhard-game-bg">
          <Link 
            to="/counter"
            className="yellow-btn mr-md-3"
            onClick = {()=>setLevelValue('easy')}
          >
         Easy 
          </Link>
          <Link 
            to="/counter"
            className="yellow-btn"
            onClick = {()=>setLevelValue('hard')}
          >
         Hard
          </Link>
      </div>
    );
  }
  
  export default EasyHard;