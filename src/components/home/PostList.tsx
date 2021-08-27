import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { postsQuery_posts_results } from '../../__generated__/postsQuery';

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PostImgCon = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 0.5rem;
  transition: 0.2s ease-in-out 0s;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  &:hover {
    margin-top: -0.75rem;
  }
  @media screen and (max-width: 400px) {
    width: 90vw;
    height: 90vw;
  }
`;
const PostImg = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 0.5rem;
  align-items: center;
  transition: 0.2s ease-in-out 0s;
  &:hover {
    margin-top: -0.75rem;
    transform: scale(1.05);
  }
  @media screen and (max-width: 400px) {
    width: 90vw;
    height: 90vw;
  }
`;
const PostInfoCon = styled.div`
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
const PostTitle = styled.h3`
  display: flex;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 1rem 0 0.5rem;
`;
const PostDesc = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.5rem 0;
  font-size: 0.875rem;
  color: gray;
  font-weight: 300;
`;
const PostedNMade = styled.div`
  font-size: inherit;
  font-weight: inherit;
`;
const PostBy = styled.div`
  display: flex;
  font-size: inherit;
  font-weight: inherit;
`;
const Name = styled.div`
  margin-left: 0.375rem;
  font-size: inherit;
  font-weight: 400;
  color: black;
`;
const PostLike = styled.div`
  display: flex;
  color: black;
  font-size: inherit;
  font-weight: inherit;
`;

type Props = {
  post: postsQuery_posts_results;
};
const PostList: React.FC<Props> = ({ post }) => {
  return (
    <List>
      <PostImgCon>
        <Link to={`/post/${[post.id]}`}>
          <PostImg alt="post" src={post.imgUrl} />
        </Link>
      </PostImgCon>
      <PostInfoCon>
        <Link to={`/post/${[post.id]}`}>
          <PostTitle>{post.title}</PostTitle>
        </Link>
        <PostDesc>
          <PostedNMade>
            <PostBy>
              posted by{' '}
              <Link to={`/user/${post.writer.id}`}>
                <Name>{post.writer.nickname}</Name>
              </Link>
            </PostBy>
            <PostBy>
              made by{' '}
              {post.artist ? (
                <Link to={`/made-by/${post.artist.id}`}>
                  <Name>{post.artist?.name}</Name>
                </Link>
              ) : (
                <Name>정보 없음</Name>
              )}
            </PostBy>
          </PostedNMade>
          <PostLike>
            {' '}
            <AiFillHeart />
            {post.likesNum}
          </PostLike>
        </PostDesc>
      </PostInfoCon>
    </List>
  );
};

export default PostList;
