import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { changeAddingTitle, updatePlaylist, hideModal } from '../../store/modal';
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

function UpdatePlaylistModal({
  history,
  location,
  addingTitle,
  changeAddingTitle,
  updatePlaylist,
  hideModal,
  playlistDetail,
}) {
  useEffect(() => {
    changeAddingTitle(playlistDetail.title);
  }, [playlistDetail, changeAddingTitle]);

  const onChangeTitle = useCallback(
    (e) => {
      changeAddingTitle(e.target.value);
    },
    [changeAddingTitle]
  );

  const onClickCancel = useCallback(() => {
    changeAddingTitle('');
    hideModal();
  }, [changeAddingTitle, hideModal]);

  const onClickSubmit = useCallback(() => {
    const { pathname } = location;
    const playlistId = pathname.split('/')[2];
    updatePlaylist(playlistId, history);
    changeAddingTitle('');
    hideModal();
  }, [history, location, changeAddingTitle, updatePlaylist, hideModal]);

  return (
    <Modal closeModal={onClickCancel}>
      <ModalTitle>재생목록 수정</ModalTitle>
      <ModalBodyCont>
        <ModalInput name="title" onChange={onChangeTitle} value={addingTitle} label="제목" />
        <ModalButtonCont>
          <ModalButton onClick={onClickCancel}>취소</ModalButton>
          <ModalButton onClick={onClickSubmit}>확인</ModalButton>
        </ModalButtonCont>
      </ModalBodyCont>
    </Modal>
  );
}

export default connect(
  ({ user, modal }) => ({
    addingTitle: modal.addingTitle,
    playlistDetail: user.playlistDetail,
  }),
  {
    changeAddingTitle,
    updatePlaylist,
    hideModal,
  }
)(withRouter(UpdatePlaylistModal));
