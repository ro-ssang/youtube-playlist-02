import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 72px;
  padding: 0px 1.5625rem;
  border-top: 0.5px solid ${({ theme }) => theme.colors.divider};
  background: ${({ theme }) => theme.colors.sidebar.background.default};
`;

function AuthBox({ children }) {
  return <Container>{children}</Container>;
}

export default AuthBox;
