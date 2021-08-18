import React, { useState } from 'react';
import axios from 'axios';
import searchHandler from './api/search';

const IndexPage = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  // const doSearch = async() => {
  //   const resultSet = await axios.get('/api/search', {
  //     params: {
  //       term: term
  //     }
  //   })
  //   setResults(resultSet.data);
  // }

  const doSearch = async () => {
    const resultSet = await searchHandler(term);
    setResults(resultSet.data);
  };

  return (
    <div>
      <h1>Guardian Search</h1>
      <div>
        <input value={term} onChange={(evt) => setTerm(evt.target.value)} />
        <button onClick={() => doSearch()}>Search</button>
      </div>
      <div>
        <h2>Results</h2>
        <ul>
          {results.map((result) => {
            return (
              <li>
                <a href={result.url}>{result.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;

export const config = {
  api: {
    externalResolver: true,
  },
}
