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
          background-color: ${props => props.theme.color.blue};
          &:hover {
            background-color: ${props => props.theme.color.lightblue};
          }
        `
      : css`
          background-color: #dfe4ea;
          pointer-events: none;
        `}
  font-size: 0.875rem;
  border: none;
  color: ${props => props.theme.color.white};
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