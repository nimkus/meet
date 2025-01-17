import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CitySearch = ({ allLocations, setCurrentCity }) => {
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
    } else {
      setIsValid(false); // Input is invalid
    }
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
    <div id="city-search" style={{ position: 'relative' }}>
      <input
        type="text"
        className={`city ${isValid ? '' : 'invalid'}`}
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {!isValid && <p className="error-message">Please use only letters and spaces.</p>}
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
      <style jsx>{`
        .city {
          width: 100%;
          padding: 8px;
          font-size: 16px;
        }

        .invalid {
          border: 1px solid red;
        }

        .error-message {
          color: red;
          font-size: 14px;
          margin-top: 4px;
          margin-left: 2px;
        }

        .suggestions {
          margin: 0;
          padding: 0;
          list-style: none;
          background-color: white;
          border: 1px solid #ccc;
          position: absolute;
          width: 100%;
          z-index: 10;
          max-height: 150px;
          overflow-y: auto;
        }

        .suggestions li {
          padding: 8px;
          cursor: pointer;
        }

        .suggestions li:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

CitySearch.propTypes = {
  allLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentCity: PropTypes.func.isRequired,
};

export default CitySearch;
