import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Ellipsis } from '../../assets/icons/ellipsis.svg';
import { ReactComponent as Play } from '../../assets/icons/play.svg';

const IconContainer = styled.div`
  position: absolute;
  top: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  opacity: 0;
`;
const PlayIcon = styled(Play)`
  width: 24px;
  height: 24px;
  fill: rgb(255, 255, 255);
`;
const Container = styled.tr`
  height: 54px;
  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.musicItem.background.even};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.tracklist.background.hover};
    ${IconContainer} {
      opacity: 1;
    }
  }
`;
const Song = styled.td`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding-left: 0.375rem;
  height: 54px;
`;
const ThumbnailContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 1.25rem;
  cursor: pointer;
`;
const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 3px;
`;
const TitleContainer = styled.div`
  min-width: 0px;
`;
const Title = styled.h3`
  font-size: 13px;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.primary};
  padding-right: 10px;
`;
const Album = styled.td``;
const Artist = styled.td``;
const Time = styled.td`
  border-radius: 0px 5px 5px 0px;
  padding-right: 18px;
`;
const TimeInner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const EllipsisIcon = styled(Ellipsis)`
  width: 14px;
  height: 14px;
  fill: rgb(250, 88, 106);
  margin-left: 16px;
  cursor: pointer;
`;

function Tr({ thumbnailUrl, title, artist, time }) {
  return (
    <Container>
      <Song>
        <ThumbnailContainer>
          <Thumbnail src={thumbnailUrl} alt="썸네일" />
          <IconContainer>
            <PlayIcon />
          </IconContainer>
        </ThumbnailContainer>
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
      </Song>
      <Album></Album>
      <Artist>{artist}</Artist>
      <Time>
        <TimeInner>
          {time}
          <EllipsisIcon />
        </TimeInner>
      </Time>
    </Container>
  );
}

export default Tr;
