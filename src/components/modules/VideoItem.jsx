import React from 'react';
import styled from 'styled-components';
import VideoRank from '../atoms/VideoRank';
import VideoTitle from '../atoms/VideoTitle';
import { ReactComponent as AddListIcon } from '../../assets/icons/addList.svg';

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

function VideoItem() {
  return (
    <Container>
      <ThumbnailContainer>
        <Thumbnail src="https://i.ytimg.com/vi/Kevp2lFKSOg/mqdefault.jpg" alt="strawberry moon (strawberry moon)" />
      </ThumbnailContainer>
      <VideoDescriptionContainer>
        <VideoRank>1</VideoRank>
        <VideoTitle>strawberry moon (strawberry moon)</VideoTitle>
        <AddListIcon />
      </VideoDescriptionContainer>
    </Container>
  );
}

export default VideoItem;
