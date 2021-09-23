/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPostInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPostQuery
// ====================================================

export interface searchPostQuery_searchPost_posts {
  __typename: "Post";
  id: number;
  title: string;
  imgUrl: string;
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
