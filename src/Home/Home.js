import react from 'react';
import {
  Link
} from "react-router-dom";

function Home() {
  return (
    <div className="Homenew-game-bg">
      <Link
        to="/easy-hard"
        className="yellow-btn yellow-btn-home">
        NOUVELLE PARTIE
          </Link>
      <div className="footer">
        <Link
          to="/about"
          style={{ textDecoration: 'none', margin: '8px', color: '#5e7463' }}>
          A propos
          </Link>
        |
        <Link
          to="/legal"
          style={{ textDecoration: 'none', margin: '8px', color: '#5e7463' }}>
          Mentions légales
          </Link>
      </div>
    </div>
  );
}

export default Home;