import { useReducer, useEffect } from 'react';

import SearchBar from './components/SearchBar/SearchBar';
import ItemList from './components/ItemList/ItemList';

import { initialState, reducer } from './App.helpers';
import { APP_CONSTANTS } from './constants/App.constants';

import { useDebounce } from './hooks';

import './App.styles.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { searchTerm, displayedList } = state;
  const debouncedSerchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: APP_CONSTANTS.ROTATE_LIST,
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async url => {
      try {
        const response = await fetch(url, {});
        const responseData = await response.json();
        const returnedData = responseData.results.map(el => el.collectionName);
        if (!didCancel) {
          dispatch({
            type: APP_CONSTANTS.SET_SEARCH_DATA,
            payload: [...new Set(returnedData)]
              .sort((a, b) => a.localeCompare(b))
              .slice(0, 5),
          });
        }
      } catch (err) {
        throw new Error();
      }
    };

    if (debouncedSerchTerm) {
      fetchData(`https://itunes.apple.com/search?term=${debouncedSerchTerm}`);
    }

    return () => {
      didCancel = true;
    };
  }, [debouncedSerchTerm]);

  const onSearchTermChange = async newVal => {
    dispatch({
      type: APP_CONSTANTS.SEARCH_TERM_CHANGE,
      payload: newVal,
    });
  };

  return (
    <div className="App">
      <div className="search-container">
        <SearchBar
          inputValue={searchTerm}
          onSearchTermChange={onSearchTermChange}
        />
        <ItemList items={displayedList} />
      </div>
    </div>
  );
}

export default App;
