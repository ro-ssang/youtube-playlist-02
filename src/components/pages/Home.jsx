import React from 'react';
import { connect } from 'react-redux';
import LoginHome from '../templates/LoginHome';
import LogoutHome from '../templates/LogoutHome';
import { login, logout } from '../../store/auth';
import { loadPlayer } from '../../store/player';
import { setProfile, getPlaylists } from '../../store/user';
import { getPopularVideos } from '../../store/videos';

function Home({
  isLogin,
  login,
  logout,
  profile,
  setProfile,
  loadingPlaylists,
  playlists,
  getPlaylists,
  loadingPopularVideos,
  popularVideos,
  getPopularVideos,
  loadPlayer,
}) {
  return isLogin ? (
    <LoginHome
      logout={logout}
      profile={profile}
      setProfile={setProfile}
      loadingPlaylists={loadingPlaylists}
      playlists={playlists}
      getPlaylists={getPlaylists}
      loadingPopularVideos={loadingPopularVideos}
      popularVideos={popularVideos}
      getPopularVideos={getPopularVideos}
      loadPlayer={loadPlayer}
    />
  ) : (
    <LogoutHome login={login} />
  );
}

export default connect(
  ({ auth, user, videos }) => ({
    isLogin: auth.isLogin,
    profile: user.profile,
    loadingPlaylists: user.loading.PLAYLISTS,
    playlists: user.playlists,
    loadingPopularVideos: videos.loading.GET_POPULAR_VIDEOS,
    popularVideos: videos.popularVideos,
  }),
  {
    login,
    logout,
    setProfile,
    getPlaylists,
    getPopularVideos,
    loadPlayer,
  }
)(Home);
