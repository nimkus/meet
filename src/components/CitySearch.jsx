import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  // Define a regex pattern for allowed input
  const cityPattern = /^[a-zA-Z\s]*$/; // Allow letters and spaces only

  const handleInputChanged = (event) => {
    const value = event.target.value;

    // Validate the input against the regex pattern
    if (!cityPattern.test(value)) {
      setError('Invalid input: only letters and spaces are allowed.');
      return;
    }

    setError(null); // Clear error if input is valid

    const filteredLocations = allLocations
      ? allLocations.filter((location) => location.toUpperCase().indexOf(value.toUpperCase()) > -1)
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {error && <p className="error">{error}</p>}
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li onClick={handleItemClicked} key={suggestion}>
                {suggestion}
              </li>
            );
          })}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

CitySearch.propTypes = {
  allLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentCity: PropTypes.func.isRequired,
};

export default CitySearch;
