import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCommentsQuery_getComments_comments } from '../../__generated__/getCommentsQuery';

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  border-bottom: 0.875px solid #e6e5e5;
  &:last-child {
    border-bottom: none;
    margin-bottom: 3rem;
  }
`;

const Nickname = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #343a40;
`;

const DateBox = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 0.25rem;
  color: #868e96;
`;

const Content = styled.div`
  line-height: 1.3rem;
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
`;
type Props = {
  data: getCommentsQuery_getComments_comments;
};

const Comment: React.FC<Props> = ({ data }) => {
  return (
    <CommentList>
      <Link to={`/user/${data.user.id}`}>
        <Nickname>{data.user.nickname}</Nickname>
      </Link>
      <DateBox>{`${data.createdAt.substr(0, 4)}년 ${data.createdAt.substr(
        5,
        2
      )}월 ${data.createdAt.substr(8, 2)}일`}</DateBox>
      <Content>{data.content}</Content>
    </CommentList>
  );
};

export default Comment;
