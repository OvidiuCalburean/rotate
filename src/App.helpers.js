import { APP_CONSTANTS } from './constants/App.constants';
import CircularLinkedList from './entities/LinkedList';

export const initialState = {
  searchTerm: '',
  searchedList: [],
  displayedList: new CircularLinkedList(['A', 'B', 'C', 'D', 'E']),
  seconds: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case APP_CONSTANTS.SEARCH_TERM_CHANGE:
      return { ...state, searchTerm: action.payload };
    case APP_CONSTANTS.ROTATE_LIST:
      debugger;
      return {
        ...state,
        seconds: state.seconds + 1,
        displayedList: handleDataReplacement(
          state.displayedList,
          state.searchedList,
        ),
        searchedList:
          state.searchedList.length > 0
            ? [...state.searchedList.slice(1, state.searchedList.length)]
            : [],
      };
    case APP_CONSTANTS.SET_SEARCH_DATA: {
      return {
        ...state,
        searchedList: action.payload,
      };
    }
    default:
      return state;
  }
}

const handleDataReplacement = (state, data) => {
  if (data.length === 0) {
    return state.rotate();
  }
  state.rotate();
  return state.replaceTail(data[0]);
};
