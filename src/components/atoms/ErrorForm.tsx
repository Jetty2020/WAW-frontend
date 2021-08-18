import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';

interface IErrorFormProps {
  eText: string;
}

const StyledErrorForm = styled.div`
  background-color: #fef1f2;
  padding: 1rem;
  display: flex;
  color: #f87171;
  margin-bottom: 1.25rem;
  vertical-align: sub;
`;
const ErrorMsg = styled.div`
  margin-left: 0.5rem;
`;

const ErrorForm: React.FC<IErrorFormProps> = ({ eText, ...props }) => {
  return (
    <StyledErrorForm {...props}>
      <AiFillCloseCircle size="1.2rem" />
      <ErrorMsg>{eText}</ErrorMsg>
    </StyledErrorForm>
  );
};

export default ErrorForm;
