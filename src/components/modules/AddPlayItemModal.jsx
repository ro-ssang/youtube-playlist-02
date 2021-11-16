import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { hideModal, postAddPlayItem } from '../../store/modal';
import { selectVideo } from '../../store/videos';
import Modal from '../atoms/Modal';
import ModalButton from '../atoms/ModalButton';
import ModalPlayItem from '../atoms/ModalPlayItem';
import ModalTitle from '../atoms/ModalTitle';

const ModalButtonCont = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding: 16px 24px;
`;

function AddPlayItemModal({ history, playlists, hideModal, selectVideo, postAddPlayItem }) {
  const onClickCancel = useCallback(() => {
    selectVideo('');
    hideModal();
  }, [selectVideo, hideModal]);

  const onAddItem = useCallback(
    (playlistId) => {
      postAddPlayItem(playlistId, history);
      selectVideo('');
      hideModal();
    },
    [history, postAddPlayItem, selectVideo, hideModal]
  );

  return (
    <Modal closeModal={onClickCancel}>
      <ModalTitle>재생목록에 추가</ModalTitle>
      {playlists &&
        playlists.map((item) => {
          const {
            id: playlistId,
            snippet: { title },
          } = item;
          return (
            <ModalPlayItem key={playlistId} onClick={() => onAddItem(playlistId)}>
              {title}
            </ModalPlayItem>
          );
        })}
      <ModalButtonCont>
        <ModalButton onClick={onClickCancel}>취소</ModalButton>
      </ModalButtonCont>
    </Modal>
  );
}

export default connect(
  ({ user }) => ({
    playlists: user.playlists,
  }),
  {
    hideModal,
    selectVideo,
    postAddPlayItem,
  }
)(withRouter(AddPlayItemModal));
