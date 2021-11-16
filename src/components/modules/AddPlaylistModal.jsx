import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { changeAddingTitle, changeAddingDescription, postAddPlaylist, hideModal } from '../../store/modal';
import Modal from '../atoms/Modal';
import ModalButton from '../atoms/ModalButton';
import ModalInput from '../atoms/ModalInput';
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

function AddPlaylistModal({
  history,
  addingTitle,
  addingDescription,
  changeAddingTitle,
  changeAddingDescription,
  postAddPlaylist,
  hideModal,
}) {
  const onChangeTitle = useCallback(
    (e) => {
      changeAddingTitle(e.target.value);
    },
    [changeAddingTitle]
  );

  const onChangeDescription = useCallback(
    (e) => {
      changeAddingDescription(e.target.value);
    },
    [changeAddingDescription]
  );

  const onClickCancel = useCallback(() => {
    changeAddingTitle('');
    changeAddingDescription('');
    hideModal();
  }, [changeAddingTitle, changeAddingDescription, hideModal]);

  const onClickSubmit = useCallback(() => {
    postAddPlaylist(history);
    changeAddingTitle('');
    changeAddingDescription('');
    hideModal();
  }, [changeAddingTitle, changeAddingDescription, postAddPlaylist, history, hideModal]);

  return (
    <Modal closeModal={onClickCancel}>
      <ModalTitle>새 재생목록</ModalTitle>
      <ModalBodyCont>
        <ModalInput name="title" onChange={onChangeTitle} value={addingTitle} label="제목" />
        <ModalInput name="description" onChange={onChangeDescription} value={addingDescription} label="설명" />
        <ModalButtonCont>
          <ModalButton onClick={onClickCancel}>취소</ModalButton>
          <ModalButton onClick={onClickSubmit}>확인</ModalButton>
        </ModalButtonCont>
      </ModalBodyCont>
    </Modal>
  );
}

export default connect(
  ({ modal }) => ({
    addingTitle: modal.addingTitle,
    addingDescription: modal.addingDescription,
  }),
  {
    changeAddingTitle,
    changeAddingDescription,
    postAddPlaylist,
    hideModal,
  }
)(withRouter(AddPlaylistModal));
