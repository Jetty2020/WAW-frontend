import React from 'react';
import useUser from '../hooks/useUser';

type Props = {};
const UserProfile: React.FC<Props> = () => {
  const { data } = useUser();
  console.log(data?.me);
  return <div>UserProfile</div>;
};

export default UserProfile;
