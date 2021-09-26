import React from 'react';
import styled from 'styled-components';
import PageTitle from '../PageTitle';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Components = styled.div`
  width: 768px;
  margin-top: 2rem;
  margin-bottom: 3rem;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;

type Props = {
  children: React.ReactNode;
  pageTitle: string;
};
const Container: React.FC<Props> = ({ children, pageTitle }) => {
  return (
    <StyledContainer>
      <PageTitle title={pageTitle} />
      <Components>{children}</Components>
    </StyledContainer>
  );
};

export default Container;
