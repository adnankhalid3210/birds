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

function App() {
  // const url = 'https://birds-app.herokuapp.com/api/';
  const url = '/api/';
  // const url = 'http://localhost:3002/api/';

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
