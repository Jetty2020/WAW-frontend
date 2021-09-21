/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditPostInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editPostMutation
// ====================================================

export interface editPostMutation_editPost {
  __typename: "EditPostOutput";
  ok: boolean;
  error: string | null;
}

export interface editPostMutation {
  editPost: editPostMutation_editPost;
}

export interface editPostMutationVariables {
  editPostInput: EditPostInput;
}
