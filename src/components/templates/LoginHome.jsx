import React from 'react';
import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import VideoItem from '../modules/VideoItem';
import Loader from '../atoms/Loader';
import LoggedInLayout from './LoggedInLayout';
import { connect } from 'react-redux';

const Section = styled.section`
  padding: 2rem 2.5rem 0px;
`;
const VideoList = styled.ul`
  display: flex;
  margin: 1.5rem auto 0px;
  flex-wrap: wrap;
`;

function LoginHome({ loadingPopularVideos, popularVideos }) {
  return (
    <LoggedInLayout>
      <Section>
        <SectionTitle>인기 뮤직 비디오</SectionTitle>
        {loadingPopularVideos && <Loader />}
        {!loadingPopularVideos && popularVideos && (
          <>
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
    </LoggedInLayout>
  );
}

export default connect(
  ({ videos }) => ({
    loadingPopularVideos: videos.loading.GET_POPULAR_VIDEOS,
    popularVideos: videos.popularVideos,
  }),
  {}
)(LoginHome);
