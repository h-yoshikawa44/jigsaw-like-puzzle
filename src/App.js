import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Puzzle from './Puzzle';
import Policy from './Policy';

const AppRoute = () => {
  return (
    <Switch>
      <Route path="/policy" component={Policy} />
      <Route path="/" component={Puzzle} />
    </Switch>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoute />
    </Router>
  );
};

export default App;
