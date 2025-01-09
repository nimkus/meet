import React, { useState } from 'react'; // ✅ Make sure this import is there

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
      <input type="number" id="number-input" value={numberOfEvents} onChange={handleInputChange} />
    </div>
  );
};

export default NumberOfEvents;
