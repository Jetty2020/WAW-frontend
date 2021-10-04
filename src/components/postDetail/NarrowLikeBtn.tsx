import { useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import styled from 'styled-components';
import { client } from '../../apollo';
import { postDetailQuery } from '../../__generated__/postDetailQuery';
import {
  toggleLikeMutation,
  toggleLikeMutationVariables,
} from '../../__generated__/toggleLikeMutation';
import { TOGGLE_LIKE_MUTATION } from './LikeButton';

const Container = styled.div`
  display: flex;
  @media screen and (min-width: 851px) {
    display: none;
  }
`;
interface ILikeBtnProps {
  isLike?: boolean;
}
const LikeBtn = styled.div<ILikeBtnProps>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.isLike ? '#FAFAFA' : '#a7a7a7')};
  padding: 0.2rem 1rem;
  border-radius: 1.4rem;
  border: ${(props) =>
    !props.isLike ? '1.5px solid #a7a7a7' : '1.5px solid rgb(22, 196, 144)'};
  background-color: ${(props) => props.isLike && 'rgb(22, 196, 144)'};
`;
const LikeNum = styled.div`
  margin-left: 0.5rem;
`;
type Props = {
  data: postDetailQuery;
  postId: number;
};
const NarrowLikeBtn: React.FC<Props> = ({ data, postId, children }) => {
  const onCompletedToggleLike = useCallback(
    (toggleLikeData: toggleLikeMutation) => {
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
    },
    [data.postDetail.post]
  );

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
    <Container onClick={() => toggleLikeMutation()}>
      <LikeBtn isLike={data?.postDetail.post?.isLike}>
        {data?.postDetail.post?.isLike ? (
          <BsHeartFill color="white" />
        ) : (
          <BsHeart />
        )}
        <LikeNum>{data?.postDetail.post?.likesNum}</LikeNum>
      </LikeBtn>
    </Container>
  );
};

export default NarrowLikeBtn;
