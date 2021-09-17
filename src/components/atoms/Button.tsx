import React from 'react';
import styled, { css } from 'styled-components';

interface IButtonStyleProps {
  canClick?: boolean;
  uploading?: boolean;
}

interface IButtonProps extends IButtonStyleProps {
  loading?: boolean;
  actionText: string;
}

const StyledButton = styled.button<IButtonStyleProps>`
  width: 100%;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border: none;
  color: ${(props) => props.theme.color.white};
  border-radius: 0.375rem;
  ${(props) =>
    props.canClick && !props.uploading
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

const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
  uploading,
}) => {
  let text = '';
  if (loading) text = 'Loading...';
  else if (uploading) text = 'Uploading...';
  else text = actionText;
  return (
    <StyledButton canClick={canClick} uploading={uploading}>
      {text}
    </StyledButton>
  );
};

export default Button;
