/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getArtistsQuery
// ====================================================

export interface getArtistsQuery_getArtists_artists {
  __typename: "Artist";
  id: number;
  name: string;
}

export interface getArtistsQuery_getArtists {
  __typename: "ArtistsOutput";
  ok: boolean;
  error: string | null;
  totalResults: number | null;
  artists: getArtistsQuery_getArtists_artists[] | null;
}

export interface getArtistsQuery {
  getArtists: getArtistsQuery_getArtists;
}
