import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-bottom: 6rem;
  padding-top: 4rem;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
