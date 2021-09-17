import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import PageHeader from '../components/atoms/PageHeader';
import Form from '../components/auth/Form';
import InputLabel from '../components/auth/InputLabel';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { CreatePostInput } from '../__generated__/globalTypes';
import DescInput from '../components/createPost/DescInput';
import {
  createPostMutation,
  createPostMutationVariables,
} from '../__generated__/createPostMutation';
import { useHistory } from 'react-router-dom';
import { POSTS_QUERY } from './Home';

const CREATEPOST_MUTATION = gql`
  mutation createPostMutation($createPostInput: CreatePostInput!) {
    createPost(input: $createPostInput) {
      ok
      error
      postId
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 2rem;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 48rem;
  width: 95%;
  min-height: 35rem;
  padding: 2rem 2.5rem;
  margin: 0 1rem 4rem;
  border: 1px solid #d3d3d3;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
`;
const LabelBox = styled.div`
  display: flex;
`;
const FormCondition = styled.div`
  color: ${(props) => props.theme.color.gray};
  margin-left: 0.5rem;
`;
const FileBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;
const FileInput = styled.input`
  margin-bottom: 0.5rem;
`;
const PostImg = styled.img`
  max-width: 200px;
  max-height: 100px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;
interface Iform extends CreatePostInput {
  yearStr: string;
  file: FileList;
}
const CreatePost: React.FC = () => {
  const history = useHistory();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = useCallback(() => {
    if (textareaRef === null || textareaRef.current === null) {
      return;
    }
    textareaRef.current.style.height = '7rem';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  }, []);
  const [localUrl, setLocalUrl] = useState<string>('');

  const handleChangeFile = (e: any) => {
    const imageFile = e.target.files[0];
    const imageLocalUrl = URL.createObjectURL(imageFile);
    setLocalUrl(imageLocalUrl);
  };
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<Iform>({
    mode: 'onChange',
  });
  const onCompleted = (data: createPostMutation) => {
    const {
      createPost: { ok, postId },
    } = data;
    if (ok) {
      setUploading(false);
      history.push(`/post/${postId}`);
    }
  };
  const [createPostMutation] = useMutation<
    createPostMutation,
    createPostMutationVariables
  >(CREATEPOST_MUTATION, {
    refetchQueries: [
      {
        query: POSTS_QUERY,
        variables: {
          postsInput: {
            page: 1,
          },
        },
      },
    ],
    onCompleted,
  });

  const { ref, ...rest } = register('desc', {
    required: '작품 설명이 비어있습니다.',
    maxLength: 1500,
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    try {
      const { title, yearStr, artistName, desc, file } = getValues();
      setUploading(true);
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append('file', actualFile);
      const { url: coverImg } = await (
        await fetch('http://localhost:4000/uploads/', {
          method: 'POST',
          body: formBody,
        })
      ).json();
      createPostMutation({
        variables: {
          createPostInput: {
            title,
            year: +yearStr,
            imgUrl: coverImg,
            artistName,
            desc,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <PageTitle title="Create-Post" />
      <PageHeader>Create new post</PageHeader>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <LabelBox>
            <InputLabel htmlFor="title">제목</InputLabel>
            <FormCondition>(필수, 최대 13글자)</FormCondition>
          </LabelBox>
          <Input
            {...register('title', {
              required: '제목이 비어있습니다.',
              maxLength: 13,
            })}
            id="title"
            name="title"
            style={{ fontSize: '1rem' }}
            type="title"
            className="input"
          />
          <LabelBox>
            <InputLabel htmlFor="img">이미지 파일</InputLabel>
            <FormCondition>(필수)</FormCondition>
          </LabelBox>
          <FileBox>
            <FileInput
              {...register('file', { required: true })}
              id="img"
              type="file"
              accept="image/*"
              onChange={(e) => handleChangeFile(e)}
            />
            <div>{localUrl && <PostImg src={localUrl} alt="file" />}</div>
          </FileBox>
          <LabelBox>
            <InputLabel htmlFor="yearStr">제작년도</InputLabel>
            <FormCondition>(최대 4글자, 숫자)</FormCondition>
          </LabelBox>
          <Input
            {...register('yearStr', {
              maxLength: 4,
            })}
            id="yearStr"
            name="yearStr"
            style={{ fontSize: '1rem' }}
            type="number"
            className="input"
          />
          <LabelBox>
            <InputLabel htmlFor="artistName">작가 이름</InputLabel>
            <FormCondition>(최대 20글자)</FormCondition>
          </LabelBox>
          <Input
            {...register('artistName', {
              maxLength: 20,
            })}
            id="artistName"
            name="artistName"
            style={{ fontSize: '1rem' }}
            type="text"
            className="input"
          />
          <LabelBox>
            <InputLabel htmlFor="desc">작품 설명</InputLabel>
            <FormCondition>(필수, 최대 1500글자)</FormCondition>
          </LabelBox>
          <DescInput
            {...rest}
            ref={(e) => {
              ref(e);
              textareaRef.current = e;
            }}
            id="desc"
            onInput={handleResizeHeight}
          />
          <Button
            canClick={isValid}
            uploading={uploading}
            actionText={'Create Post'}
          />
        </Form>
      </FormContainer>
    </Container>
  );
};

export default CreatePost;
