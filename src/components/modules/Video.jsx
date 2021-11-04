import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme, isToggle }) => {
    return css`
      position: fixed;
      top: 0px;
      right: ${theme.sizes.scrollBar.width};
      display: ${isToggle ? 'flex' : 'none'};
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: stretch;
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
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  height: 100%;

  iframe {
    flex: 0 0 100%;
    height: 80%;
  }
`;

function loadVideo(videoId, setPlayer) {
  const player = new window.YT.Player('player', {
    height: '360',
    width: '640',
  });
  setTimeout(() => setPlayer(player), 1000);
}

function changeVideo(videoId, player) {
  player.loadVideoById(videoId);
}

function Video({ videoInfo, isToggle, readyPlayer, isReady, player, setPlayer }) {
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      window.onYouTubeIframeAPIReady = readyPlayer;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, [readyPlayer]);

  useEffect(() => {
    if (isReady && !player) {
      loadVideo(videoInfo.id, setPlayer);
    }
    if (player) {
      changeVideo(videoInfo.id, player);
    }
  }, [isReady, videoInfo, setPlayer, player]);

  return (
    <Container isToggle={isToggle}>
      <YoutubePlayer>
        <div id="player"></div>
      </YoutubePlayer>
    </Container>
  );
}

export default Video;
