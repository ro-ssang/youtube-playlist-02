import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

const Container = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  padding: 0px 1.5625rem;
`;
const LogoIcon = styled(Logo)`
  fill: ${({ theme }) => theme.colors.primary};
`;

function SiteLogo() {
  return (
    <Container>
      <Link to="/">
        <LogoIcon />
      </Link>
    </Container>
  );
}

export default SiteLogo;
