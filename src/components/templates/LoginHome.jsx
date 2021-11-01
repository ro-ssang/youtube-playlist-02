import React from 'react';
import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import Aside from '../modules/Aside';
import Main from '../atoms/Main';
import VideoItem from '../modules/VideoItem';

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: ${({ theme }) => theme.sizes.sidebar.width} 1fr;
  grid-template-rows: 100%;
`;
const Section = styled.section`
  padding: 2rem 2.5rem 0px;
`;
const VideoList = styled.ul`
  display: flex;
  margin: 1.5rem auto 0px;
  flex-wrap: wrap;
`;

function LoginTemplate() {
  return (
    <Wrapper>
      <Aside></Aside>
      <Main>
        <Section>
          <SectionTitle>인기 뮤직 비디오</SectionTitle>
          <VideoList>
            <VideoItem
              title="strawberry moon (strawberry moon)"
              thumbnail="https://i.ytimg.com/vi/Kevp2lFKSOg/mqdefault.jpg"
              rank="1"
            />
          </VideoList>
        </Section>
      </Main>
    </Wrapper>
  );
}

export default LoginTemplate;
