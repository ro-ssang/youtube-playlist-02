import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../atoms/Avatar';

const Username = styled.div`
  font-size: 0.8125rem;
`;
const LogoutLink = styled(Link)`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
`;

function LogoutBox({ avatarUrl, username, logoutPath }) {
  return (
    <>
      <Avatar avatarUrl={avatarUrl} />
      <div>
        <Username>{username}</Username>
        <LogoutLink to={logoutPath}>로그아웃</LogoutLink>
      </div>
    </>
  );
}

export default LogoutBox;
