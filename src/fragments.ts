import { gql } from '@apollo/client';

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    title
    imgUrl
    likesNum
    artist {
      id
      name
    }
    writer {
      id
      nickname
    }
  }
`;
