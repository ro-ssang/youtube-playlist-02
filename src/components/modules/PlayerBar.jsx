import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loader from '../atoms/Loader';
import PlayerCenterBox from './PlayerCenterBox';
import PlayerLeftBox from './PlayerLeftBox';
import { BarWrapper as VolumeBarWrapper } from './VolumeBar';
import PlayerRightBox from './PlayerRightBox';
import ProgressBar, { BarWrapper, CircleContainer } from './ProgressBar';
import { getVideoInfo } from '../../store/player';

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  right: 0px;
  display: ${({ showingPlayer }) => (showingPlayer ? 'flex' : 'none')};
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: ${({ theme }) => `calc(100% - ${theme.sizes.sidebar.width} - 0px)`};
  height: ${({ theme }) => theme.sizes.playerBar.height};
  background-color: ${({ theme }) => theme.colors.player.background};
  backdrop-filter: saturate(50%) blur(20px);
  color: ${({ theme }) => theme.colors.primary};
  z-index: 100;

  &:hover {
    ${BarWrapper} {
      height: 4px;
    }
    ${CircleContainer} {
      display: flex;
    }
    ${VolumeBarWrapper} {
      height: 4px;
    }
  }
`;

function PlayerBar({ showingPlayer, currentVideoId, getVideoInfo, loadingVideoInfo, videoInfo }) {
  useEffect(() => {
    if (currentVideoId) {
      getVideoInfo(currentVideoId);
    }
  }, [currentVideoId, getVideoInfo]);

  return (
    <Container showingPlayer={showingPlayer}>
      <ProgressBar />
      <PlayerLeftBox />
      {loadingVideoInfo && <Loader />}
      {!loadingVideoInfo && videoInfo && (
        <PlayerCenterBox
          thumbnailUrl={videoInfo.snippet.thumbnails.medium.url}
          title={videoInfo.snippet.title}
          artist={videoInfo.snippet.channelTitle}
          year={videoInfo.snippet.publishedAt.substring(0, 4)}
        />
      )}
      <PlayerRightBox />
    </Container>
  );
}

export default connect(
  ({ player }) => ({
    showingPlayer: player.showingPlayer,
    currentVideoId: player.currentVideoId,
    loadingVideoInfo: player.loading.VIDEO_INFO,
    videoInfo: player.videoInfo,
  }),
  {
    getVideoInfo,
  }
)(PlayerBar);
