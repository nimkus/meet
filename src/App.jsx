import React, { useState } from 'react';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api';

const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const updateEvents = (number) => {
    setNumberOfEvents(number);
    getEvents().then((events) => {
      setEvents(events.slice(0, number));
    });
  };

  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <NumberOfEvents updateEvents={updateEvents} />
    </div>
  );
};

export default App;
