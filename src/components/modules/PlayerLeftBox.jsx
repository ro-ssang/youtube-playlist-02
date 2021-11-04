import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as Up } from '../../assets/icons/up.svg';
import { ReactComponent as Loop } from '../../assets/icons/loop.svg';
import { ReactComponent as Mute } from '../../assets/icons/mute.svg';
import { ReactComponent as Shuffle } from '../../assets/icons/shuffle.svg';
import { ReactComponent as Volume } from '../../assets/icons/volume.svg';
import { LS_VOLUME, SIDE_BAR_WIDTH } from '../../contants';

const Container = styled.div`
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
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
const UpIcon = styled(Up)`
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transform: rotate(180deg);
  transition: transform 0.3s ease 0s;
`;
const LoopIcon = styled(Loop)`
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const ShuffleIcon = styled(Shuffle)`
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const MuteIcon = styled(Mute)`
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const VolumeIcon = styled(Volume)`
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const VolumeBar = styled.div`
  position: relative;
  width: 64px;
  cursor: pointer;
  user-select: none;
`;
const BarContainer = styled.div`
  padding: 1rem 0px;
`;
export const BarWrapper = styled.div`
  position: relative;
  height: 2px;
`;
const GrayBar = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgb(144, 144, 144);
  cursor: pointer;
`;
const RedBar = styled.div`
  position: absolute;
  top: 0px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.red};
  width: ${({ volume }) => volume + '%'};
`;
const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ volume }) => volume + '%'};
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(129, 129, 129);
  border-radius: 50%;
  user-select: none;
`;

function calculateVolume(offsetLeft, clientWidth, clientX, vol) {
  let percent;

  if (vol) {
    percent = vol;
  } else {
    percent = ((clientX - offsetLeft - SIDE_BAR_WIDTH) / clientWidth) * 100;
  }

  if (percent < 0) {
    percent = 0;
  }
  if (percent > 100) {
    percent = 100;
  }

  return percent;
}

function PlayerLeftBox({ player, togglePlayer, drag, dragVolume, volume, setVolume, mute, setMute }) {
  const volumeCont = useRef();

  const onToggle = useCallback(() => {
    togglePlayer();
  }, [togglePlayer]);

  const onMute = useCallback(() => {
    if (player) {
      if (player.isMuted()) {
        player.unMute();
        setMute(false);
        setVolume(localStorage.getItem(LS_VOLUME));
      } else {
        player.mute();
        setMute(true);
        setVolume(0);
      }
    }
  }, [player, setMute, setVolume]);

  const clickVolumeBar = useCallback(
    (event) => {
      const offsetLeft = volumeCont.current.offsetLeft;
      const clientWidth = volumeCont.current.clientWidth;
      const clientX = event.clientX;
      dragVolume(true);
      const percent = calculateVolume(offsetLeft, clientWidth, clientX);
      setVolume(percent);
      player.setVolume(percent);
      localStorage.setItem(LS_VOLUME, percent);
    },
    [dragVolume, setVolume, player]
  );

  const pullVolumeBar = useCallback(() => {
    dragVolume(false);
  }, [dragVolume]);

  const dragMouse = useCallback(
    (event) => {
      if (drag) {
        const offsetLeft = volumeCont.current.offsetLeft;
        const clientWidth = volumeCont.current.clientWidth;
        const clientX = event.clientX;
        const percent = calculateVolume(offsetLeft, clientWidth, clientX);
        if (percent > 0 && mute) {
          player.unMute();
          setMute(false);
        }
        setVolume(percent);
        player.setVolume(percent);
        localStorage.setItem(LS_VOLUME, percent);
      }
    },
    [drag, setVolume, player, mute, setMute]
  );

  useEffect(() => {
    document.addEventListener('mouseup', pullVolumeBar);
    document.addEventListener('mousemove', dragMouse);
    return () => {
      document.removeEventListener('mouseup', pullVolumeBar);
      document.removeEventListener('mousemove', dragMouse);
    };
  }, [pullVolumeBar, dragMouse]);

  useEffect(() => {
    localStorage.setItem(LS_VOLUME, 50);
    if (player) {
      player.setVolume(50);
    }
  }, [player]);

  return (
    <Container>
      <IconContainer onClick={onToggle}>
        <UpIcon />
      </IconContainer>
      <IconContainer>
        <LoopIcon />
      </IconContainer>
      <IconContainer>
        <ShuffleIcon />
      </IconContainer>
      <IconContainer onClick={onMute}>{volume !== 0 && !mute ? <VolumeIcon /> : <MuteIcon />}</IconContainer>
      <VolumeBar ref={volumeCont} onMouseDown={clickVolumeBar}>
        <BarContainer>
          <BarWrapper>
            <GrayBar />
            <RedBar volume={volume} />
          </BarWrapper>
        </BarContainer>
        <Circle volume={volume} />
      </VolumeBar>
    </Container>
  );
}

export default PlayerLeftBox;
