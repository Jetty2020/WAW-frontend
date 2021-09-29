import React, { useCallback } from 'react';
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
import Button from '../components/atoms/Button';
import ErrorForm from '../components/auth/ErrorForm';
import Input from '../components/atoms/Input';
import InputLabel from '../components/auth/InputLabel';
import PageHeader from '../components/atoms/PageHeader';
import FormContainer from '../components/auth/FormContainer';
import Form from '../components/auth/Form';
import Logo from '../components/atoms/Logo';
import AuthContainer from '../components/auth/AuthContainer';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  if (isLoggedInVar()) history.push('/');
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInput>({
    mode: 'onChange',
  });
  const onCompleted = useCallback(
    (data: loginMutation) => {
      const {
        login: { ok, token },
      } = data;
      if (ok && token) {
        localStorage.setItem(LOCALSTORAGE_TOKEN, token);
        authTokenVar(token);
        isLoggedInVar(true);
        history.push('/');
      }
    },
    [history]
  );
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = useCallback(() => {
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
  }, [getValues, loading, loginMutation]);
  return (
    <AuthContainer>
      <PageTitle title="Login" />
      <PageHeader>Login to WAW</PageHeader>
      <FormContainer>
        <Logo margin=" 0 0 1rem" src="/mona.jpeg" />
        {loginMutationResult?.login.error && (
          <ErrorForm eText={loginMutationResult.login.error} />
        )}
        {errors.email?.type === 'pattern' && (
          <ErrorForm eText="메일 주소가 올바르지 않습니다." />
        )}
        {errors.email?.message && <ErrorForm eText={errors.email?.message} />}
        {errors.password?.message && (
          <ErrorForm eText={errors.password?.message} />
        )}
        {errors.password?.type === 'minLength' && (
          <ErrorForm eText="비밀번호는 5 ~ 15자리 입니다." />
        )}
        {errors.password?.type === 'maxLength' && (
          <ErrorForm eText="비밀번호는 5 ~ 15자리 입니다." />
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            {...register('email', {
              required: '메일이 비어있습니다.',
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            id="email"
            name="email"
            type="email"
            className="input"
          />
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            {...register('password', {
              required: '비밀번호가 비어있습니다.',
              maxLength: 15,
              minLength: 5,
            })}
            id="password"
            name="password"
            type="password"
            className="input"
          />
          <Button canClick={isValid} loading={loading} actionText={'Log in'} />
        </Form>
      </FormContainer>
    </AuthContainer>
  );
};

export default Login;
