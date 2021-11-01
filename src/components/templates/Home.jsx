import React from 'react';
import styled from 'styled-components';
import Aside from '../modules/Aside';
import Main from '../modules/Main';

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: ${({ theme }) => theme.sizes.sidebar.width} 1fr;
  grid-template-rows: 100%;
`;

function Home() {
  return (
    <Wrapper>
      <Aside />
      <Main />
    </Wrapper>
  );
}

export default Home;
