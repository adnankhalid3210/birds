import react, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../Home/Home';
import CounterCss from './Counter.css';
import { useHistory } from "react-router-dom";

function Counter() {

  const [count, setCount] = useState(3)
  let history = useHistory();
  setTimeout(() => {
    let newCount = count;
    setCount(--newCount)
  }, 1000)

  useEffect(() => {
    if (count < 1) {
      console.log(count)
      let level = sessionStorage.getItem('level')
      if(level) {
        history.push(`/${level}`, { prev: 'easy-hard' });
        sessionStorage.setItem('prev', 'easy-hard')
      } else {
        history.push('/easy-hard');
      }
    }
  }, [count])

  return (
    <div className="easygame-bg">
      <h1>LET'S GO</h1>
      <div className="counting-circle">
        {count}
      </div>
    </div>
  );
}

export default Counter;