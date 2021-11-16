import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { hideModal, deletePlaylist } from '../../store/modal';
import Modal from '../atoms/Modal';
import ModalButton from '../atoms/ModalButton';
import ModalTitle from '../atoms/ModalTitle';

const ModalBodyCont = styled.div`
  padding: 32px 24px;
`;
const ModalButtonCont = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding: 16px 0px 16px 24px;
`;

function DeletePlaylistModal({ history, location, hideModal, deletePlaylist }) {
  const onClickCancel = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const onClickDelete = useCallback(() => {
    const { pathname } = location;
    const playlistId = pathname.split('/')[2];
    deletePlaylist(playlistId, history);
    hideModal();
  }, [history, location, deletePlaylist, hideModal]);

  return (
    <Modal closeModal={onClickCancel}>
      <ModalTitle>재생목록을 삭제하시겠습니까?</ModalTitle>
      <ModalBodyCont>
        <ModalButtonCont>
          <ModalButton onClick={onClickCancel}>취소</ModalButton>
          <ModalButton onClick={onClickDelete}>확인</ModalButton>
        </ModalButtonCont>
      </ModalBodyCont>
    </Modal>
  );
}

export default connect(() => ({}), {
  hideModal,
  deletePlaylist,
})(withRouter(DeletePlaylistModal));
