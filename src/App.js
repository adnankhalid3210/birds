import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import EasyHard from './EasyHard/EasyHard';
import Counter from './Counter/Counter';
import Questions from './Questions/Questions';
import HardQuestions from './HardQuestions/HardQuestions';
import axios from 'axios';
import Result from './Result/Result';
import { useEffect } from 'react';
import About from './About/About';
import Legal from './Legal/Legal';

function App() {
  console.log(process.env.REACT_APP_URL)
  // const url = 'https://birds-app.herokuapp.com/api/';
  // const url = '/api/';
  // const url = 'http://localhost:3002/api/';
  // const url = 'http://109.106.244.123:8080/api/'
  const url = process.env.REACT_APP_URL ? process.env.REACT_APP_URL : 'http://109.106.244.123:8080/api/';

  useEffect(() => {
    axios.get(`${url}get-length`)
      .then(res => {
        (res.data) ? localStorage.setItem('length', res.data.data) : window.location.reload();
      })
  }, [])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}>
            <Home />
          </Route>
          <Route path="/easy-hard" component={EasyHard}>
            <EasyHard />
          </Route>
          <Route path="/counter" component={Counter}>
            <Counter />
          </Route>
          <Route path="/easy" component={Questions}>
            <Questions />
          </Route>
          <Route path="/hard" component={HardQuestions}>
            <HardQuestions />
          </Route>
          <Route path="/result" component={Result}>
            <Result />
          </Route>
          <Route path="/about" component={About}>
            <About />
          </Route>
          <Route path="/legal" component={Legal}>
            <Legal />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
