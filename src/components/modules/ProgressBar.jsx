import React from 'react';
import styled from 'styled-components';

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
  width: 35.9266%;
`;
export const CircleContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 35.9266%;
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

function ProgressBar() {
  return (
    <Container>
      <BarContainer>
        <BarWrapper>
          <GrayBar />
          <RedBar />
        </BarWrapper>
      </BarContainer>
      <CircleContainer>
        <Circle />
      </CircleContainer>
    </Container>
  );
}

export default ProgressBar;
