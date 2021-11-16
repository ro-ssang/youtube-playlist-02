import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 20px;
  padding: 24px 24px 0px;
`;
const Title = styled.h2`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
`;

function ModalTitle({ children }) {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  );
}

export default ModalTitle;
