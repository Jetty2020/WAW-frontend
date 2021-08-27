import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import styled from 'styled-components';
import { client } from '../../apollo';
import { postDetailQuery } from '../../__generated__/postDetailQuery';
import {
  toggleLikeMutation,
  toggleLikeMutationVariables,
} from '../../__generated__/toggleLikeMutation';

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLikeMutation($toggleLikeInput: ToggleLikeInput!) {
    toggleLike(input: $toggleLikeInput) {
      ok
      error
    }
  }
`;

const LikeBtnCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  position: fixed;
  top: 35%;
  left: 10%;
  width: 4rem;
  border-radius: 2rem;
  background-color: #eff1f2;
`;

const LikeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid gray;
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.color.red};
    color: ${(props) => props.theme.color.red};
  }
`;

const LikeNum = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

type Props = {
  data: postDetailQuery;
  postId: number;
};
const LikeButton: React.FC<Props> = ({ data, postId }) => {
  const onCompletedToggleLike = (toggleLikeData: toggleLikeMutation) => {
    const {
      toggleLike: { ok },
    } = toggleLikeData;
    if (ok) {
      const postIdCashe = `Post:${data.postDetail.post?.id}`;
      client.cache.modify({
        id: postIdCashe,
        fields: {
          isLike(prev) {
            return !prev;
          },
          likesNum(prev) {
            if (data?.postDetail.post?.isLike) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const [toggleLikeMutation] = useMutation<
    toggleLikeMutation,
    toggleLikeMutationVariables
  >(TOGGLE_LIKE_MUTATION, {
    variables: {
      toggleLikeInput: { postId },
    },
    onCompleted: onCompletedToggleLike,
  });
  return (
    <LikeBtnCon>
      <LikeBtn onClick={() => toggleLikeMutation()}>
        {data?.postDetail.post?.isLike ? (
          <BsHeartFill size="1.5rem" />
        ) : (
          <BsHeart size="1.5rem" />
        )}
      </LikeBtn>
      <LikeNum>{data?.postDetail.post?.likesNum}</LikeNum>
    </LikeBtnCon>
  );
};

export default LikeButton;
