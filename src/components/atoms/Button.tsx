import React from 'react';
import styled, { css } from 'styled-components';

interface IButtonProps {
  canClick: boolean;
  loading?: boolean;
  actionText?: string;
}

const StyledButton = styled.button<IButtonProps>`
  padding: 0.5rem 1rem;
  ${(props) =>
    props.canClick
      ? css`
          background-color: #2563eb;
          &:hover {
            background-color: #4789f5;
          }
        `
      : css`
          background-color: #dfe4ea;
          pointer-events: none;
        `}
  font-size: 0.875rem;
  border: none;
  color: #ffffff;
  border-radius: 0.375rem;
`;

const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
  ...props
}) => (
  <StyledButton canClick={canClick} {...props}>
    {loading ? 'Loading...' : actionText}
  </StyledButton>
);

export default Button;