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

//==============================================================
// END Enums and Input Objects
//==============================================================
