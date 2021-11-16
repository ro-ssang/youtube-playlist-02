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
const Backdrop = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 101;
`;

function Modal({ children, closeModal }) {
  return (
    <>
      <Container>{children}</Container>
      <Backdrop onClick={closeModal} />
    </>
  );
}

export default Modal;
