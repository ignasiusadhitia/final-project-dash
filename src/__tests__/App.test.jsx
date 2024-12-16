import React from 'react';

import App from 'src/App';

import { render, screen } from '@testing-library/react';

describe('App Integration Test', () => {
  test('renders Navbar and App content', () => {
    render(<App />);
    const navbarElement = screen.getByText(/Navbar/i);

    expect(navbarElement).toBeInTheDocument();
  });
});
