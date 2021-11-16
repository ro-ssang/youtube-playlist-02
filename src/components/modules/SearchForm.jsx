import React, { useCallback } from 'react';
import styled from 'styled-components';
import SearchInput from '../atoms/SearchInput';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { changeKeyword } from '../../store/videos';

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

function SearchForm({ history, keyword, changeKeyword }) {
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      history.push(`/search?keyword=${keyword}`);
      changeKeyword('');
    },
    [history, keyword, changeKeyword]
  );

  const onChange = useCallback(
    (e) => {
      changeKeyword(e.target.value);
    },
    [changeKeyword]
  );

  return (
    <Form onSubmit={onSubmit}>
      <SearchIcon />
      <SearchInput onChange={onChange} value={keyword} placeholder="음악을 검색하세요" />
    </Form>
  );
}

export default connect(
  ({ videos }) => ({
    keyword: videos.keyword,
  }),
  {
    changeKeyword,
  }
)(withRouter(SearchForm));
