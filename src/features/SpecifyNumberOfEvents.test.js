import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {
    let AppComponent;
    given('the user hasn’t specified the number of events', async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
    });

    when('the user opens the app', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      expect(EventListDOM).toBeInTheDocument();
    });

    then('the default number of displayed events should be 32', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListItems = within(AppDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;

    given('the main page is open', async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
    });

    when('the user sets the number of events to 10', async () => {
      const numberOfEventsInput = screen.getByRole('spinbutton');

      await act(async () => {
        fireEvent.change(numberOfEventsInput, { target: { value: 10 } });
      });

      expect(numberOfEventsInput).toHaveValue(10);
    });

    then('only 10 events should be displayed in the event list', async () => {
      const eventsList = screen.getAllByRole('listitem');
      expect(eventsList.length).toBe(10);
    });
  });
});
