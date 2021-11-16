import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import VideoItem from '../modules/VideoItem';
import { getSearchVideos } from '../../store/videos';
import Loader from '../atoms/Loader';

const Section = styled.section`
  padding: 2rem 2.5rem 0px;
`;
const VideoList = styled.ul`
  display: flex;
  margin: 1.5rem auto 0px;
  flex-wrap: wrap;
`;

function Search({ location, loadingSearchVideos, searchVideos, getSearchVideos }) {
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
          </>
        )}
      </VideoList>
    </Section>
  );
}

export default connect(
  ({ videos }) => ({
    loadingSearchVideos: videos.loading.GET_SEARCH_VIDEOS,
    searchVideos: videos.searchVideos,
  }),
  {
    getSearchVideos,
  }
)(withRouter(Search));
