import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as AddList } from '../../assets/icons/addList.svg';
import { ReactComponent as Stop } from '../../assets/icons/stop.svg';
import { hideMenu } from '../../store/menu';

const Container = styled.ul`
  position: fixed;
  top: ${({ offsetTop }) => offsetTop + 'px'};
  left: ${({ offsetLeft }) => offsetLeft + 'px'};
  max-width: 350px;
  min-width: 185px;
  backdrop-filter: blur(70px) saturate(210%);
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: rgb(255 255 255 / 20%) 0px 0px 0px 1px inset, rgb(0 0 0 / 25%) 0px 8px 40px;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  transform: translate(-100%);
  z-index: 9991;
`;
const MenuItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0px 40px 0px 10px;
  height: 32px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: rgba(60, 60, 60, 0.7);
  }
`;
const StopIcon = styled(Stop)`
  position: absolute;
  right: 10px;
  fill: rgb(170, 170, 170);
  margin-left: 0.5rem;
  cursor: pointer;
`;
const AddListIcon = styled(AddList)`
  position: absolute;
  right: 10px;
  width: 18px;
  height: 18px;
  fill: rgb(170, 170, 170);
  margin-left: 0.5rem;
  cursor: pointer;
`;
const Backdrop = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 9990;
`;

function PlayItemMenu({ offsetTop, offsetLeft, hideMenu }) {
  const onClickBackdrop = useCallback(() => {
    hideMenu();
  }, [hideMenu]);

  return (
    <>
      <Container offsetTop={offsetTop} offsetLeft={offsetLeft}>
        <MenuItem>
          <span>재생목록에서 삭제</span>
          <StopIcon />
        </MenuItem>
        <MenuItem>
          <span>재생목록에 추가</span>
          <AddListIcon />
        </MenuItem>
      </Container>
      <Backdrop onClick={onClickBackdrop} />
    </>
  );
}

export default connect(
  ({ menu }) => ({
    offsetTop: menu.position.offsetTop,
    offsetLeft: menu.position.offsetLeft,
  }),
  {
    hideMenu,
  }
)(PlayItemMenu);
