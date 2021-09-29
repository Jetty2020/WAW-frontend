import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/atoms/Container';
import PostList from '../components/molecules/PostList';

const PostsByUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  return (
    <Container pageTitle="a">
      <PostList userId={+userId} />
    </Container>
  );
};

export default PostsByUser;
