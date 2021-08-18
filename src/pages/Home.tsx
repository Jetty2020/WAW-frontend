import React from 'react';
import { useHistory } from 'react-router-dom';
import { authTokenVar, client, isLoggedInVar } from '../apollo';
import PageTitle from '../components/PageTitle';
import { LOCALSTORAGE_TOKEN } from '../constants';

const Home = () => {
  console.log(authTokenVar());
  console.log(isLoggedInVar());
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    isLoggedInVar(false);
    authTokenVar('');
    client.cache.reset();
    history.push('/login');
  };
  return (
    <div>
      <PageTitle title="Home" />
      <div>Home</div>
      <button onClick={() => logout()}>로그아웃</button>
    </div>
  );
};

export default Home;
