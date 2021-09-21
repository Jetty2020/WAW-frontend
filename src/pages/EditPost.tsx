import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import PageHeader from '../components/atoms/PageHeader';
import Form from '../components/auth/Form';
import InputLabel from '../components/auth/InputLabel';
import DescInput from '../components/createPost/DescInput';
import PageTitle from '../components/PageTitle';
import useUser from '../hooks/useUser';
import {
  editPostMutation,
  editPostMutationVariables,
} from '../__generated__/editPostMutation';
import { EditPostInput } from '../__generated__/globalTypes';
import {
  postDetailQuery,
  postDetailQueryVariables,
} from '../__generated__/postDetailQuery';
import { POST_DETAIL_QUERY } from './PostDetail';

const EDIT_POST_MUTATION = gql`
  mutation editPostMutation($editPostInput: EditPostInput!) {
    editPost(input: $editPostInput) {
      ok
      error
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
const ImgCon = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  margin: 3rem auto;
  background-color: #eff1f2;
  @media screen and (max-width: 668px) {
    width: 95%;
  }
`;
const PostImg = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  @media screen and (max-width: 668px) {
    width: 100%;
  }
`;
interface Iform extends EditPostInput {
  yearStr: string;
}

const EditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const history = useHistory();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = useCallback(() => {
    if (textareaRef === null || textareaRef.current === null) {
      return;
    }
    textareaRef.current.style.height = '7rem';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  }, []);

  const { data, loading } = useQuery<postDetailQuery, postDetailQueryVariables>(
    POST_DETAIL_QUERY,
    {
      variables: {
        postInput: {
          postId: +postId,
        },
      },
    }
  );
  const postData = data?.postDetail.post;
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<Iform>({
    mode: 'onChange',
  });
  const onCompleted = async (data: editPostMutation) => {
    const {
      editPost: { ok },
    } = data;
    if (ok) {
      history.push(`/post/${postId}`);
    }
  };
  const [editPostMutation] = useMutation<
    editPostMutation,
    editPostMutationVariables
  >(EDIT_POST_MUTATION, {
    refetchQueries: [
      {
        query: POST_DETAIL_QUERY,
        variables: {
          postInput: {
            postId: +postId,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted,
  });

  const { ref, ...rest } = register('desc', {
    maxLength: 1500,
  });
  const onSubmit = async () => {
    try {
      const { title, yearStr, artistName, desc } = getValues();
      editPostMutation({
        variables: {
          editPostInput: {
            title,
            postId: +postId,
            year: +yearStr,
            artistName,
            desc,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  const { data: userData } = useUser();
  useEffect(() => {
    if (!loading && userData?.me.id !== data?.postDetail.post?.writer?.id)
      history.push(`/post/${postId}`);
  });
  return (
    <Container>
      <PageTitle title="Edit-Post" />
      <PageHeader>Edit post</PageHeader>
      <FormContainer>
        {!loading ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ImgCon>
              <PostImg src={postData?.imgUrl} />
            </ImgCon>
            <LabelBox>
              <InputLabel htmlFor="title">제목</InputLabel>
              <FormCondition>(필수, 최대 13글자)</FormCondition>
            </LabelBox>
            <Input
              {...register('title', {
                maxLength: 13,
              })}
              id="title"
              name="title"
              defaultValue={postData?.title}
              style={{ fontSize: '1rem' }}
              type="title"
              className="input"
            />
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
              defaultValue={postData?.year ? postData?.year + '' : ''}
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
              defaultValue={postData?.artist?.name}
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
              defaultValue={postData?.desc + ''}
              onInput={handleResizeHeight}
            />
            <Button canClick={isValid} actionText={'Edit Post'} />
          </Form>
        ) : null}
      </FormContainer>
    </Container>
  );
};

export default EditPost;
