import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
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

function ModalButton({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}

export default ModalButton;
