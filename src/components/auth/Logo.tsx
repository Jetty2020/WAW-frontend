import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.img`
  width: 6rem;
  height: 8rem;
  object-fit: contain;
  align-self: center;
  margin-bottom: 1rem;
`;

const Logo: React.FC = () => {
  return <StyledLogo src="/mona.jpeg" />;
};

export default Logo;
