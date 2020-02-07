// react imports
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// components imports
import Main from './layout/main';
import Landing from './layout/landing';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/portal' exact component={Main} />
      </Switch>
    </Router>
  )
}

export default App;
