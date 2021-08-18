import { Settings } from 'http2';
import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledLogo = styled.img<StyleProps>`
  width: ${(props) => props.lWidth ?? '6rem'};
  height: ${(props) => props.lHeight ?? '8rem'};
  object-fit: contain;
  align-self: center;
  margin: ${(props) => props.margin ?? '0'};
`;

interface ILogoProps {
  lWidth?: string;
  lHeight?: string;
  margin?: string;
  src: string;
}

interface StyleProps extends ILogoProps {
  src: string;
}

const Logo: React.FC<ILogoProps> = ({ lWidth, lHeight, margin, src }) => {
  return (
    <StyledLogo
      lWidth={lWidth}
      lHeight={lHeight}
      margin={margin}
      src={src}
    />
  );
};

export default Logo;
