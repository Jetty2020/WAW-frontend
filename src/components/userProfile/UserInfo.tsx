import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { client } from '../../apollo';
import { editProfileMutation, editProfileMutationVariables } from '../../__generated__/editProfileMutation';
import { EditProfileInput } from '../../__generated__/globalTypes';
import { meQuery } from '../../__generated__/meQuery';
import Input from '../atoms/Input';
import ErrorForm from '../auth/ErrorForm';

const EDITPROFILE_MUTATION = gql`
  mutation editProfileMutation($editProfileInput: EditProfileInput!) {
    editProfile(input: $editProfileInput) {
      ok
      error
    }
  }
`;

const ContentBox = styled.div`
  padding: 2rem;
  border: 1px solid #d3d3d3;
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
`;
const ProfileTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
`;
const InfoBox = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;
const InfoLabel = styled.div`
  width: 3.5rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
`;
const InfoContent = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;
const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const UpdateBtn = styled.button`
  margin-top: 0.25rem;
  font-size: 1rem;
  color: ${(props) => props.theme.color.green};
  padding: 0;
  background-color: ${(props) => props.theme.color.white};
  border: none;
  cursor: pointer;
  text-decoration: underline;
`;
interface IButtonStyleProps {
  canClick?: boolean;
}
const FormBtn = styled.button<IButtonStyleProps>`
  width: 30%;
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  border: none;
  margin-top: 0.5rem;
  color: ${(props) => props.theme.color.white};
  border-radius: 0.375rem;
  ${(props) =>
    props.canClick
      ? css`
          background-color: ${(props) => props.theme.color.green};
          &:hover {
            background-color: ${(props) => props.theme.color.lightblue};
          }
        `
      : css`
          background-color: #dfe4ea;
          pointer-events: none;
        `}
  @media screen and (max-width: 600px) {
    width: 50%;
    align-self: center;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

type Props = {
  userData: meQuery;
};
const UserInfo: React.FC<Props> = ({userData}) => {
  const [showInput, setShowInput] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditProfileInput>({
    mode: 'onChange',
  });
  const onCompleted = (data: editProfileMutation) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok) {
      const { email, nickname } = getValues();
      const meCashe = `User:${userData?.me.id}`;
      client.cache.modify({
        id: meCashe,
        fields: {
          email() {
            return email;
          },
          nickname() {
            return nickname;
          },
        },
      });
    }
  };
  const [edtiProfileMutation, { data: editProfileMutationResult }] =
    useMutation<editProfileMutation, editProfileMutationVariables>(
      EDITPROFILE_MUTATION,
      { onCompleted }
    );
  const onSubmit = () => {
    const { email, nickname } = getValues();
    edtiProfileMutation({
      variables: {
        editProfileInput: {
          email,
          nickname,
        },
      },
    });
    setShowInput(false);
  };
  return (
    <ContentBox>
        <ProfileTitle>??? ??????</ProfileTitle>
        {editProfileMutationResult?.editProfile.error && (
          <ErrorForm eText={editProfileMutationResult?.editProfile.error} />
        )}
        {errors.email?.type === 'pattern' && (
          <ErrorForm eText="?????? ????????? ???????????? ????????????." />
        )}
        {errors.email?.message && <ErrorForm eText={errors.email?.message} />}
        {errors.nickname?.message && (
          <ErrorForm eText={errors.nickname?.message} />
        )}
        {errors.nickname?.type === 'minLength' && (
          <ErrorForm eText="Username??? 4 ~ 13?????? ?????????." />
        )}
        {errors.nickname?.type === 'maxLength' && (
          <ErrorForm eText="Username??? 4 ~ 13?????? ?????????." />
        )}
        {showInput ? (
          <UpdateForm onSubmit={handleSubmit(onSubmit)}>
            <InfoBox>
              <InfoLabel>?????????</InfoLabel>
              <Input
                {...register('email', {
                  required: '????????? ??????????????????.',
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                id="email"
                name="email"
                defaultValue={userData?.me.email}
                style={{ marginBottom: 0, fontSize: '1rem', width: '70%' }}
                type="text"
                className="input"
              />
            </InfoBox>
            <InfoBox>
              <InfoLabel>??????</InfoLabel>
              <Input
                {...register('nickname', {
                  required: 'Username??? ??????????????????.',
                  maxLength: 13,
                  minLength: 4,
                })}
                id="nickname"
                name="nickname"
                defaultValue={userData?.me.nickname}
                style={{ marginBottom: 0, fontSize: '1rem', width: '70%' }}
                type="text"
                className="input"
              />
            </InfoBox>
            <FormBtn canClick={isValid}>????????????</FormBtn>
          </UpdateForm>
        ) : (
          <>
            <InfoBox>
              <InfoLabel>?????????</InfoLabel>
              <InfoContent>{userData?.me.email}</InfoContent>
            </InfoBox>
            <InfoBox>
              <InfoLabel>??????</InfoLabel>
              <InfoContent>{userData?.me.nickname}</InfoContent>
            </InfoBox>
            <UpdateBtn onClick={() => setShowInput(true)}>??????</UpdateBtn>
          </>
        )}
      </ContentBox>
  );
}

export default UserInfo;