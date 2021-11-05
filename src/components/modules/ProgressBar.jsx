import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH } from '../../contants';

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  transform: translateY(-50%);
  cursor: pointer;
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
  background-color: rgb(255, 0, 0);
  width: ${({ progress }) => progress + '%'};
`;
export const CircleContainer = styled.div`
  position: absolute;
  top: 0px;
  left: ${({ progress }) => progress + '%'};
  display: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 34px;
  height: 100%;
  transform: translateX(-50%);
`;
const Circle = styled.div`
  width: 14px;
  height: 14px;
  background: rgb(255, 0, 0);
  border-radius: 50%;
`;

function calculatePercent(clientX, width, offsetLeft, progress) {
  let percent = progress || ((clientX - offsetLeft - SIDE_BAR_WIDTH) / width) * 100;

  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;

  return percent;
}

function ProgressBar({
  player,
  duration,
  currentTime,
  setCurrentTime,
  dragProgress,
  dragProgressBar,
  progress,
  setProgress,
}) {
  const progressBarCont = useRef();

  const onMouseDownProgress = useCallback(
    (event) => {
      const clientX = event.clientX;
      const width = progressBarCont.current.clientWidth;
      const offsetLeft = progressBarCont.current.offsetLeft;
      dragProgressBar(true);
      const percent = calculatePercent(clientX, width, offsetLeft);
      setProgress(percent);
      if (player) {
        const seconds = (duration * percent) / 100;
        setCurrentTime(seconds);
        player.seekTo(seconds);
      }
    },
    [player, duration, setCurrentTime, dragProgressBar, setProgress]
  );

  const onMouseMove = useCallback(
    (event) => {
      if (dragProgress) {
        const clientX = event.clientX;
        const width = progressBarCont.current.clientWidth;
        const offsetLeft = progressBarCont.current.offsetLeft;
        const percent = calculatePercent(clientX, width, offsetLeft);
        setProgress(percent);
        if (player) {
          const seconds = (duration * percent) / 100;
          setCurrentTime(seconds);
          player.seekTo(seconds);
        }
      }
    },
    [player, duration, setCurrentTime, dragProgress, setProgress]
  );

  const onMouseUp = useCallback(() => {
    dragProgressBar(false);
  }, [dragProgressBar]);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseUp, onMouseMove]);

  useEffect(() => {
    const percent = (currentTime / duration) * 100;
    setProgress(percent);
  }, [currentTime, duration, setProgress]);

  return (
    <Container ref={progressBarCont} onMouseDown={onMouseDownProgress}>
      <BarContainer>
        <BarWrapper>
          <GrayBar />
          <RedBar progress={progress} />
        </BarWrapper>
      </BarContainer>
      <CircleContainer progress={progress}>
        <Circle />
      </CircleContainer>
    </Container>
  );
}

export default ProgressBar;
