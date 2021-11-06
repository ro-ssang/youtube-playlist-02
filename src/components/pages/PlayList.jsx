import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPlayItems, getPlaylistDetail } from '../../store/user';
import { withRouter } from 'react-router';
import PlayItemInfo from '../modules/PlayItemInfo';
import Loader from '../atoms/Loader';
import PlayItemTable from '../modules/PlayItemTable';

const Section = styled.section`
  padding: 2.5rem;
`;

function PlayList({ loadingPlaylists, loadingPlayItems, playItems, getPlayItems, match, getPlaylistDetail }) {
  useEffect(() => {
    const {
      params: { playlistId },
    } = match;
    getPlayItems(playlistId);
    getPlaylistDetail(playlistId);
  }, [getPlayItems, match, getPlaylistDetail]);

  return (
    <Section>
      {loadingPlaylists && loadingPlayItems && <Loader />}
      {!loadingPlaylists && !loadingPlayItems && (
        <>
          <PlayItemInfo />
          <PlayItemTable playItems={playItems} />
        </>
      )}
    </Section>
  );
}

export default connect(
  ({ user }) => ({
    loadingPlaylists: user.loading.PLAYLISTS,
    loadingPlayItems: user.loading.PLAYITEMS,
    playItems: user.playItems,
  }),
  {
    getPlayItems,
    getPlaylistDetail,
  }
)(withRouter(PlayList));
