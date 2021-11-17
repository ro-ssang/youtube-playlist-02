import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { calculatePercent } from '../../lib/calculatePercent';
import { setVolumeDrag, setVolumePercent, setMute } from '../../store/player';

const Container = styled.div`
  position: relative;
  width: 64px;
  cursor: pointer;
  user-select: none;
`;
const BarContainer = styled.div`
  padding: 0.5rem 0px;
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
  background-color: ${({ theme }) => theme.colors.red};
`;
const Circle = styled.div.attrs(({ left }) => ({
  style: {
    left: left + '%',
  },
}))`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(129, 129, 129);
  border-radius: 50%;
  user-select: none;
`;

function VolumeBar({ player, volumeDrag, setVolumeDrag, volumePercent, setVolumePercent, setMute }) {
  const volumeBarRef = useRef();

  const onMouseDown = useCallback(
    (evt) => {
      setVolumeDrag(true);

      const result = calculatePercent(evt.clientX, volumeBarRef.current);

      if (player) {
        player.unMute();
        player.setVolume(result);
        setMute(false);
        setVolumePercent(result);
      }
    },
    [player, setVolumeDrag, setVolumePercent, setMute]
  );

  const onMouseUp = useCallback(() => {
    setVolumeDrag(false);
  }, [setVolumeDrag]);

  const onMouseMove = useCallback(
    (evt) => {
      if (volumeDrag) {
        const result = calculatePercent(evt.clientX, volumeBarRef.current);

        if (player) {
          player.unMute();
          player.setVolume(result);
          setMute(false);
          setVolumePercent(result);
        }
      }
    },
    [player, volumeDrag, setVolumePercent, setMute]
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseMove);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <Container ref={volumeBarRef} onMouseDown={onMouseDown}>
      <BarContainer>
        <BarWrapper>
          <GrayBar />
          <RedBar width={volumePercent} />
        </BarWrapper>
      </BarContainer>
      <Circle left={volumePercent} />
    </Container>
  );
}

export default connect(
  ({ player }) => ({
    player: player.player,
    volumeDrag: player.volumeDrag,
    volumePercent: player.volumePercent,
  }),
  {
    setVolumeDrag,
    setVolumePercent,
    setMute,
  }
)(VolumeBar);
