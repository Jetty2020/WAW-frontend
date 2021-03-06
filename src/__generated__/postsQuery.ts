/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: postsQuery
// ====================================================

export interface postsQuery_posts_results_artist {
  __typename: "Artist";
  id: number;
  name: string;
}

export interface postsQuery_posts_results_writer {
  __typename: "User";
  id: number;
  nickname: string;
}

export interface postsQuery_posts_results {
  __typename: "Post";
  id: number;
  title: string;
  imgUrl: string;
  likesNum: number;
  artist: postsQuery_posts_results_artist | null;
  writer: postsQuery_posts_results_writer;
}

export interface postsQuery_posts {
  __typename: "PostsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: postsQuery_posts_results[] | null;
}

export interface postsQuery {
  posts: postsQuery_posts;
}

export interface postsQueryVariables {
  postsInput: PostsInput;
}
