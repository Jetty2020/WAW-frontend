import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 28rem;
  width: 100%;
  padding: 2rem 2.5rem;
  margin: 0 1rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  background-color: #fafafa;
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
`;

type Props = {
  children: React.ReactNode;
};
const FormContainer: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default FormContainer;
