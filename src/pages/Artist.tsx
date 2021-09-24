import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ArtistCon = styled.div`
  width: 768px;
  margin-top: 2rem;
  margin-bottom: 3rem;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;
const ArtistListCon = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.color.white};
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
`;

const Artist: React.FC = () => {
  const [_, artistId] = decodeURI(window.location.href).split('?id=');
  console.log(artistId);
  return (
    <Container>
      <ArtistCon>
        <ArtistListCon>a</ArtistListCon>
        <div>Artist</div>
      </ArtistCon>
    </Container>
  );
};

export default Artist;
