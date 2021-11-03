import React, { useCallback } from 'react';
import { GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CLIENT_ID } from '../../contants';
import Avatar from '../atoms/Avatar';

const Username = styled.div`
  font-size: 0.8125rem;
`;
const LogoutLink = styled(Link)`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
`;

function LogoutBox({ avatarUrl, username, logoutPath, logout }) {
  const onSuccess = useCallback(() => {
    console.log('Logout made successfully');
    localStorage.clear();
    logout && logout();
  }, [logout]);

  return (
    <GoogleLogout
      clientId={CLIENT_ID}
      render={(renderProps) => (
        <>
          <Avatar avatarUrl={avatarUrl} />
          <div>
            <Username>{username}</Username>
            <LogoutLink to={logoutPath} onClick={renderProps.onClick} disabled={renderProps.disabled}>
              로그아웃
            </LogoutLink>
          </div>
        </>
      )}
      onLogoutSuccess={onSuccess}
    ></GoogleLogout>
  );
}

export default LogoutBox;
