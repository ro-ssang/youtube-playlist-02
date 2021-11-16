import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.li`
  border-radius: 6px;
`;
const StyledLink = styled(Link)`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0.25rem;
  width: 100%;
  background: ${({ theme, selected }) => (selected ? theme.colors.sidebar.background.selected : 'none')};
  border-radius: 6px;

  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
    background-image: url('https://music.apple.com/assets/web-nav/sidebar_GenericPlaylist.svg');
    background-repeat: no-repeat;
    opacity: 0.5;
  }
`;
const Text = styled.span`
  flex: 1 1 0%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

function PlayItem({ location, path, text }) {
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    setSelected(pathname === path);
  }, [location, path, setSelected]);

  return (
    <Container>
      <StyledLink to={path} selected={isSelected}>
        <Text>{text}</Text>
      </StyledLink>
    </Container>
  );
}

export default withRouter(PlayItem);
