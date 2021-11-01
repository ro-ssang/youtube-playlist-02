import React from 'react';
import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import VideoItem from '../modules/VideoItem';

const Container = styled.main`
  overflow-y: scroll;
`;
const Section = styled.section`
  padding: 2rem 2.5rem 0px;
`;
const VideoList = styled.ul`
  display: flex;
  margin: 1.5rem auto 0px;
  flex-wrap: wrap;
`;

function Main() {
  return (
    <Container>
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
    </Container>
  );
}

export default Main;
