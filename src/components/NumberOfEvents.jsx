import React, { useState } from 'react';

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

export default NumberOfEvents;
