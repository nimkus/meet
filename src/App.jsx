import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities' ? allEvents : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, numberOfEvents));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert('');
    } else {
      setWarningAlert('Displayed list has been loaded from the cache and may not be up to date!');
    }
    fetchData();
  }, [currentCity, numberOfEvents]);

  return (
    <div className="App">
      <div className="alerts-container">{infoAlert.length ? <InfoAlert text={infoAlert} /> : null}</div>
      <div className="alerts-container">{errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}</div>
      <div className="alerts-container">{warningAlert.length ? <WarningAlert text={warningAlert} /> : null}</div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
      <NumberOfEvents updateEvents={setNumberOfEvents} setErrorAlert={setErrorAlert} />
      <div className="charts-container">
        <CityEventsChart events={events} />
        <EventGenresChart allLocations={allLocations} events={events} />
      </div>
      <EventList events={events} />
    </div>
  );
};

export default App;
