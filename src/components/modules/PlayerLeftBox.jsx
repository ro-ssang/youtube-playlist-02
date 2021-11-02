import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Up } from '../../assets/icons/up.svg';
import { ReactComponent as Loop } from '../../assets/icons/loop.svg';
import { ReactComponent as Shuffle } from '../../assets/icons/shuffle.svg';
import { ReactComponent as Volume } from '../../assets/icons/volume.svg';

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
  width: 64.0625%;
`;
const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 64.0625%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(129, 129, 129);
  border-radius: 50%;
  user-select: none;
`;

function PlayerLeftBox() {
  return (
    <Container>
      <IconContainer>
        <UpIcon />
      </IconContainer>
      <IconContainer>
        <LoopIcon />
      </IconContainer>
      <IconContainer>
        <ShuffleIcon />
      </IconContainer>
      <IconContainer>
        <VolumeIcon />
      </IconContainer>
      <VolumeBar>
        <BarContainer>
          <BarWrapper>
            <GrayBar />
            <RedBar />
          </BarWrapper>
        </BarContainer>
        <Circle />
      </VolumeBar>
    </Container>
  );
}

export default PlayerLeftBox;
