import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders a spinbutton element', () => {
    render(<NumberOfEvents updateEvents={() => {}} />);
    const inputElement = screen.getByRole('spinbutton'); // ✅ Updated role
    expect(inputElement).toBeInTheDocument();
  });

  test('renders the default number of 32 events', () => {
    render(<NumberOfEvents updateEvents={() => {}} />);
    const inputElement = screen.getByRole('spinbutton'); // ✅ Updated role
    expect(inputElement).toHaveValue(32);
  });

  test('changes the value of the input field when user types', async () => {
    render(<NumberOfEvents updateEvents={() => {}} />);
    const inputElement = screen.getByRole('spinbutton'); // ✅ Updated role
    fireEvent.change(inputElement, { target: { value: 10 } });
    expect(inputElement).toHaveValue(10);
  });
});
