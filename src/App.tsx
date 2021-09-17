import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { client } from './apollo';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import routes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from './styles/golobalStyles';
import Layout from './components/Layout';
import Join from './pages/Join';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                <Layout>
                  <Home />
                </Layout>
              </Route>
              <Route path={routes.postDetail} exact>
                <Layout>
                  <PostDetail />
                </Layout>
              </Route>
              <Route path={routes.createPost} exact>
                <Layout>
                  <CreatePost />
                </Layout>
              </Route>
              <Route path={routes.login} exact>
                <Layout>
                  <Login />
                </Layout>
              </Route>
              <Route path={routes.join} exact>
                <Layout>
                  <Join />
                </Layout>
              </Route>
              <Route>
                <Layout>
                  <NotFound />
                </Layout>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
