import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as Pause } from '../../assets/icons/pause.svg';
import { ReactComponent as Prev } from '../../assets/icons/prev.svg';
import { ReactComponent as Play } from '../../assets/icons/play.svg';
import { ReactComponent as Next } from '../../assets/icons/next.svg';

const Container = styled.div`
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
`;
const TimeLapse = styled.span`
  font-size: 0.75rem;
  color: rgb(170, 170, 170);
`;
const IconContainer = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 0px 0.5rem 0px 0px;
  fill: ${({ theme }) => theme.colors.theme.default};
`;
const PauseIcon = styled(Pause)`
  display: block;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
const PrevIcon = styled(Prev)`
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const PlayIcon = styled(Play)`
  display: block;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
const NextIcon = styled(Next)`
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

function PlayerRightBox({ player, playing, playPlayer, puasePlayer }) {
  const onTogglePlay = useCallback(() => {
    if (playing) {
      player.pauseVideo();
      puasePlayer();
    } else {
      player.playVideo();
      playPlayer();
    }
  }, [player, playing, playPlayer, puasePlayer]);

  return (
    <Container>
      <TimeLapse>0:00 / 3:25</TimeLapse>
      <IconContainer>
        <PrevIcon />
      </IconContainer>
      <IconContainer onClick={onTogglePlay}>{playing ? <PauseIcon /> : <PlayIcon />}</IconContainer>
      <IconContainer>
        <NextIcon />
      </IconContainer>
    </Container>
  );
}

export default PlayerRightBox;
