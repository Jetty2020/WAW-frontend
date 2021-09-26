import React from 'react';
import styled from 'styled-components';

const NoMoreForm = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: -2rem;
  margin-bottom: 5rem;
`;
type Props = {
  totalResults: number;
};
const NoMorePost: React.FC<Props> = ({ totalResults }) => {
  return (
    <NoMoreForm>
      더 이상 게시물이 없습니다. ( {totalResults} / {totalResults} )
    </NoMoreForm>
  );
};

export default NoMorePost;
