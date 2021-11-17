import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { calculatePercent } from '../../lib/calculatePercent';
import { setProgressDrag, setProgressPercent, setCurrentTime } from '../../store/player';

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
const RedBar = styled.div.attrs(({ width }) => ({
  style: {
    width: width + '%',
  },
}))`
  position: absolute;
  top: 0px;
  height: 100%;
  background-color: rgb(255, 0, 0);
`;
// const RedBar = styled.div`
//   position: absolute;
//   top: 0px;
//   height: 100%;
//   background-color: rgb(255, 0, 0);
//   width: ${({ width }) => width + '%'};
// `;
export const CircleContainer = styled.div.attrs(({ left }) => ({
  style: {
    left: left + '%',
  },
}))`
  position: absolute;
  top: 0px;
  display: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 34px;
  height: 100%;
  transform: translateX(-50%);
`;
// export const CircleContainer = styled.div`
//   position: absolute;
//   top: 0px;
//   left: ${({ left }) => left + '%'};
//   display: none;
//   -webkit-box-align: center;
//   align-items: center;
//   -webkit-box-pack: center;
//   justify-content: center;
//   width: 34px;
//   height: 100%;
//   transform: translateX(-50%);
// `;
const Circle = styled.div`
  width: 14px;
  height: 14px;
  background: rgb(255, 0, 0);
  border-radius: 50%;
`;

function ProgressBar({
  player,
  playing,
  currentTime,
  duration,
  progressDrag,
  setProgressDrag,
  progressPercent,
  setProgressPercent,
  setCurrentTime,
}) {
  const contRef = useRef();

  const onMouseDown = useCallback(
    (evt) => {
      setProgressDrag(true);

      if (player && playing) {
        player.pauseVideo();
      }

      if (player && duration) {
        const result = calculatePercent(evt.clientX, contRef.current);
        const seekSeconds = (duration * result) / 100;

        setProgressPercent(result);
        setCurrentTime(seekSeconds);
        player.seekTo(seekSeconds);
      }
    },
    [player, playing, duration, setProgressDrag, setProgressPercent, setCurrentTime]
  );

  const onMouseUp = useCallback(() => {
    if (player && !playing) {
      player.playVideo();
    }

    setProgressDrag(false);
  }, [player, playing, setProgressDrag]);

  const onMouseMove = useCallback(
    (evt) => {
      if (progressDrag && player && duration) {
        const result = calculatePercent(evt.clientX, contRef.current);
        const seekSeconds = (duration * result) / 100;

        setProgressPercent(result);
        setCurrentTime(seekSeconds);
        player.seekTo(seekSeconds);
      }
    },
    [player, duration, progressDrag, setProgressPercent, setCurrentTime]
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseMove);
    };
  }, [onMouseMove, onMouseUp]);

  useEffect(() => {
    if (currentTime && duration) {
      const percent = (currentTime / duration) * 100;
      setProgressPercent(percent);
    }
  }, [currentTime, duration, setProgressPercent]);

  return (
    <Container ref={contRef} onMouseDown={onMouseDown}>
      <BarContainer>
        <BarWrapper>
          <GrayBar />
          <RedBar width={progressPercent} />
        </BarWrapper>
      </BarContainer>
      <CircleContainer left={progressPercent}>
        <Circle />
      </CircleContainer>
    </Container>
  );
}

export default connect(
  ({ player }) => ({
    player: player.player,
    playing: player.playing,
    currentTime: player.currentTime,
    duration: player.duration,
    progressDrag: player.progressDrag,
    progressPercent: player.progressPercent,
  }),
  {
    setProgressDrag,
    setProgressPercent,
    setCurrentTime,
  }
)(ProgressBar);
