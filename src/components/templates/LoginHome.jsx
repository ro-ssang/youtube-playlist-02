import React, { useEffect } from 'react';
import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import Aside from '../modules/Aside';
import Main from '../atoms/Main';
import VideoItem from '../modules/VideoItem';
import AddPlayItem from '../atoms/AddPlayItem';
import AuthBox from '../atoms/AuthBox';
import BrowseItem from '../atoms/BrowseItem';
import ListTitle from '../atoms/ListTitle';
import PlayItem from '../atoms/PlayItem';
import SiteLogo from '../atoms/SiteLogo';
import SearchForm from '../modules/SearchForm';
import LogoutBox from '../modules/LogoutBox';
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
  padding: 2rem 2.5rem 0px;
`;
const VideoList = styled.ul`
  display: flex;
  margin: 1.5rem auto 0px;
  flex-wrap: wrap;
`;

function LoginHome({ logout, profile, setProfile, loadingPopularVideos, popularVideos, getPopularVideos }) {
  useEffect(() => {
    getPopularVideos();
  }, [getPopularVideos]);

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
            <PlayItem text="요리" path="/playlist/PLnURkYeeEkiKJjDKapnRxLVesniKMYGQm" />
          </PlayList>
        </Nav>
        <AuthBox>
          <LogoutBox profile={profile} setProfile={setProfile} logoutPath="/" logout={logout} />
        </AuthBox>
      </Aside>
      <Main>
        <Section>
          {loadingPopularVideos && <Loader />}
          {!loadingPopularVideos && popularVideos && (
            <>
              <SectionTitle>인기 뮤직 비디오</SectionTitle>
              <VideoList>
                {popularVideos.map((video, index) => {
                  const {
                    id,
                    snippet: {
                      title,
                      thumbnails: {
                        medium: { url: thumbnail },
                      },
                    },
                  } = video;
                  return <VideoItem key={id} title={title} thumbnail={thumbnail} rank={index + 1} />;
                })}
              </VideoList>
            </>
          )}
        </Section>
      </Main>
    </Wrapper>
  );
}

export default LoginHome;
