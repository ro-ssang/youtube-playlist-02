import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: ${({ marginTop }) => marginTop || 'none'};
  margin-bottom: ${({ marginBottom }) => marginBottom || 'none'};
`;

function PlayListData({ left, right, marginTop, marginBottom }) {
  return (
    <Container marginTop={marginTop} marginBottom={marginBottom}>
      <span>{left}</span>
      <span> &bull; </span>
      <span>{right}</span>
    </Container>
  );
}

export default PlayListData;
