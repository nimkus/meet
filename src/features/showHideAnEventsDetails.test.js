import React from 'react';
import { render, waitFor, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppComponent;
    given('the user is on the main page', async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });
    });

    when('the list of events is displayed', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      expect(EventListDOM).toBeInTheDocument();
    });

    then('each event’s details should be hidden by default', () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListItems = within(AppDOM).queryAllByRole('listitem');
      EventListItems.forEach((item) => {
        const details = within(item).getByText('show details');
        expect(details).toBeInTheDocument();
      });
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    let AppComponent;
    given('an event element is collapsed', async () => {
      await act(async () => {
        AppComponent = render(<App />);
        const firstEvent = AppComponent.container.querySelector('.event');
      });
    });

    when('the user clicks on the “Details” button of an event', async () => {
      const user = userEvent.setup();
      const firstEvent = AppComponent.container.querySelector('.event');
      const detailsButton = within(firstEvent).getByText('show details');
      await user.click(detailsButton);
    });

    then('the event details should be displayed', () => {
      const firstEvent = AppComponent.container.querySelector('.event');
      const detailsButton = within(firstEvent).getByText('hide details');
      expect(detailsButton).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let AppComponent;

    given('an event element is expanded', async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });

      const user = userEvent.setup();
      const firstEvent = AppComponent.container.querySelector('.event');
      const detailsButton = within(firstEvent).getByText('show details');
      await user.click(detailsButton);
    });

    when('the user clicks on the “Details” button of an event', async () => {
      const user = userEvent.setup();
      const firstEvent = AppComponent.container.querySelector('.event');
      const detailsButton = within(firstEvent).getByText('hide details');
      await user.click(detailsButton);
    });

    then('the event details should be hidden', () => {
      const firstEvent = AppComponent.container.querySelector('.event');
      const detailsButton = within(firstEvent).getByText('show details');
      expect(detailsButton).toBeInTheDocument();
    });
  });
});
