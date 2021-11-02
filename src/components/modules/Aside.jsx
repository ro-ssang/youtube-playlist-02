import React from 'react';
import styled from 'styled-components';
import AddPlayItem from '../atoms/AddPlayItem';
import BrowseItem from '../atoms/BrowseItem';
import ListTitle from '../atoms/ListTitle';
import PlayItem from '../atoms/PlayItem';
import SiteLogo from '../atoms/SiteLogo';
import SearchForm from './SearchForm';

const Container = styled.aside`
  display: grid;
  grid-template-rows: 50px auto 1fr auto;
  border-right: 1px solid ${({ theme }) => theme.colors.sidebar.border};
  background-color: ${({ theme }) => theme.colors.sidebar.background.default};
  max-width: 280px;
`;
const Nav = styled.nav`
  padding: 0px 1.5625rem;
  margin: 1rem 0px;
  overflow: auto;
`;
const BrowseList = styled.ul``;
const PlayList = styled.ul``;

function Aside({ children }) {
  return (
    <Container>
      <SiteLogo />
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
    </Container>
  );
}

export default Aside;
