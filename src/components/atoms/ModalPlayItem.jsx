import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin-bottom: 10px;
  padding: 10px 24px;
  width: 100%;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

function ModalPlayItem({ children, onClick }) {
  return <Container onClick={onClick}>{children}</Container>;
}

export default ModalPlayItem;
