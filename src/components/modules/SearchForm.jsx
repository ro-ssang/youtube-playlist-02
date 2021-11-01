import React from 'react';
import styled from 'styled-components';
import SearchInput from '../atoms/SearchInput';
import { ReactComponent as Search } from '../../assets/icons/search.svg';

const Form = styled.form`
  position: relative;
  margin-top: 1.25rem;
  padding: 0px 1.5625rem;
`;
const SearchIcon = styled(Search)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;
  margin-right: 5px;
  fill: ${({ theme }) => theme.colors.searchBox.icon};
  width: 12px;
  height: 12px;
`;

function SearchForm() {
  return (
    <Form>
      <SearchIcon />
      <SearchInput placeholder="음악을 검색하세요" />
    </Form>
  );
}

export default SearchForm;
