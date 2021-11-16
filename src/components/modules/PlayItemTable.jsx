import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { createIframeByPlaylistId } from '../../lib/youtubePlayer';
import { setPlayer } from '../../store/player';
import Th from '../atoms/Th';
import Tr from '../atoms/Tr';
import AddPlayItemModal from './AddPlayItemModal';
import PlayItemMenu from './PlayItemMenu';

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

function PlayItemTable({ match, playItems, showingMenu, player, setPlayer, showingAddItemModal }) {
  const onPlay = useCallback(
    (index) => {
      const {
        params: { playlistId },
      } = match;

      if (!player) {
        const iframe = createIframeByPlaylistId(playlistId, index);
        setPlayer(iframe);
      } else {
        player.loadPlaylist({ list: playlistId, listType: 'playlist', index });
      }
    },
    [match, player, setPlayer]
  );

  return (
    <>
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
        {playItems && (
          <TBody>
            {playItems.map((item, index) => {
              const {
                id,
                snippet: {
                  resourceId: { videoId },
                  title,
                  videoOwnerChannelTitle: artist,
                },
              } = item;
              const thumbnailUrl = item.snippet.thumbnails.medium?.url;
              return (
                <Tr
                  key={id}
                  videoId={videoId}
                  thumbnailUrl={thumbnailUrl}
                  title={title}
                  artist={artist}
                  time="4:02"
                  onPlay={() => onPlay(index)}
                />
              );
            })}
          </TBody>
        )}
      </Container>
      {showingMenu && <PlayItemMenu />}
      {showingAddItemModal && <AddPlayItemModal />}
    </>
  );
}

export default connect(
  ({ menu, modal, player }) => ({
    showingMenu: menu.showingMenu,
    showingAddItemModal: modal.showing.addItem,
    player: player.player,
  }),
  { setPlayer }
)(withRouter(PlayItemTable));
