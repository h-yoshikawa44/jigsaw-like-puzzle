import { VFC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Puzzle from './pages/Puzzle';
import Policy from './pages/Policy';

const AppRoute: VFC = () => (
  <Switch>
    <Route path="/policy" component={Policy} />
    <Route path="/" component={Puzzle} />
  </Switch>
);

const App: VFC = () => (
  <Router>
    <AppRoute />
  </Router>
);

export default App;
