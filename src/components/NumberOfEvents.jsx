import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ updateEvents, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (e) => {
    const value = e.target.value;
    let errorText = '';

    if (value === '' || isNaN(value)) {
      errorText = 'Please enter a valid number of events.';
    } else if (Number(value) <= 0) {
      errorText = 'The number of events must be greater than 0.';
    } else {
      setNumberOfEvents(value); // Update the value as a string for valid input
      updateEvents(Number(value)); // Pass the numeric value to the parent function
    }

    setErrorAlert(errorText);
    setNumberOfEvents(value); // Always update state with the raw input to allow typing
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-input">Number of Events:</label>
      <br />
      <input
        type="number"
        id="number-input"
        aria-label="number of events"
        value={numberOfEvents}
        onChange={handleInputChange}
      />
    </div>
  );
};

NumberOfEvents.propTypes = {
  updateEvents: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};

export default NumberOfEvents;
