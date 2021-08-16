import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { isLoggedInVar } from '../apollo';
import PageTitle from '../components/PageTitle';

type Props = {};
const Login: React.FC<Props> = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div>
      <PageTitle title="Login" />
      {isLoggedIn ? <div>Login</div> : <div>Logout</div>}
      <button onClick={() => isLoggedInVar(!isLoggedIn)}>login</button>
    </div>
  );
};

export default Login;
