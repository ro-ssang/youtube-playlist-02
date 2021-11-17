import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { hideModal, deletePlayItem } from '../../store/modal';
import { selectVideo } from '../../store/videos';
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

function DeletePlayItemModal({ history, location, hideModal, deletePlayItem, selectVideo }) {
  const onClickCancel = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const onClickDelete = useCallback(() => {
    const { pathname } = location;
    const playlistId = pathname.split('/')[2];
    deletePlayItem(playlistId, history);
    selectVideo('');
    hideModal();
  }, [history, location, hideModal, deletePlayItem, selectVideo]);

  return (
    <Modal closeModal={onClickCancel}>
      <ModalTitle>재생목록에서 삭제하시겠습니까?</ModalTitle>
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
  deletePlayItem,
  selectVideo,
})(withRouter(DeletePlayItemModal));
