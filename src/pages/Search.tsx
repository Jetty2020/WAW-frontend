import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { SearchPostInput } from '../__generated__/globalTypes';
import {
  searchPostQuery,
  searchPostQueryVariables,
} from '../__generated__/searchPostQuery';

const SEARCH_POST_QUERY = gql`
  query searchPostQuery($searchPostInput: SearchPostInput!) {
    searchPost(input: $searchPostInput) {
      ok
      error
      totalResults
      posts {
        id
        title
        imgUrl
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchCon = styled.div`
  width: 768px;
  margin-top: 2rem;
  margin-bottom: 3rem;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  padding: 0 1rem;
  background-color: none;
`;
const SearchInput = styled.input`
  width: 100%;
  line-height: 1.25rem;
  font-size: 1.375rem;
  margin: 1rem 0 1rem 0.875rem;
  border: none;
  background-color: none;
`;

const Search: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const history = useHistory();
  const [_, word] = decodeURI(window.location.href).split('?q=');
  const { register, getValues, handleSubmit } = useForm<SearchPostInput>({
    mode: 'onChange',
  });
  const onSubmit = () => {
    const { query } = getValues();
    history.push(`/search?q=${query}`);
  };

  const { data, loading } = useQuery<searchPostQuery, searchPostQueryVariables>(
    SEARCH_POST_QUERY,
    {
      variables: {
        searchPostInput: {
          query: word,
          page,
        },
      },
    }
  );
  console.log(data, loading);
  return (
    <Container>
      <SearchCon>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox>
            <AiOutlineSearch size="1.75rem" />
            <SearchInput
              {...register('query', {
                required: '검색란이 비어있습니다.',
              })}
              id="query"
              name="query"
              type="text"
              defaultValue={word}
              maxLength={50}
            />
          </InputBox>
        </form>
      </SearchCon>
    </Container>
  );
};

export default Search;
