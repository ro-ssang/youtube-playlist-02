import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createIframeByPlaylistId } from '../../lib/youtubePlayer';
import { setPlayer, setLooping } from '../../store/player';
import Th from '../atoms/Th';
import Tr from '../atoms/Tr';
import AddPlayItemModal from './AddPlayItemModal';
import DeletePlayItemModal from './DeletePlayItemModal';
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

function PlayItemTable({
  match,
  playItems,
  showingMenu,
  player,
  setPlayer,
  showingAddItemModal,
  showingDeleteItemModal,
  setLooping,
}) {
  const onPlay = useCallback(
    (index) => {
      const playItemsId = playItems.map((playItem) => {
        const {
          snippet: {
            resourceId: { videoId },
          },
        } = playItem;
        return videoId;
      });

      const playlistId = playItemsId.join(',');

      if (!player) {
        const iframe = createIframeByPlaylistId(playlistId, index);
        setPlayer(iframe);
      } else {
        player.loadPlaylist({ listType: 'playlist', playlist: playlistId, index });
      }

      setLooping(false);
    },
    [player, setPlayer, setLooping, playItems]
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
                  resourceId: { videoId: resourceId },
                  title,
                  videoOwnerChannelTitle: artist,
                },
              } = item;
              const thumbnailUrl = item.snippet.thumbnails.medium?.url;
              return (
                <Tr
                  key={id}
                  id={id}
                  resourceId={resourceId}
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
      {showingDeleteItemModal && <DeletePlayItemModal />}
    </>
  );
}

export default connect(
  ({ menu, modal, player }) => ({
    showingMenu: menu.showingMenu,
    showingAddItemModal: modal.showing.addItem,
    showingDeleteItemModal: modal.showing.deleteItem,
    player: player.player,
  }),
  { setPlayer, setLooping }
)(PlayItemTable);
