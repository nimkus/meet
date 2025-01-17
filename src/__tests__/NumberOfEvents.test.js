import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders a spinbutton element', () => {
    render(<NumberOfEvents updateEvents={() => {}} setErrorAlert={() => {}} />);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders the default number of 32 events', () => {
    render(<NumberOfEvents updateEvents={() => {}} setErrorAlert={() => {}} />);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveValue(32);
  });

  test('changes the value of the input field when user types', async () => {
    render(<NumberOfEvents updateEvents={() => {}} setErrorAlert={() => {}} />);
    const inputElement = screen.getByRole('spinbutton');
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: 10 } });
    });
    expect(inputElement).toHaveValue(10);
  });
});

describe('<NumberOfEvents /> integration', () => {
  test('updates the number of events when the user changes the input value', async () => {
    // Render the App component
    render(<App />);

    // Get the input field for specifying the number of events
    const numberOfEventsInput = screen.getByRole('spinbutton');

    // Check that the default value is 32
    expect(numberOfEventsInput).toHaveValue(32);

    // Simulate the user changing the input value to 10
    await act(async () => {
      fireEvent.change(numberOfEventsInput, { target: { value: 10 } });
    });

    // Check that the input field now has a value of 10
    expect(numberOfEventsInput).toHaveValue(10);

    // Get the list of events
    const eventsList = screen.getAllByRole('listitem');

    // Check that the number of events displayed matches the input value
    expect(eventsList.length).toBe(10);
  });
});
