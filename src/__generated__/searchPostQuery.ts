/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPostInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPostQuery
// ====================================================

export interface searchPostQuery_searchPost_posts_artist {
  __typename: "Artist";
  id: number;
  name: string;
}

export interface searchPostQuery_searchPost_posts_writer {
  __typename: "User";
  id: number;
  nickname: string;
}

export interface searchPostQuery_searchPost_posts {
  __typename: "Post";
  id: number;
  imgUrl: string;
  title: string;
  desc: string | null;
  likesNum: number;
  artist: searchPostQuery_searchPost_posts_artist | null;
  writer: searchPostQuery_searchPost_posts_writer;
  createdAt: any;
}

export interface searchPostQuery_searchPost {
  __typename: "SearchPostOutput";
  ok: boolean;
  error: string | null;
  totalResults: number | null;
  posts: searchPostQuery_searchPost_posts[] | null;
}

export interface searchPostQuery {
  searchPost: searchPostQuery_searchPost;
}

export interface searchPostQueryVariables {
  searchPostInput: SearchPostInput;
}
