import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SkeletonImgCon = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 0.5rem;
  background-color: #a5a5a5;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  animation: skeleton 1.8s infinite ease-in-out;
  @keyframes skeleton {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.2;
    }
  }
  @media screen and (max-width: 400px) {
    width: 90vw;
    height: 90vw;
  }
`;
const SkeletonInfoCon = styled.div`
  display: flex;
  flex-direction: column;
  width: 91%;
  padding: 0.5rem 0;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  margin-top: -4rem;
  z-index: 99;
`;
const SkeletonTitle = styled.div`
  display: flex;
  align-self: center;
  width: 5rem;
  height: 1.75rem;
  border-radius: 0.2rem;
  background-color: #a5a5a5;
  margin-top: 1rem;
  animation: skeleton 1.8s infinite ease-in-out;
  @keyframes skeleton {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.2;
    }
  }
`;
const SkeletonDesc = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.5rem 0;
`;
const SkeletonBy = styled.div`
  display: flex;
  width: 5rem;
  height: 1rem;
  border-radius: 0.2rem;
  background-color: #a5a5a5;
  margin-top: 0.25rem;
  animation: skeleton 1.8s infinite ease-in-out;
  @keyframes skeleton {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.2;
    }
  }
`;
const SkeletonLike = styled.div`
  display: flex;
  width: 2rem;
  height: 1rem;
  border-radius: 0.2rem;
  background-color: #a5a5a5;
  animation: skeleton 1.8s infinite ease-in-out;
  @keyframes skeleton {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.2;
    }
  }
`;
const Skeleton: React.FC = () => {
  return (
    <List>
      <SkeletonImgCon />
      <SkeletonInfoCon>
        <SkeletonTitle />
        <SkeletonDesc>
          <div>
            <SkeletonBy />
            <SkeletonBy />
          </div>
          <SkeletonLike />
        </SkeletonDesc>
      </SkeletonInfoCon>
    </List>
  );
};

export default Skeleton;
