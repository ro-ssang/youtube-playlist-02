import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Google } from '../../assets/icons/google.svg';
import { CLIENT_ID, LS_PROFILE, LS_TOKEN } from '../../contants';
import { login } from '../../store/auth';

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

function LoginButton({ width, login }) {
  const buttonRef = useRef();

  useEffect(() => {
    window.gapi.load('auth2', function () {
      const googleAuth = window.gapi.auth2.init({
        client_id: '478590049856-de58rj0tomsahk0tpvq925st7jahf2tk.apps.googleusercontent.com',
      });

      googleAuth.attachClickHandler(
        buttonRef.current,
        {
          scope: 'profile',
        },
        (e) => {
          const basicProfile = e.getBasicProfile();
          const displayName = basicProfile.getName();
          const photoURL = basicProfile.getImageUrl();
          const access_token = e.getAuthResponse().access_token;

          localStorage.setItem(LS_PROFILE, JSON.stringify({ name: displayName, imageUrl: photoURL }));
          localStorage.setItem(LS_TOKEN, access_token);
          login && login();
        }
      );
    });
  }, [login]);

  return (
    <Container width={width} ref={buttonRef}>
      <GoogleIcon />
      <Text>Sign in With Google</Text>
    </Container>
  );
}

export default connect(() => ({}), {
  login,
})(LoginButton);
