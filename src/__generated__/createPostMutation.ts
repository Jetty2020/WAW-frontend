/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePostInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createPostMutation
// ====================================================

export interface createPostMutation_createPost {
  __typename: "CreatePostOutput";
  ok: boolean;
  error: string | null;
  postId: number;
}

export interface createPostMutation {
  createPost: createPostMutation_createPost;
}

export interface createPostMutationVariables {
  createPostInput: CreatePostInput;
}
