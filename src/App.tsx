import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { client } from './apollo';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import routes from './routes';
function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
