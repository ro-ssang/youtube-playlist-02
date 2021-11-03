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
  /* display: flex; */
  display: none;
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

function PlayerBar() {
  return (
    <Container>
      <ProgressBar />
      <PlayerLeftBox />
      <PlayerCenterBox
        thumbnailUrl="https://i.ytimg.com/vi/Kevp2lFKSOg/mqdefault.jpg"
        title="strawberry moon (strawberry moon)"
        artist="IU - Topic"
        year="2021"
      />
      <PlayerRightBox />
    </Container>
  );
}

export default PlayerBar;
