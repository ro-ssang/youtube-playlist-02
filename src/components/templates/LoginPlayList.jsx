import React from 'react';
import styled from 'styled-components';
import PlayItemInfo from '../modules/PlayItemInfo';
import PlayItemTable from '../modules/PlayItemTable';
import Loader from '../atoms/Loader';
import LoggedInLayout from './LoggedInLayout';
import { connect } from 'react-redux';

const Section = styled.section`
  padding: 2.5rem;
`;

function LoginPlayList({ loadingPlayItems, playItems }) {
  return (
    <LoggedInLayout>
      <Section>
        <PlayItemInfo />
        {loadingPlayItems && <Loader />}
        {!loadingPlayItems && <PlayItemTable loadingPlayItems={loadingPlayItems} playItems={playItems} />}
      </Section>
    </LoggedInLayout>
  );
}

export default connect(
  ({ user }) => ({
    loadingPlayItems: user.loading.PLAYITEMS,
    playItems: user.playItems,
  }),
  {}
)(LoginPlayList);
