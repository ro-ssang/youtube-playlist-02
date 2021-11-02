import React from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  font-size: 0.625rem;
  font-weight: normal;
  line-height: 1.3;
  margin-top: 1.375rem;
  margin-bottom: 0.25rem;
  opacity: 0.5;
`;

function ListTitle({ children }) {
  return <Title>{children}</Title>;
}

export default ListTitle;
