import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  overflow-y: scroll;
`;

function Main({ children }) {
  return <Container>{children}</Container>;
}

export default Main;
