import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logUserOut } from '../apollo';

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 3.9rem;
  right: 2rem;
  width: 10rem;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
  background-color: #ffffff;
  z-index: 9999;
`;
const MemuItem = styled.div`
  width: 100%;
  padding: 0.75rem 1rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #ebebeb;
  }
`;
interface props {
  showMenu: boolean;
  setShowMenu(value: boolean): void;
}
const DropDown: React.FC<props> = ({ showMenu, setShowMenu }) => {
  const closeDropDown = useCallback(() => {
    setShowMenu(false);
  }, [setShowMenu]);
  useEffect(() => {
    if (showMenu) {
      window.addEventListener('click', closeDropDown);
    }
    return () => {
      window.removeEventListener('click', closeDropDown);
    };
  }, [showMenu, closeDropDown]);
  return createPortal(
    <Container>
      <Link to={`/user-profile`}>
        <MemuItem>설정</MemuItem>
      </Link>
      <MemuItem onClick={() => logUserOut()}>로그아웃</MemuItem>
    </Container>,
    document.getElementById('dropdown')!
  );
};

export default DropDown;
