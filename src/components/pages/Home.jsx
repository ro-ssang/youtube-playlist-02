import React from 'react';
import { connect } from 'react-redux';
import LoginHome from '../templates/LoginHome';
import LogoutHome from '../templates/LogoutHome';
import { login, logout } from '../../store/auth';
import { setProfile } from '../../store/user';
import { getPopularVideos } from '../../store/videos';

function Home({ isLogin, login, logout, profile, setProfile, loadingPopularVideos, popularVideos, getPopularVideos }) {
  return isLogin ? (
    <LoginHome
      logout={logout}
      profile={profile}
      setProfile={setProfile}
      loadingPopularVideos={loadingPopularVideos}
      popularVideos={popularVideos}
      getPopularVideos={getPopularVideos}
    />
  ) : (
    <LogoutHome login={login} />
  );
}

export default connect(
  ({ auth, user, videos }) => ({
    isLogin: auth.isLogin,
    profile: user.profile,
    loadingPopularVideos: videos.loading.GET_POPULAR_VIDEOS,
    popularVideos: videos.popularVideos,
  }),
  {
    login,
    logout,
    setProfile,
    getPopularVideos,
  }
)(Home);
