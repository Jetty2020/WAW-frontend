import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  justify-content: center;
  margin: 3rem auto 5rem;
  grid-template-columns: repeat(3, 350px);
  gap: 4rem 2rem;
  @media screen and (max-width: 1120px) {
    grid-template-columns: repeat(2, 350px);
  }
  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(1, 350px);
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 90vw);
  }
`;

type Props = {
  children: React.ReactNode;
};
const ListContainer: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ListContainer;
