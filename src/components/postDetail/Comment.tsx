import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCommentsQuery_getComments_comments } from '../../__generated__/getCommentsQuery';
import DeleteModal from './DeleteModal';

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
const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const DeleteCon = styled.div`
  color: #868e96;
  cursor: pointer;
  &:hover {
    color: #c1c8cf;
    text-decoration: underline;
  }
`;
const Nickname = styled(Link)`
  align-self: flex-start;
  font-size: 1rem;
  font-weight: 600;
  color: #343a40;
  &:hover {
    text-decoration: underline;
  }
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
  postId: number;
};

const Comment: React.FC<Props> = ({ data, postId }) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const handleModal = () => {
    setModalShow(true);
  };
  return (
    <CommentList>
      {modalShow && <DeleteModal setModalShow={setModalShow} postId={postId} commentId={data.id} />}
      <InfoBox>
        <div>
          <Nickname to={`/user/${data.user.id}`}>{data.user.nickname}</Nickname>
          <DateBox>{`${data.createdAt.substr(0, 4)}년 ${data.createdAt.substr(
            5,
            2
          )}월 ${data.createdAt.substr(8, 2)}일`}</DateBox>
        </div>
        <DeleteCon onClick={() => handleModal()}>삭제</DeleteCon>
      </InfoBox>
      <Content>{data.content}</Content>
    </CommentList>
  );
};

export default Comment;
