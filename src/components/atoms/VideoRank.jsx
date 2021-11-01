import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.secondary};
  margin-right: 0.5 rem;
`;
const Rank = styled.span``;
const Hyphen = styled.span`
  margin-left: 0.5rem;
`;

function VideoRank({ children }) {
  return (
    <Container>
      <Rank>{children}</Rank>
      <Hyphen>-</Hyphen>
    </Container>
  );
}

export default VideoRank;
