import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import {
  getCommentsQuery,
  getCommentsQueryVariables,
} from '../../__generated__/getCommentsQuery';
import Comment from './Comment';
import CreateCommentForm from './CreateCommentForm';

export const GET_COMMENTS_QUERY = gql`
  query getCommentsQuery($getCommentsInput: GetCommentsInput!) {
    getComments(input: $getCommentsInput) {
      ok
      error
      totalResults
      comments {
        id
        content
        createdAt
        user {
          id
          nickname
        }
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 85%;
`;

const CommentListBox = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  postId: number;
};

const Comments: React.FC<Props> = ({ postId }) => {
  const { data, loading } = useQuery<
    getCommentsQuery,
    getCommentsQueryVariables
  >(GET_COMMENTS_QUERY, {
    variables: {
      getCommentsInput: {
        postId,
      },
    },
  });
  return (
    <Container>
      <CreateCommentForm
        postId={postId}
        totalResults={data?.getComments.totalResults ?? 0}
      />
      <CommentListBox>
        {!loading && data?.getComments.totalResults !== 0 &&
          data?.getComments.comments?.map((comment) => (
            <Comment data={comment} postId={postId} key={comment.id} />
          ))}
      </CommentListBox>
    </Container>
  );
};

export default Comments;
