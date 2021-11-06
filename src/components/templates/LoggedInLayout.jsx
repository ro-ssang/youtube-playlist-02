import React, { useEffect } from 'react';
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
import { logout } from '../../store/auth';
import { setProfile, getPlaylists } from '../../store/user';
import { getPopularVideos } from '../../store/videos';

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
  logout,
  profile,
  setProfile,
  getPlaylists,
  loadingPlaylists,
  playlists,
  getPopularVideos,
}) {
  useEffect(() => {
    getPopularVideos();
    getPlaylists();
  }, [getPopularVideos, getPlaylists]);

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
            <AddPlayItem />
            {loadingPlaylists && <Loader />}
            {!loadingPlaylists &&
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
          <LogoutBox profile={profile} setProfile={setProfile} logoutPath="/" logout={logout} />
        </AuthBox>
      </Aside>
      <Main>{children}</Main>
    </Wrapper>
  );
}

export default connect(
  ({ user }) => ({
    profile: user.profile,
    loadingPlaylists: user.loading.PLAYLISTS,
    playlists: user.playlists,
  }),
  {
    logout,
    setProfile,
    getPlaylists,
    getPopularVideos,
  }
)(LoggedInLayout);
