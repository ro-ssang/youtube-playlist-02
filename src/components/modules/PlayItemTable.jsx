import React from 'react';
import styled from 'styled-components';
import Th from '../atoms/Th';
import Tr from '../atoms/Tr';

const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
  table-layout: fixed;
`;
const TBody = styled.tbody`
  font-size: 0.8125rem;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.secondary};
`;

function PlayItemTable({ loadingPlayItems, playItems }) {
  return (
    <Container>
      <thead>
        <tr>
          <Th width="40%" isFirst={true}>
            노래
          </Th>
          <Th width="20%">앨범</Th>
          <Th width="30%">아티스트</Th>
          <Th width="10%">시간</Th>
        </tr>
      </thead>
      {!loadingPlayItems && playItems && (
        <TBody>
          {playItems.map((item) => {
            const {
              id,
              snippet: { title, videoOwnerChannelTitle: artist },
            } = item;
            const thumbnailUrl = item.snippet.thumbnails.medium?.url;
            return <Tr key={id} thumbnailUrl={thumbnailUrl} title={title} artist={artist} time="4:02" />;
          })}
        </TBody>
      )}
    </Container>
  );
}

export default PlayItemTable;
