import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const H2 = styled.h2`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.875rem;
  line-height: 2.25rem;
`;
const Text = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-bottom: 1.5rem;
`;
const Button = styled.button`
  padding: 1rem 2.5rem;
  background-color: ${(props) => props.theme.color.blue};
  &:hover {
    background-color: ${(props) => props.theme.color.lightblue};
  }
  font-size: 1rem;
  font-weight: 500;
  border: none;
  color: ${(props) => props.theme.color.white};
  border-radius: 1rem;
`;

const NotFound: React.FC = () => {
  return (
    <Container>
      <PageTitle title="Not Found" />
      <H2>404 - 죄송합니다. 페이지를 사용할 수 없습니다.</H2>
      <Text>클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.</Text>
      <Link to="/">
        <Button>홈으로</Button>
      </Link>
    </Container>
  );
};

export default NotFound;
