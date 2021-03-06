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
import EditPost from './pages/EditPost';
import Search from './pages/Search';
import Artist from './pages/Artist';
import UserProfle from './pages/UserProfile';
import PostsByUser from './pages/PostsByUser';

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
              <Route path={routes.userProfile} exact>
                <Layout>
                  <UserProfle />
                </Layout>
              </Route>
              <Route path={routes.postsByUser} exact>
                <Layout>
                  <PostsByUser />
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
              <Route path={routes.editPost} exact>
                <Layout>
                  <EditPost />
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
              <Route path={routes.search}>
                <Layout>
                  <Search />
                </Layout>
              </Route>
              <Route path={routes.artist}>
                <Layout>
                  <Artist />
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
