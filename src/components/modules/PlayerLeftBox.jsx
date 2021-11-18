import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as Up } from '../../assets/icons/up.svg';
import { ReactComponent as Loop } from '../../assets/icons/loop.svg';
import { ReactComponent as Repeat } from '../../assets/icons/repeat.svg';
import { ReactComponent as Shuffle } from '../../assets/icons/shuffle.svg';
import { ReactComponent as Volume } from '../../assets/icons/volume.svg';
import { ReactComponent as Mute } from '../../assets/icons/mute.svg';
import VolumeBar from './VolumeBar';
import { connect } from 'react-redux';
import {
  setMute,
  setVolumePercent,
  toggleVideoPlayer,
  setLooping,
  setPrevPlaylist,
  setPrevIndex,
  setPrevStartSeconds,
  setShuffle,
} from '../../store/player';

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
  transform: ${({ showing }) => (showing === 'false' ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: transform 0.3s ease 0s;
`;
const LoopIcon = styled(Loop)`
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const RepeatIcon = styled(Repeat)`
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
const VolumeIcon = styled(Volume)`
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

function PlayerLeftBox({
  player,
  isMute,
  setMute,
  volumePercent,
  setVolumePercent,
  toggleVideoPlayer,
  showingVideoPlayer,
  videoInfo,
  isLoop,
  setLooping,
  prevPlaylist,
  setPrevPlaylist,
  prevIndex,
  setPrevIndex,
  setPrevStartSeconds,
  isShuffle,
  setShuffle,
}) {
  const onClickVolume = useCallback(() => {
    if (player) {
      if (isMute) {
        player.unMute();
        setMute(false);
        setVolumePercent(player.getVolume());
      } else {
        player.mute();
        setMute(true);
        setVolumePercent(0);
      }
    }
  }, [player, isMute, setMute, setVolumePercent]);

  const onClickLoop = useCallback(() => {
    if (player) {
      setPrevPlaylist(player.getPlaylist());
      setPrevStartSeconds(player.getCurrentTime());

      if (isLoop) {
        setPrevIndex(0);
        player.cuePlaylist(prevPlaylist, prevIndex);
        setTimeout(() => {
          player.cuePlaylist(prevPlaylist, prevIndex);
          player.setLoop(false);
          setLooping(false);
        }, 500);
      } else {
        setPrevIndex(player.getPlaylistIndex());
        player.cuePlaylist(videoInfo.id, 0);
        setTimeout(() => {
          player.cuePlaylist(videoInfo.id, 0);
          player.setLoop(true);
          setLooping(true);
        }, 500);
      }
    }
  }, [
    player,
    videoInfo,
    isLoop,
    setLooping,
    prevPlaylist,
    setPrevPlaylist,
    prevIndex,
    setPrevIndex,
    setPrevStartSeconds,
  ]);

  const onClickShuffle = useCallback(() => {
    if (player) {
      if (isShuffle) {
        setShuffle(false);
        player.setShuffle(false);
      } else {
        setShuffle(true);
        player.setShuffle(true);
      }
    }
  }, [player, isShuffle, setShuffle]);

  return (
    <Container>
      <IconContainer>
        <UpIcon onClick={toggleVideoPlayer} showing={showingVideoPlayer.toString()} />
      </IconContainer>
      <IconContainer onClick={onClickLoop}>{isLoop ? <RepeatIcon /> : <LoopIcon />}</IconContainer>
      <IconContainer>
        <ShuffleIcon onClick={onClickShuffle} />
      </IconContainer>
      <IconContainer>
        {isMute || !volumePercent ? <MuteIcon onClick={onClickVolume} /> : <VolumeIcon onClick={onClickVolume} />}
      </IconContainer>
      <VolumeBar />
    </Container>
  );
}

export default connect(
  ({ player }) => ({
    player: player.player,
    isMute: player.isMute,
    volumePercent: player.volumePercent,
    showingVideoPlayer: player.showingVideoPlayer,
    videoInfo: player.videoInfo,
    isLoop: player.isLoop,
    isShuffle: player.isShuffle,
    prevPlaylist: player.prevPlaylist,
    prevIndex: player.prevIndex,
  }),
  {
    setMute,
    setVolumePercent,
    toggleVideoPlayer,
    setLooping,
    setPrevPlaylist,
    setPrevIndex,
    setPrevStartSeconds,
    setShuffle,
  }
)(PlayerLeftBox);
