import React, { useCallback } from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { ReactComponent as Google } from '../../assets/icons/google.svg';
import { CLIENT_ID, LS_PROFILE, LS_TOKEN } from '../../contants';

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

function LoginButton({ children, width, login }) {
  const onSuccess = useCallback(
    (res) => {
      console.log('[Login Success]', res);
      localStorage.setItem(LS_PROFILE, JSON.stringify(res.profileObj));
      localStorage.setItem(LS_TOKEN, res.accessToken);
      login && login();
    },
    [login]
  );

  const onFailure = useCallback((res) => {
    console.log('[Logout filed]');
  }, []);

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      render={(renderProps) => (
        <Container width={width} onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <GoogleIcon />
          <Text>{children}</Text>
        </Container>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
}

export default LoginButton;
