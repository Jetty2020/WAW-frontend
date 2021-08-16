import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import PageTitle from '../components/PageTitle';
import { LoginInput } from '../__generated__/globalTypes';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { authTokenVar, isLoggedInVar } from '../apollo';

const LOGIN_MUTATION = gql`
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
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div>
      <PageTitle title="Login" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', {
              required: '메일 작서칸이 비어있습니다.',
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.type === 'pattern' && (
            <div>메일 주소가 올바르지 않습니다.</div>
          )}
          {errors.email?.message && <div>{errors.email?.message}</div>}
          <input
            {...register('password', {
              required: '비밀번호 작성칸이 비어있습니다.',
            })}
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && <div>{errors.password?.message}</div>}
          {loginMutationResult?.login.error && (
            <div>{loginMutationResult.login.error}</div>
          )}
          <button>Log in </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
