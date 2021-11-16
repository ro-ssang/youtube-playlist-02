import React from 'react';
import styled, { css } from 'styled-components';

const Input = styled.input`
  ${({ theme }) => {
    return css`
      width: 100%;
      height: 32px;
      border-radius: 4px;
      padding-left: 2rem;
      border: 1px solid ${theme.colors.searchBox.border};
      background: ${theme.colors.searchBox.background};
      color: ${theme.colors.searchBox.text};
    `;
  }}
`;

function SearchInput({ placeholder, onChange, value }) {
  return <Input placeholder={placeholder} onChange={onChange} value={value} />;
}

export default SearchInput;
