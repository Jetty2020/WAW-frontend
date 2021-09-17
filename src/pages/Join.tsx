import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import PageTitle from '../components/PageTitle';
import { CreateAccountInput, UserRole } from '../__generated__/globalTypes';
import { isLoggedInVar } from '../apollo';
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
import {
  createAccountMutation,
  createAccountMutationVariables,
} from '../__generated__/createAccountMutation';

const CREATEACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

const Join = () => {
  const history = useHistory();
  if (isLoggedInVar()) history.push('/');
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateAccountInput>({
    mode: 'onChange',
  });
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      history.push('/login');
    }
  };
  const [
    createAccountMutation,
    { data: createAccountMutationResult, loading },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATEACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, nickname } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            nickname,
            role: UserRole.Guest,
            password,
          },
        },
      });
    }
  };
  return (
    <AuthContainer>
      <PageTitle title="Join" />
      <PageHeader>Join to WAW</PageHeader>
      <FormContainer>
        <Logo margin=" 0 0 1rem" src="/mona.jpeg" />
        {createAccountMutationResult?.createAccount.error && (
          <ErrorForm eText={createAccountMutationResult.createAccount.error} />
        )}
        {errors.email?.type === 'pattern' && (
          <ErrorForm eText="메일 주소가 올바르지 않습니다." />
        )}
        {errors.email?.message && <ErrorForm eText={errors.email?.message} />}
        {errors.nickname?.message && (
          <ErrorForm eText={errors.nickname?.message} />
        )}
        {errors.nickname?.type === 'minLength' && (
          <ErrorForm eText="Username은 4 ~ 13자리 입니다." />
        )}
        {errors.nickname?.type === 'maxLength' && (
          <ErrorForm eText="Username은 4 ~ 13자리 입니다." />
        )}
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
          <InputLabel htmlFor="nickname">Username</InputLabel>
          <Input
            {...register('nickname', {
              required: 'Username이 비어있습니다.',
              maxLength: 13,
              minLength: 4,
            })}
            id="nickname"
            name="nickname"
            type="text"
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
          <Button
            canClick={isValid}
            loading={loading}
            actionText={'Create Account'}
          />
        </Form>
      </FormContainer>
    </AuthContainer>
  );
};

export default Join;
