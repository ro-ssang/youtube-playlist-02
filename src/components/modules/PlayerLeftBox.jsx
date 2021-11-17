import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as Up } from '../../assets/icons/up.svg';
import { ReactComponent as Loop } from '../../assets/icons/loop.svg';
import { ReactComponent as Shuffle } from '../../assets/icons/shuffle.svg';
import { ReactComponent as Volume } from '../../assets/icons/volume.svg';
import { ReactComponent as Mute } from '../../assets/icons/mute.svg';
import VolumeBar from './VolumeBar';
import { connect } from 'react-redux';
import { setMute, setVolumePercent, toggleVideoPlayer } from '../../store/player';

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

  return (
    <Container>
      <IconContainer>
        <UpIcon onClick={toggleVideoPlayer} showing={showingVideoPlayer.toString()} />
      </IconContainer>
      <IconContainer>
        <LoopIcon />
      </IconContainer>
      <IconContainer>
        <ShuffleIcon />
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
  }),
  {
    setMute,
    setVolumePercent,
    toggleVideoPlayer,
  }
)(PlayerLeftBox);
