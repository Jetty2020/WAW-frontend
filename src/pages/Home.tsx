import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';

const Container = styled.div`
  height: 200vh;
`;

const Home = () => {
  return (
    <div>
      <PageTitle title="Home" />
      <Container>Home</Container>
    </div>
  );
};

export default Home;
