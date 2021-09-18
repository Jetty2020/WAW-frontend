/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeletePostInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deletePostMutation
// ====================================================

export interface deletePostMutation_deletePost {
  __typename: "DeletePostOutput";
  ok: boolean;
  error: string | null;
}

export interface deletePostMutation {
  deletePost: deletePostMutation_deletePost;
}

export interface deletePostMutationVariables {
  deletePostInput: DeletePostInput;
}
