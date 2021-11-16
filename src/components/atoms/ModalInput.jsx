import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
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
const Label = styled.label`
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
const Input = styled.input`
  width: 100%;
  background: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 22.4px;
`;

function ModalInput({ name, onChange, value, label }) {
  return (
    <Container>
      <Label htmlFor={name} name={name} autocomplete="off">
        {label}
      </Label>
      <Input id={name} onChange={onChange} value={value} />
    </Container>
  );
}

export default ModalInput;
