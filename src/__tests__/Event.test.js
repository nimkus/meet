import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let mockEvent;

  beforeAll(async () => {
    // Fetch mock event data from api.js
    const events = await getEvents();
    mockEvent = events[0]; // Use the first mock event for testing
  });

  beforeEach(() => {
    render(<Event event={mockEvent} />);
  });

  test('renders the event title correctly', () => {
    const titleElement = screen.queryByText(mockEvent.summary);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the event start time correctly', () => {
    const startTimeElement = screen.queryByText(mockEvent.created);
    expect(startTimeElement).toBeInTheDocument();
  });

  test('renders the event location correctly', () => {
    const locationElement = screen.queryByText(mockEvent.location);
    expect(locationElement).toBeInTheDocument();
  });

  test('renders the "Show Details" button with the correct title', () => {
    const buttonElement = screen.getByRole('button', { name: 'Expand' });
    expect(buttonElement).toBeInTheDocument();
  });

  test('details are hidden by default', () => {
    const detailsElement = screen.queryByText((content, element) => {
      return content.startsWith('Have you wondered how you can ask Google');
    });
    expect(detailsElement).not.toBeInTheDocument();
  });

  test('shows event details when the "Show Details" button is clicked', () => {
    const buttonElement = screen.getByRole('button', { name: 'Expand' });
    fireEvent.click(buttonElement);

    const detailsElement = screen.getByText((content, element) => {
      return content.startsWith('Have you wondered how you can ask Google');
    });
    expect(detailsElement).toBeInTheDocument();

    expect(buttonElement).toHaveTextContent('Collapse');
  });

  test('hides event details when the "Hide Details" button is clicked', () => {
    const buttonElement = screen.getByRole('button', { name: 'Expand' });
    fireEvent.click(buttonElement);

    const detailsElement = screen.getByText((content, element) => {
      return content.startsWith('Have you wondered how you can ask Google');
    });
    expect(detailsElement).toBeInTheDocument();

    fireEvent.click(buttonElement);

    expect(
      screen.queryByText((content, element) => {
        return content.startsWith('Have you wondered how you can ask Google');
      })
    ).not.toBeInTheDocument();

    expect(buttonElement).toHaveTextContent('Expand');
  });
});
