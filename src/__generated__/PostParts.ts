/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostParts
// ====================================================

export interface PostParts_artist {
  __typename: "Artist";
  id: number;
  name: string;
}

export interface PostParts_writer {
  __typename: "User";
  id: number;
  nickname: string;
}

export interface PostParts {
  __typename: "Post";
  id: number;
  title: string;
  imgUrl: string;
  likesNum: number;
  artist: PostParts_artist | null;
  writer: PostParts_writer;
}
