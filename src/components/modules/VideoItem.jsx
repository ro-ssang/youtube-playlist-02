import React, { useCallback } from 'react';
import styled from 'styled-components';
import VideoRank from '../atoms/VideoRank';
import VideoTitle from '../atoms/VideoTitle';
import { ReactComponent as AddList } from '../../assets/icons/addList.svg';
import { createIframeByVideoId } from '../../lib/youtubePlayer';
import { connect } from 'react-redux';
import { showAddItemModal } from '../../store/modal';
import { setPlayer, setLooping } from '../../store/player';
import { selectVideo } from '../../store/videos';

const Container = styled.li`
  position: relative;
  width: calc(25% - 1rem);
  margin: 0px 0.5rem 2.5rem;
  cursor: pointer;
`;
const ThumbnailContainer = styled.div``;
const Thumbnail = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: cover;
`;
const VideoDescriptionContainer = styled.div`
  display: flex;
  margin: 0.75rem 2rem 0.25rem 0px;
`;
const AddListIcon = styled(AddList)`
  position: absolute;
  right: 0px;
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.colors.primary};
  margin-left: auto;
  z-index: 2;
`;

function VideoItem({ videoId, title, thumbnail, rank, player, setPlayer, setLooping, selectVideo, showAddItemModal }) {
  const onLoadVideo = useCallback(() => {
    if (!player) {
      const iframe = createIframeByVideoId(videoId);
      setPlayer(iframe);
    } else {
      player.loadVideoById(videoId);
    }
    setLooping(false);
  }, [videoId, player, setPlayer, setLooping]);

  const onClickAddList = useCallback(
    (e) => {
      e.stopPropagation();
      selectVideo(videoId, videoId);
      showAddItemModal();
    },
    [videoId, selectVideo, showAddItemModal]
  );

  return (
    <Container onClick={onLoadVideo}>
      <ThumbnailContainer>
        <Thumbnail src={thumbnail} alt={title} />
      </ThumbnailContainer>
      <VideoDescriptionContainer>
        <VideoRank>{rank}</VideoRank>
        <VideoTitle>{title}</VideoTitle>
        <AddListIcon onClick={onClickAddList} />
      </VideoDescriptionContainer>
    </Container>
  );
}

export default connect(
  ({ player }) => ({
    player: player.player,
  }),
  {
    setPlayer,
    setLooping,
    selectVideo,
    showAddItemModal,
  }
)(VideoItem);
