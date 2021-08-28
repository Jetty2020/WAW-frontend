import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './atoms/Logo';
import { isLoggedInVar, logUserOut } from '../apollo';
import { FaSignOutAlt } from 'react-icons/fa';
import { useReactiveVar } from '@apollo/client';

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
`;

const RightNav = styled.div`
  display: flex;
  align-items: center;
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
      {useReactiveVar(isLoggedInVar) ? (
        <RightNav>
          <Signout size="1.4rem" onClick={() => logUserOut()} />
        </RightNav>
      ) : (
        <RightNav>
          <Link to="/login">
            <LoginButton>Login</LoginButton>
          </Link>
          <Link to="/join">
            <JoinButton>Join</JoinButton>
          </Link>
        </RightNav>
      )}
    </Container>
  );
};

export default Header;
