import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

const Container = styled.div`
  ${({ isAside }) => {
    return isAside
      ? css`
          font-size: 2.5rem;
          font-weight: bold;
          padding: 0px 1.5625rem;
        `
      : css`
          margin-bottom: 0.875rem;
        `;
  }}
`;
const LogoIcon = styled(Logo)`
  fill: ${({ theme }) => theme.colors.primary};
`;

function SiteLogo({ isAside }) {
  return (
    <Container isAside={isAside}>
      <Link to="/">
        <LogoIcon />
      </Link>
    </Container>
  );
}

export default SiteLogo;
