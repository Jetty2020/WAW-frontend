import React from 'react';
import { authTokenVar, isLoggedInVar } from '../apollo';
import PageTitle from '../components/PageTitle';

const Home = () => {
  console.log(authTokenVar());
  console.log(isLoggedInVar());
  
  return (
    <div>
      <PageTitle title="Home" />
      <div>Home</div>
    </div>
  );
};

export default Home;
