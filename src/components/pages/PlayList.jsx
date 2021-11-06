import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPlayItems } from '../../store/user';
import { withRouter } from 'react-router';
import PlayItemInfo from '../modules/PlayItemInfo';
import Loader from '../atoms/Loader';
import PlayItemTable from '../modules/PlayItemTable';

const Section = styled.section`
  padding: 2.5rem;
`;

function PlayList({ loadingPlayItems, playItems, getPlayItems, match }) {
  useEffect(() => {
    const {
      params: { playlistId },
    } = match;
    getPlayItems(playlistId);
  }, [getPlayItems, match]);

  return (
    <Section>
      <PlayItemInfo />
      {loadingPlayItems && <Loader />}
      {!loadingPlayItems && <PlayItemTable loadingPlayItems={loadingPlayItems} playItems={playItems} />}
    </Section>
  );
}

export default connect(
  ({ user }) => ({
    profile: user.profile,
    loadingPlaylists: user.loading.PLAYLISTS,
    loadingPlayItems: user.loading.PLAYITEMS,
    playItems: user.playItems,
  }),
  {
    getPlayItems,
  }
)(withRouter(PlayList));
