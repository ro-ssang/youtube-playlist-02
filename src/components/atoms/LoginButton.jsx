import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Google } from '../../assets/icons/google.svg';

const Container = styled.div`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.googleBtn.color};
  border-radius: 6px;
  font-size: 0.8125rem;
  cursor: pointer;
`;
const GoogleIcon = styled(Google)`
  margin-right: 0.625rem;
`;
const Text = styled.span``;

function LoginButton({ children, width }) {
  return (
    <Container width={width}>
      <GoogleIcon />
      <Text>{children}</Text>
    </Container>
  );
}

export default LoginButton;
