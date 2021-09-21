import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './atoms/Logo';
import { isLoggedInVar, logUserOut } from '../apollo';
import { FaSignOutAlt } from 'react-icons/fa';
import { useReactiveVar } from '@apollo/client';
import { AiOutlineSearch } from 'react-icons/ai';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 2px solid #e5e7eb;
  z-index: 999;
  @media screen and (max-width: 425px) {
    padding: 0 1rem;
  }
`;

const RightNav = styled.div`
  display: flex;
  align-items: center;
`;
const LogBox = styled.div`
  display: flex;
  align-items: center;
`;
const SearchIcon = styled(AiOutlineSearch)`
  color: #2c2c2c;
  margin-right: 1rem;
  &:hover {
    color: #545454;
  }
`;

const CreatePostBtn = styled.div`
  display: flex;
  height: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 1rem;
  border: 1px solid #343a40;
  color: #343a40;
  cursor: pointer;
  margin-right: 1rem;
  align-items: center;
  transition: all 0.125s ease-in 0s;
  &:hover {
    color: ${(props) => props.theme.color.white};
    background-color: #343a40;
  }
`;

const LoginButton = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 2rem;
  &:hover {
    color: #374251;
  }
`;
const JoinButton = styled.button`
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.blue};
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.lightblue};
  }
`;

const Signout = styled(FaSignOutAlt)`
  cursor: pointer;
  color: #2c2c2c;
  &:hover {
    color: #545454;
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <Logo lWidth="6rem" lHeight="3rem" src="/waw.png" />
      </Link>
      <RightNav>
        <Link to="/search">
          <SearchIcon size="1.5rem" />
        </Link>
        {useReactiveVar(isLoggedInVar) ? (
          <LogBox>
            <Link to="/create-post">
              <CreatePostBtn>새 글 작성</CreatePostBtn>
            </Link>
            <Signout size="1.4rem" onClick={() => logUserOut()} />
          </LogBox>
        ) : (
          <LogBox>
            <Link to="/login">
              <LoginButton>Login</LoginButton>
            </Link>
            <Link to="/join">
              <JoinButton>Join</JoinButton>
            </Link>
          </LogBox>
        )}
      </RightNav>
    </Container>
  );
};

export default Header;
