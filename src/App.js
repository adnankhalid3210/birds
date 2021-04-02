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
import Result from './Result/Result';

function App() {
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
