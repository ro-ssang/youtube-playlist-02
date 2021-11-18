import React, { useEffect } from 'react';
import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import VideoItem from '../modules/VideoItem';
import Loader from '../atoms/Loader';
import { connect } from 'react-redux';
import { getPopularVideos } from '../../store/videos';
import AddPlayItemModal from '../modules/AddPlayItemModal';

const Section = styled.section`
  padding: 2rem 2.5rem 0px;
`;
const VideoList = styled.ul`
  display: flex;
  margin: 1.5rem auto 0px;
  flex-wrap: wrap;
`;

function LoginHome({ loadingPopularVideos, popularVideos, getPopularVideos, showingAddItemModal }) {
  useEffect(() => {
    getPopularVideos();
  }, [getPopularVideos]);

  return (
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
              return <VideoItem key={id} videoId={id} title={title} thumbnail={thumbnail} rank={index + 1} />;
            })}
          </VideoList>
          {showingAddItemModal && <AddPlayItemModal />}
        </>
      )}
    </Section>
  );
}

export default connect(
  ({ videos, modal }) => ({
    loadingPopularVideos: videos.loading.GET_POPULAR_VIDEOS,
    popularVideos: videos.popularVideos,
    showingAddItemModal: modal.showing.addItem,
  }),
  { getPopularVideos }
)(LoginHome);
