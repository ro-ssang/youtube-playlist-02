import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1 1 0%;
`;
const Button = styled.button`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background: ${({ accent, theme }) => (accent ? theme.colors.red : 'none')};
  border: 1px solid ${({ accent, theme }) => (accent ? 'none' : theme.colors.primary)};
  border-radius: 2px;
  color: ${({ accent }) => accent && '#fff'};
  transition: color 0.5s ease 0s, background 1s ease 0s;
  cursor: pointer;
`;

function ActionButton({ children, accent }) {
  return (
    <Container>
      <Button accent={accent}>{children}</Button>
    </Container>
  );
}

export default ActionButton;
