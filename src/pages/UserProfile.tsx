import React from 'react';
import Container from '../components/atoms/Container';
import useUser from '../hooks/useUser';

const UserProfile: React.FC = () => {
  const { data } = useUser();
  console.log(data?.me);
  return (
    <Container pageTitle="User-profile">
      <div>UserProfile</div>
    </Container>
  );
};

export default UserProfile;
