/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchByUserInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchByUserQuery
// ====================================================

export interface searchByUserQuery_searchByUser_posts_artist {
  __typename: "Artist";
  id: number;
  name: string;
}

export interface searchByUserQuery_searchByUser_posts_writer {
  __typename: "User";
  id: number;
  nickname: string;
}

export interface searchByUserQuery_searchByUser_posts {
  __typename: "Post";
  id: number;
  imgUrl: string;
  title: string;
  desc: string | null;
  likesNum: number;
  artist: searchByUserQuery_searchByUser_posts_artist | null;
  writer: searchByUserQuery_searchByUser_posts_writer;
  createdAt: any;
}

export interface searchByUserQuery_searchByUser {
  __typename: "SearchByUserOutput";
  ok: boolean;
  error: string | null;
  totalResults: number | null;
  userName: string;
  posts: searchByUserQuery_searchByUser_posts[] | null;
}

export interface searchByUserQuery {
  searchByUser: searchByUserQuery_searchByUser;
}

export interface searchByUserQueryVariables {
  searchByUserInput: SearchByUserInput;
}
