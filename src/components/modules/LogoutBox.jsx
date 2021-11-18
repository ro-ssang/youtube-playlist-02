import React, { useCallback, useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CLIENT_ID, LS_PROFILE } from '../../contants';
import Avatar from '../atoms/Avatar';
import { logout } from '../../store/auth';
import { setProfile } from '../../store/user';
import { showPlayer, setPlayer } from '../../store/player';

const Username = styled.div`
  font-size: 0.8125rem;
`;
const LogoutLink = styled(Link)`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
`;

function LogoutBox({ profile, setProfile, logout, showPlayer, setPlayer }) {
  useEffect(() => {
    const { name, imageUrl } = JSON.parse(localStorage.getItem(LS_PROFILE));
    setProfile(name, imageUrl);
  }, [setProfile]);

  const onSuccess = useCallback(() => {
    console.log('Logout made successfully');
    localStorage.clear();
    logout && logout();
    setProfile(null);
    setPlayer(null);
    showPlayer(false);
  }, [logout, setProfile, showPlayer, setPlayer]);

  return (
    <GoogleLogout
      clientId={CLIENT_ID}
      render={(renderProps) => (
        <>
          <Avatar avatarUrl={profile.avatarUrl} />
          <div>
            <Username>{profile.name}</Username>
            <LogoutLink to="/" onClick={renderProps.onClick} disabled={renderProps.disabled}>
              로그아웃
            </LogoutLink>
          </div>
        </>
      )}
      onLogoutSuccess={onSuccess}
    ></GoogleLogout>
  );
}

export default connect(
  ({ user }) => ({
    profile: user.profile,
  }),
  {
    logout,
    setProfile,
    setPlayer,
    showPlayer,
  }
)(LogoutBox);
