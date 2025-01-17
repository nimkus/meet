import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ updateEvents }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setNumberOfEvents(value);
      updateEvents(value);
    }
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
};

export default NumberOfEvents;
