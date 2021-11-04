import React from 'react';
import styled from 'styled-components';
import PlayerCenterBox from './PlayerCenterBox';
import PlayerLeftBox, { BarWrapper as VolumeBarWrapper } from './PlayerLeftBox';
import PlayerRightBox from './PlayerRightBox';
import ProgressBar, { BarWrapper, CircleContainer } from './ProgressBar';

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  right: 0px;
  display: flex;
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

function PlayerBar({
  videoInfo,
  togglePlayer,
  player,
  playing,
  playPlayer,
  puasePlayer,
  drag,
  dragVolume,
  volume,
  setVolume,
  mute,
  setMute,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  dragProgress,
  dragProgressBar,
  progress,
  setProgress,
}) {
  return (
    <Container>
      <ProgressBar
        player={player}
        duration={duration}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        dragProgress={dragProgress}
        dragProgressBar={dragProgressBar}
        progress={progress}
        setProgress={setProgress}
      />
      <PlayerLeftBox
        player={player}
        togglePlayer={togglePlayer}
        drag={drag}
        dragVolume={dragVolume}
        volume={volume}
        setVolume={setVolume}
        mute={mute}
        setMute={setMute}
      />
      {videoInfo && (
        <PlayerCenterBox
          thumbnailUrl={videoInfo.thumbnail}
          title={videoInfo.title}
          artist={videoInfo.channelTitle}
          year={videoInfo.publishedAt.substring(0, 4)}
        />
      )}
      <PlayerRightBox
        player={player}
        videoInfo={videoInfo}
        playing={playing}
        playPlayer={playPlayer}
        puasePlayer={puasePlayer}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        duration={duration}
        setDuration={setDuration}
      />
    </Container>
  );
}

export default PlayerBar;
