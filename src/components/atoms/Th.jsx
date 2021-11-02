import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.th`
  padding-bottom: 0.375rem;
  width: ${({ width }) => width};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: normal;
  text-align: left;

  ${({ isFirst, theme }) => {
    return isFirst
      ? css`
          padding-left: 0.375rem;
        `
      : css`
          position: relative;

          &::before {
            content: '';
            position: absolute;
            left: -15px;
            top: calc(50% - 3px);
            height: 16px;
            width: 1px;
            border-radius: 0.5px;
            background: ${theme.colors.secondary};
            transform: translateY(-50%);
          }
        `;
  }}
`;

function Th({ children, width, isFirst }) {
  return (
    <Container width={width} isFirst={isFirst}>
      {children}
    </Container>
  );
}

export default Th;
