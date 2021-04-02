import react from 'react';
import {
    Link
  } from "react-router-dom";

function Home() {
    return (
      <div className="Homenew-game-bg">
          <Link 
            to="/easy-hard"
            className="yellow-btn"
          >
            New Game
          </Link>
      </div>
    );
  }
  
  export default Home;