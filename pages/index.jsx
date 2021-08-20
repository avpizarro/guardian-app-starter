import React, { useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [inputHelp, setInputHelp] = useState(false);

  const doSearch = async () => {
    const resultSet = await axios.get('/api/search', {
      params: {
        term: term,
      },
    });
    setResults(resultSet.data);
  };

  return (
    <div>
      <h1>Guardian Search</h1>
      <div>
        <input
          value={term}
          placeholder="Add a word to search"
          onChange={(evt) => {
            console.log(evt.target.value);
            setTerm(evt.target.value);
            setInputHelp(false)
          }}
        />
        <button
          onClick={() => {
            if (term) {
              doSearch();
              setInputHelp(false);
            } else {
              setInputHelp(true);
            }
          }}
        >
          Search
        </button>
        {inputHelp ? <div>Please add a word</div> : null}
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
