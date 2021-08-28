/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostDetailInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: postDetailQuery
// ====================================================

export interface postDetailQuery_postDetail_post_artist {
  __typename: "Artist";
  id: number;
  name: string;
}

export interface postDetailQuery_postDetail_post_writer {
  __typename: "User";
  id: number;
  nickname: string;
}

export interface postDetailQuery_postDetail_post {
  __typename: "Post";
  desc: string | null;
  year: number | null;
  createdAt: any;
  isLike: boolean;
  id: number;
  title: string;
  imgUrl: string;
  likesNum: number;
  artist: postDetailQuery_postDetail_post_artist | null;
  writer: postDetailQuery_postDetail_post_writer;
}

export interface postDetailQuery_postDetail {
  __typename: "PostDetailOutput";
  ok: boolean;
  error: string | null;
  post: postDetailQuery_postDetail_post | null;
}

export interface postDetailQuery {
  postDetail: postDetailQuery_postDetail;
}

export interface postDetailQueryVariables {
  postInput: PostDetailInput;
}
