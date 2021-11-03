import React from 'react';
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
import PlayItemInfo from '../modules/PlayItemInfo';
import PlayItemTable from '../modules/PlayItemTable';
import Loader from '../atoms/Loader';

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
const Section = styled.section`
  padding: 2.5rem;
`;

function LoginPlayList({ loadingPlaylists, loadingPlayItems, playlists, playItems, profile, setProfile, logout }) {
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
      <Main>
        <Section>
          <PlayItemInfo />
          {loadingPlayItems && <Loader />}
          {!loadingPlayItems && <PlayItemTable loadingPlayItems={loadingPlayItems} playItems={playItems} />}
        </Section>
      </Main>
    </Wrapper>
  );
}

export default LoginPlayList;
