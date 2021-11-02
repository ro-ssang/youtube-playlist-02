import React from 'react';
import styled, { css } from 'styled-components';
import ActionButton from '../atoms/ActionButton';
import PlayListData from '../atoms/PlayListData';
import { ReactComponent as Pen } from '../../assets/icons/pen.svg';
import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { ReactComponent as TrashCan } from '../../assets/icons/trash-can.svg';

const Container = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
`;
const Thumbnail = styled.img`
  max-width: 270px;
  width: 100%;
  height: 270px;
  object-fit: cover;
  box-shadow: 0 10px 20px 0 ${({ theme }) => theme.colors.playlist.shadow};
  border-radius: 6px;
`;
const MetaContainer = styled.div`
  max-width: 400px;
  margin-top: 50px;
  margin-left: 2.125rem;
  flex: 1 1 0%;
  font-size: 0.8125rem;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.primary};
`;
const Title = styled.h2`
  margin-top: auto;
  margin-bottom: 1rem;
  font-size: 1.625rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;
const ActionContainer = styled.div`
  ${({ count }) => {
    return Number(count) > 1
      ? css`
          display: flex;
          margin-top: 20px;
          gap: 0px 20px;
          font-size: 14px;
        `
      : css`
          margin-top: 2rem;
        `;
  }}
`;
const TrashCanIcon = styled(TrashCan)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;
const PenIcon = styled(Pen)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;
const PlayIcon = styled(Play)`
  fill: rgb(255, 255, 255);
  width: 24px;
  height: 24px;
  margin-right: 0.25rem;
`;

function PlayItemInfo() {
  return (
    <Container>
      <Thumbnail src="https://i.ytimg.com/vi/FtzvusgwigU/mqdefault.jpg" alt="썸네일" />
      <MetaContainer>
        <Title>요리</Title>
        <PlayListData left="재생목록" right="유저이름" />
        <PlayListData left="노래 4곡" right="15분" marginTop="0.25rem" marginBottom="1rem" />
        <ActionContainer count="2">
          <ActionButton>
            <TrashCanIcon />
            재생목록 삭제
          </ActionButton>
          <ActionButton>
            <PenIcon />
            재생목록 수정
          </ActionButton>
        </ActionContainer>
        <ActionContainer count="1">
          <ActionButton accent={true}>
            <PlayIcon />
            재생
          </ActionButton>
        </ActionContainer>
      </MetaContainer>
    </Container>
  );
}

export default PlayItemInfo;
