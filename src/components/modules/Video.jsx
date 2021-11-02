import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme }) => {
    return css`
      position: fixed;
      top: 0px;
      right: ${theme.sizes.scrollBar.width};
      display: flex;
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
  height: 100%;
  margin-bottom: 2.5rem;
`;

function Video() {
  return (
    <Container>
      <YoutubePlayer />
    </Container>
  );
}

export default Video;
