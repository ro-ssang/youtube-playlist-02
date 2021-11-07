import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 680px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgb(33, 33, 33);
  transform: translate(-50%, -50%);
  font-family: Roboto, sans-serif;
  z-index: 102;
`;
const ModalTitleCont = styled.div`
  margin-bottom: 20px;
  padding: 24px 24px 0px;
`;
const ModalTitle = styled.h2`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
`;
const ModalBodyCont = styled.div`
  padding: 32px 24px;
`;
const ModalInputCont = styled.div`
  position: relative;
  margin-bottom: 40px;
  padding-bottom: 2px;
  background: none;
  width: 100%;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.7);
  }
`;
const ModalInputLabel = styled.label`
  position: absolute;
  top: 0px;
  left: 0px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: lighter;
  font-size: 16px;
  transition: all 0.25s ease 0s;
  transform-origin: left top;
  transform: translateY(-75%) scale(0.75);
  padding-bottom: 8px;
`;
const ModalInput = styled.input`
  width: 100%;
  background: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 22.4px;
`;
const ModalButtonCont = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding: 16px 0px 16px 24px;
`;
const ModalButton = styled.button`
  width: 75px;
  height: 36px;
  cursor: pointer;
  background: rgb(255, 255, 255);
  border-radius: 2px;
  color: rgb(0, 0, 0);

  &:last-child {
    margin-left: 5px;
  }
`;
const Backdrop = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 101;
`;

function AddPlaylistModal() {
  return (
    <>
      <Container>
        <ModalTitleCont>
          <ModalTitle>새 재생목록</ModalTitle>
        </ModalTitleCont>
        <ModalBodyCont>
          <ModalInputCont>
            <ModalInputLabel htmlFor="title" name="title" autocomplete="off">
              제목
            </ModalInputLabel>
            <ModalInput id="title" />
          </ModalInputCont>
          <ModalInputCont>
            <ModalInputLabel htmlFor="description" name="description" autocomplete="off">
              설명
            </ModalInputLabel>
            <ModalInput id="description" />
          </ModalInputCont>
          <ModalButtonCont>
            <ModalButton>취소</ModalButton>
            <ModalButton>확인</ModalButton>
          </ModalButtonCont>
        </ModalBodyCont>
      </Container>
      <Backdrop />
    </>
  );
}

export default AddPlaylistModal;
