import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Aside from '../modules/Aside';
import Main from '../atoms/Main';
import AddPlayItem from '../atoms/AddPlayItem';
import AuthBox from '../atoms/AuthBox';
import BrowseItem from '../atoms/BrowseItem';
import ListTitle from '../atoms/ListTitle';
import PlayItem from '../atoms/PlayItem';
import SiteLogo from '../atoms/SiteLogo';
import SearchForm from '../modules/SearchForm';
import LogoutBox from '../modules/LogoutBox';
import Loader from '../atoms/Loader';
import { connect } from 'react-redux';
import { login } from '../../store/auth';
import { changeRedirectState, showModal } from '../../store/modal';
import { getPlaylists } from '../../store/user';
import { getPopularVideos } from '../../store/videos';
import PlayerBar from '../modules/PlayerBar';
import Video from '../modules/Video';
import { LS_TOKEN } from '../../contants';
import LoginButton from '../atoms/LoginButton';
import AddPlaylistModal from '../modules/AddPlaylistModal';

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: ${({ theme }) => theme.sizes.sidebar.width} 1fr;
  grid-template-rows: 100%;
`;
const Nav = styled.nav`
  padding: 0px 1.5625rem;
  margin: 1rem 0px;
  overflow: auto;
`;
const BrowseList = styled.ul``;
const PlayList = styled.ul``;

function LoggedInLayout({
  children,
  isLogin,
  login,
  getPlaylists,
  loadingPlaylists,
  playlists,
  hasRedirected,
  changeRedirectState,
  showingModal,
  showModal,
}) {
  // 로그인시 토큰 설정
  useEffect(() => {
    if (localStorage.getItem(LS_TOKEN)) {
      login();
    }
  }, [login]);

  // 로그인시 플레이리스트 가져오기
  useEffect(() => {
    if (isLogin) {
      getPlaylists();
    }
  }, [isLogin, getPlaylists]);

  // 리다이렉트시 플레이리스트 가져오기
  useEffect(() => {
    if (hasRedirected) {
      getPlaylists();
      changeRedirectState();
    }
  }, [hasRedirected, changeRedirectState, getPlaylists]);

  const onClickNewPlaylist = useCallback(() => {
    showModal();
  }, [showModal]);

  return (
    <Wrapper>
      <Aside>
        <SiteLogo isAside={true} />
        <SearchForm />
        <Nav>
          <BrowseList>
            <BrowseItem />
          </BrowseList>
          <ListTitle>플레이리스트</ListTitle>
          <PlayList>
            <AddPlayItem onClick={onClickNewPlaylist} />
            {isLogin && loadingPlaylists && <Loader />}
            {isLogin &&
              !loadingPlaylists &&
              playlists &&
              playlists.map((item) => {
                const {
                  id,
                  snippet: { title },
                } = item;
                return <PlayItem key={id} text={title} path={`/playlist/${id}`} />;
              })}
          </PlayList>
        </Nav>
        <AuthBox>
          {!isLogin && <LoginButton />}
          {isLogin && <LogoutBox />}
        </AuthBox>
      </Aside>
      <Main>
        {children}
        {isLogin && (
          <>
            <PlayerBar />
            <Video />
          </>
        )}
      </Main>
      {showingModal && <AddPlaylistModal />}
    </Wrapper>
  );
}

export default connect(
  ({ auth, user, modal }) => ({
    isLogin: auth.isLogin,
    loadingPlaylists: user.loading.PLAYLISTS,
    playlists: user.playlists,
    hasRedirected: modal.hasRedirected,
    showingModal: modal.showingModal,
  }),
  {
    login,
    getPlaylists,
    getPopularVideos,
    changeRedirectState,
    showModal,
  }
)(LoggedInLayout);
