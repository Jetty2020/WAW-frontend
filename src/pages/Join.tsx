import React, { useCallback } from 'react';
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
  const onCompleted = useCallback(
    (data: createAccountMutation) => {
      const {
        createAccount: { ok },
      } = data;
      if (ok) {
        history.push('/login');
      }
    },
    [history]
  );
  const [
    createAccountMutation,
    { data: createAccountMutationResult, loading },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATEACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const onSubmit = useCallback(() => {
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
  }, [createAccountMutation, loading, getValues]);
  return (
    <AuthContainer>
      <PageTitle title="????????????" />
      <PageHeader>Join to WAW</PageHeader>
      <FormContainer>
        <Logo margin=" 0 0 1rem" src="/mona.jpeg" />
        {createAccountMutationResult?.createAccount.error && (
          <ErrorForm eText={createAccountMutationResult.createAccount.error} />
        )}
        {errors.email?.type === 'pattern' && (
          <ErrorForm eText="?????? ????????? ???????????? ????????????." />
        )}
        {errors.email?.message && <ErrorForm eText={errors.email?.message} />}
        {errors.nickname?.message && (
          <ErrorForm eText={errors.nickname?.message} />
        )}
        {errors.nickname?.type === 'minLength' && (
          <ErrorForm eText="????????? 4 ~ 13?????? ?????????." />
        )}
        {errors.nickname?.type === 'maxLength' && (
          <ErrorForm eText="????????? 4 ~ 13?????? ?????????." />
        )}
        {errors.password?.message && (
          <ErrorForm eText={errors.password?.message} />
        )}
        {errors.password?.type === 'minLength' && (
          <ErrorForm eText="??????????????? 5 ~ 15?????? ?????????." />
        )}
        {errors.password?.type === 'maxLength' && (
          <ErrorForm eText="??????????????? 5 ~ 15?????? ?????????." />
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="email">?????????</InputLabel>
          <Input
            {...register('email', {
              required: '????????? ??????????????????.',
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            id="email"
            name="email"
            type="email"
            className="input"
          />
          <InputLabel htmlFor="nickname">??????</InputLabel>
          <Input
            {...register('nickname', {
              required: 'Username??? ??????????????????.',
              maxLength: 13,
              minLength: 4,
            })}
            id="nickname"
            name="nickname"
            type="text"
            className="input"
          />
          <InputLabel htmlFor="password">????????????</InputLabel>
          <Input
            {...register('password', {
              required: '??????????????? ??????????????????.',
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
