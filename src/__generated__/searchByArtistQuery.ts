/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchByArtistInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchByArtistQuery
// ====================================================

export interface searchByArtistQuery_searchByArtist_posts_artist {
  __typename: "Artist";
  id: number;
  name: string;
}

export interface searchByArtistQuery_searchByArtist_posts_writer {
  __typename: "User";
  id: number;
  nickname: string;
}

export interface searchByArtistQuery_searchByArtist_posts {
  __typename: "Post";
  id: number;
  imgUrl: string;
  title: string;
  desc: string | null;
  likesNum: number;
  artist: searchByArtistQuery_searchByArtist_posts_artist | null;
  writer: searchByArtistQuery_searchByArtist_posts_writer;
  createdAt: any;
}

export interface searchByArtistQuery_searchByArtist {
  __typename: "SearchByArtistOutput";
  ok: boolean;
  error: string | null;
  totalResults: number | null;
  posts: searchByArtistQuery_searchByArtist_posts[] | null;
}

export interface searchByArtistQuery {
  searchByArtist: searchByArtistQuery_searchByArtist;
}

export interface searchByArtistQueryVariables {
  searchByArtistInput: SearchByArtistInput;
}
