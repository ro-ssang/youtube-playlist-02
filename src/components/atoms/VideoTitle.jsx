import React from 'react';
import styled from 'styled-components';

const Title = styled.h3``;

function VideoTitle({ children }) {
  return <Title>{children}</Title>;
}

export default VideoTitle;
