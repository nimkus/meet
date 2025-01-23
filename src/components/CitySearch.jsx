import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isValid, setIsValid] = useState(true);

  // Define a regex pattern for allowed input
  const cityPattern = /^[a-zA-Z\s]*$/; // Allow letters and spaces only

  const handleInputChanged = (event) => {
    const value = event.target.value;

    // Validate the input against the regex pattern
    if (cityPattern.test(value)) {
      setIsValid(true); // Input is valid
      setQuery(value);

      const filteredLocations = allLocations
        ? allLocations.filter((location) => location.toUpperCase().indexOf(value.toUpperCase()) > -1)
        : [];

      setSuggestions(filteredLocations);

      let infoText;
      if (filteredLocations.length === 0) {
        infoText = 'We cannot find the city you are looking for. Please try another city';
      } else {
        infoText = '';
      }
      setInfoAlert(infoText);
    } else {
      setIsValid(false); // Input is invalid
    }
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert('');
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);

  return (
    <div id="city-search">
      <input
        type="text"
        className={`city ${isValid ? '' : 'invalid'}`}
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
        aria-expanded={showSuggestions} // Indicate if suggestions are visible
        aria-autocomplete="list" // Indicate that suggestions are a list to the screen reader
        aria-activedescendant={showSuggestions && query ? suggestions[0] : undefined} // Highlight the first suggestion
      />
      {!isValid && <p className="error-message">Please use only letters and spaces.</p>}
      {showSuggestions && (
        <ul className="suggestions" role="listbox" aria-live="polite" aria-label="List of city suggestions">
          {' '}
          {/* Announce changes */}
          {suggestions.map((suggestion) => (
            <li
              onClick={handleItemClicked}
              key={suggestion}
              role="option" // This indicates each list item is an option
              aria-selected={suggestion === query} // Highlight the selected suggestion
            >
              {suggestion}
            </li>
          ))}
          <li key="See all cities" onClick={handleItemClicked} role="option">
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

CitySearch.propTypes = {
  allLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentCity: PropTypes.func.isRequired,
  setInfoAlert: PropTypes.func.isRequired,
};

export default CitySearch;
