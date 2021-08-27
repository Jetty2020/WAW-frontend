import React from 'react';
import styled, { css } from 'styled-components';

interface IButtonStyleProps {
  canClick?: boolean;
}

interface IButtonProps extends IButtonStyleProps {
  loading?: boolean;
  actionText: string;
}

const StyledButton = styled.button<IButtonStyleProps>`
  padding: 0.5rem 1rem;
  font-weight: 500;
  border: none;
  color: ${(props) => props.theme.color.white};
  border-radius: 0.375rem;
  ${(props) =>
    props.canClick
      ? css`
          background-color: ${(props) => props.theme.color.blue};
          &:hover {
            background-color: ${(props) => props.theme.color.lightblue};
          }
        `
      : css`
          background-color: #dfe4ea;
          pointer-events: none;
        `}
  font-size: 0.875rem;
`;

const AuthButton: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <StyledButton canClick={canClick}>
    {loading ? 'Loading...' : actionText}
  </StyledButton>
);

export default AuthButton;
