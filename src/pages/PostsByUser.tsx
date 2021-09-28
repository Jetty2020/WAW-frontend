import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/atoms/Container';
import MyPost from '../components/molecules/PostList';

const PostsByUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  return (
    <Container pageTitle="a">
      <MyPost userId={+userId} />
    </Container>
  );
};

export default PostsByUser;
