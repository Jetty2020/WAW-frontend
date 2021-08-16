import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
};
const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | World Art Works</title>
    </Helmet>
  );
};

export default PageTitle;
