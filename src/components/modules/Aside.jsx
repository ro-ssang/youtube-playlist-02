import React from 'react';
import styled from 'styled-components';
import BrowseItem from '../atoms/BrowseItem';
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

function Aside({ children }) {
  return (
    <Container>
      <SiteLogo />
      <SearchForm />
      <Nav>
        <BrowseList>
          <BrowseItem />
        </BrowseList>
        {children}
      </Nav>
    </Container>
  );
}

export default Aside;
