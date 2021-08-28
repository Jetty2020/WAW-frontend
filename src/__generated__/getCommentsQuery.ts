/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetCommentsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCommentsQuery
// ====================================================

export interface getCommentsQuery_getComments_comments_user {
  __typename: "User";
  id: number;
  nickname: string;
}

export interface getCommentsQuery_getComments_comments {
  __typename: "Comment";
  id: number;
  content: string;
  createdAt: any;
  user: getCommentsQuery_getComments_comments_user;
}

export interface getCommentsQuery_getComments {
  __typename: "GetCommentsOutput";
  ok: boolean;
  error: string | null;
  totalResults: number | null;
  comments: getCommentsQuery_getComments_comments[] | null;
}

export interface getCommentsQuery {
  getComments: getCommentsQuery_getComments;
}

export interface getCommentsQueryVariables {
  getCommentsInput: GetCommentsInput;
}
