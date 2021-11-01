import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Browse } from '../../assets/icons/browse.svg';

const Container = styled.li``;
const StyledLink = styled(Link)`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 0.9375rem;
  padding: 0.25rem;
  border-radius: 6px;
`;
const BrowseIcon = styled(Browse)`
  margin-right: 0.5rem;
  fill: ${({ theme }) => theme.colors.red};
`;
const Text = styled.span``;

function BrowseItem() {
  return (
    <Container>
      <StyledLink to="/">
        <BrowseIcon />
        <Text>둘러보기</Text>
      </StyledLink>
    </Container>
  );
}

export default BrowseItem;
