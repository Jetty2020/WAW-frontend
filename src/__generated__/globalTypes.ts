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
