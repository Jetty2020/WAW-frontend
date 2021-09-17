/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Guest = "Guest",
  Manager = "Manager",
}

export interface CreateAccountInput {
  email: string;
  nickname: string;
  password: string;
  role: UserRole;
}

export interface CreateCommentInput {
  content?: string | null;
  postId?: number | null;
}

export interface CreatePostInput {
  title?: string | null;
  imgUrl?: string | null;
  year?: number | null;
  desc?: string | null;
  artistName?: string | null;
}

export interface DeleteCommentInput {
  commentId: number;
}

export interface GetCommentsInput {
  postId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PostDetailInput {
  postId: number;
}

export interface PostsInput {
  page?: number | null;
}

export interface ToggleLikeInput {
  postId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
