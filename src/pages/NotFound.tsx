import React from 'react';
import PageTitle from '../components/PageTitle';

type Props = {};
const NotFound: React.FC<Props> = () => {
  return (
    <div>
      <PageTitle title="Not Found" />
      <div>Not Found</div>
    </div>
  );
};

export default NotFound;
