import { VFC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Puzzle from 'containers/pages/Puzzle';
import Policy from 'containers/pages/Policy';

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
