import React from 'react';
import styled from 'styled-components';

const Container = styled.aside`
  display: grid;
  grid-template-rows: 50px auto 1fr auto;
  border-right: 1px solid ${({ theme }) => theme.colors.sidebar.border};
  background-color: ${({ theme }) => theme.colors.sidebar.background.default};
  max-width: 280px;
`;

function Aside({ children }) {
  return <Container>{children}</Container>;
}

export default Aside;
