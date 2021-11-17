import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme, showingVideoPlayer }) => {
    return css`
      position: fixed;
      top: 0px;
      right: ${theme.sizes.scrollBar.width};
      display: ${showingVideoPlayer ? 'flex' : 'none'};
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      width: ${`calc(100% - ${theme.sizes.sidebar.width} - ${theme.sizes.scrollBar.width})`};
      height: ${`calc(100vh - ${theme.sizes.playerBar.height})`};
      padding: 2.875rem 3.5rem 0px;
      background: rgb(10, 10, 10);
      transform: translate3d(0px, 0px, 0px);
      transition: transform 0.3s ease 0s;
      z-index: 10;
    `;
  }}
`;
const YoutubePlayer = styled.div`
  width: 100%;
  height: 70%;
  margin-bottom: 2.5rem;

  iframe {
    width: 100%;
    height: 100%;
  }
`;

function Video({ showingVideoPlayer }) {
  return (
    <Container showingVideoPlayer={showingVideoPlayer}>
      <YoutubePlayer>
        <div id="player"></div>
      </YoutubePlayer>
    </Container>
  );
}

export default connect(
  ({ player }) => ({
    showingVideoPlayer: player.showingVideoPlayer,
  }),
  {}
)(Video);
