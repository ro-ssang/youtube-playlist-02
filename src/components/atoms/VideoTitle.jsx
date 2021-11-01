import React from 'react';
import styled from 'styled-components';

const Title = styled.h3`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  flex: 1 1 0%;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 20px;
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
`;

function VideoTitle({ children }) {
  return <Title>{children}</Title>;
}

export default VideoTitle;
