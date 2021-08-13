import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import routes from './routes';
function App() {
  return (
    <Router>
      <Switch>
        <Route path={routes.home} exact>
          <Home />
        </Route>
        <Route path={routes.login} exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
