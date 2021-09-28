import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../components/atoms/Container';
import MyPost from '../components/userProfile/MyPost';
import UserInfo from '../components/userProfile/UserInfo';
import useUser from '../hooks/useUser';

const UserProfile: React.FC = () => {
  const { data: userData, loading: userLoading } = useUser();
  const history = useHistory();
  if (!userData && !userLoading) history.push('/');
  return (
    <Container
      pageTitle={userData ? userData?.me.nickname + "'s 프로필" : '프로필'}
    >
      {userData && (
        <>
          <UserInfo userData={userData} />
          <MyPost userData={userData} />
        </>
      )}
    </Container>
  );
};

export default UserProfile;
