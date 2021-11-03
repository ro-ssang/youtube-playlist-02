import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoginPlayList from '../templates/LoginPlayList';
import { logout } from '../../store/auth';
import { setProfile, getPlaylists, getPlayItems } from '../../store/user';
import { withRouter } from 'react-router';

function PlayList({
  loadingPlaylists,
  loadingPlayItems,
  playlists,
  getPlaylists,
  profile,
  setProfile,
  playItems,
  getPlayItems,
  logout,
  match,
}) {
  useEffect(() => {
    getPlaylists();
  }, [getPlaylists]);

  useEffect(() => {
    const {
      params: { playlistId },
    } = match;
    getPlayItems(playlistId);
  }, [getPlayItems, match]);

  return (
    <LoginPlayList
      loadingPlaylists={loadingPlaylists}
      loadingPlayItems={loadingPlayItems}
      playlists={playlists}
      playItems={playItems}
      profile={profile}
      setProfile={setProfile}
      logout={logout}
    />
  );
}

export default connect(
  ({ user }) => ({
    profile: user.profile,
    loadingPlaylists: user.loading.PLAYLISTS,
    loadingPlayItems: user.loading.PLAYITEMS,
    playlists: user.playlists,
    playItems: user.playItems,
  }),
  {
    logout,
    setProfile,
    getPlaylists,
    getPlayItems,
  }
)(withRouter(PlayList));
