import React, { useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Ellipsis } from '../../assets/icons/ellipsis.svg';
import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { showMenu, setPosition } from '../../store/menu';
import { selectVideo } from '../../store/videos';

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

function Tr({ id, resourceId, thumbnailUrl, title, artist, time, onPlay, showMenu, setPosition, selectVideo }) {
  const trRef = useRef();

  const onShowMenu = useCallback(() => {
    const tableElem = trRef.current.closest('table');
    const trElem = trRef.current;

    const tableOffsetTop = tableElem.offsetTop;
    const tableOffsetLeft = tableElem.offsetLeft;
    const tableOffsetWidth = tableElem.offsetWidth;

    const trOffsetTop = trElem.offsetTop;
    const trClientHeight = trElem.clientHeight;

    const offsetTop = tableOffsetTop + trOffsetTop + trClientHeight * (2 / 3);
    const offsetLeft = tableOffsetLeft + tableOffsetWidth - 35;

    setPosition(offsetTop, offsetLeft);
    selectVideo(id, resourceId);
    showMenu();
  }, [showMenu, setPosition, selectVideo, id, resourceId]);

  return (
    <Container ref={trRef}>
      <Song>
        <ThumbnailContainer onClick={onPlay}>
          <Thumbnail src={thumbnailUrl} alt="?????????" />
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
          <EllipsisIcon onClick={onShowMenu} />
        </TimeInner>
      </Time>
    </Container>
  );
}

export default connect(() => ({}), {
  showMenu,
  setPosition,
  selectVideo,
})(Tr);
