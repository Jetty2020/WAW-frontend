import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../components/atoms/Container';
import UserInfo from '../components/userProfile/UserInfo';
import useUser from '../hooks/useUser';

const UserProfile: React.FC = () => {
  const { data: userData, loading: userLoading } = useUser();
  const history = useHistory();
  if (!userData && !userLoading) history.push('/');
  return (
    <Container pageTitle="User-profile">
      {userData && <UserInfo userData={userData} />}
    </Container>
  );
};

export default UserProfile;
