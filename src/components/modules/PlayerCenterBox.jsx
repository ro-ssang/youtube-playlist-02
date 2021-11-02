import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  min-width: 0px;
`;
const Wrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  min-width: 0px;
`;
const ThumbnailContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: rgb(66, 66, 66);
  border-radius: 2px;
  flex-shrink: 0;
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
`;
const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  min-width: 0px;
`;
const Title = styled(Link)`
  display: block;
  min-width: 0px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.8125rem;
`;
const Description = styled.div`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0px;
  font-size: 0.8125rem;
`;

function PlayerCenterBox({ thumbnailUrl, title, artist, year }) {
  return (
    <Container>
      <Wrapper>
        <ThumbnailContainer>
          <Thumbnail src={thumbnailUrl} alt="썸네일" />
        </ThumbnailContainer>
        <VideoInfo>
          <Title to="/">{title}</Title>
          <Description>
            <span>{artist}</span>
            <span> &bull; </span>
            <span>{year}</span>
          </Description>
        </VideoInfo>
      </Wrapper>
    </Container>
  );
}

export default PlayerCenterBox;
