import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import VideoItem from '../modules/VideoItem';
import { getSearchVideos } from '../../store/videos';
import Loader from '../atoms/Loader';
import AddPlayItemModal from '../modules/AddPlayItemModal';

const Section = styled.section`
  padding: 2rem 2.5rem 0px;
`;
const VideoList = styled.ul`
  display: flex;
  margin: 1.5rem auto 0px;
  flex-wrap: wrap;
`;

function Search({ location, loadingSearchVideos, searchVideos, getSearchVideos, showingAddItemModal }) {
  useEffect(() => {
    const { search } = location;
    const keyword = new URLSearchParams(search).get('keyword');
    getSearchVideos(keyword);
  }, [location, getSearchVideos]);

  return (
    <Section>
      <SectionTitle>검색 결과</SectionTitle>
      <VideoList>
        {loadingSearchVideos && <Loader />}
        {!loadingSearchVideos && searchVideos && (
          <>
            <VideoList>
              {searchVideos.map((video, index) => {
                const {
                  id: { videoId },
                  snippet: {
                    title,
                    thumbnails: {
                      medium: { url: thumbnail },
                    },
                  },
                } = video;
                return (
                  <VideoItem key={videoId} videoId={videoId} title={title} thumbnail={thumbnail} rank={index + 1} />
                );
              })}
            </VideoList>
            {showingAddItemModal && <AddPlayItemModal />}
          </>
        )}
      </VideoList>
    </Section>
  );
}

export default connect(
  ({ videos, modal }) => ({
    loadingSearchVideos: videos.loading.GET_SEARCH_VIDEOS,
    searchVideos: videos.searchVideos,
    showingAddItemModal: modal.showing.addItem,
  }),
  {
    getSearchVideos,
  }
)(withRouter(Search));
