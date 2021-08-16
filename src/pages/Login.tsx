import React from 'react';
import { gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import PageTitle from '../components/PageTitle';
import { LoginInput } from '../__generated__/globalTypes';

export const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInput>({
    mode: 'onChange',
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    console.log(email, password);
  };
  return (
    <div>
      <PageTitle title="Login" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', {
              required: '메일 작서칸이 비어있습니다..',
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
          />
          <input
            {...register('password', {
              required: '비밀번호 작성칸이 비어있습니다.',
            })}
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          <button>Log in </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
