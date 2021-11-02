import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';

const Container = styled.li`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 6px;
  padding: 0.25rem;
  cursor: pointer;
`;
const PlusIcon = styled(Plus)`
  margin-right: 0.5rem;
  width: 24px;
  height: 24px;
  opacity: 0.5;
`;

function AddPlayItem() {
  return (
    <Container>
      <PlusIcon />새 재생목록
    </Container>
  );
}

export default AddPlayItem;
