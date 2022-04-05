import './SearchBar.styles.css';

const SearchBar = props => {
  const { inputValue, onSearchTermChange } = props;

  const onInputChange = e => {
    onSearchTermChange(e.target.value);
  };

  return (
    <input
      className="search-band"
      type="text"
      placeholder="Search Band"
      value={inputValue}
      onChange={onInputChange}
    />
  );
};

export default SearchBar;
