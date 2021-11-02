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

function LoginPlayList() {
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
          <LogoutBox
            avatarUrl="https://lh3.googleusercontent.com/a/AATXAJxEa6-_FQ9x-ASpd6cIaHcq_gHEwuVkAMUQ_Nb-=s96-c"
            username="유저이름"
            logoutPath="/"
          />
        </AuthBox>
      </Aside>
      <Main>
        <Section>
          <PlayItemInfo />
          <PlayItemTable />
        </Section>
      </Main>
    </Wrapper>
  );
}

export default LoginPlayList;
