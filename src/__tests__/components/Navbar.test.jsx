import React from 'react';

import { render, screen } from '@testing-library/react';

import { Navbar } from '@components';

describe('Navbar Component', () => {
  test('renders Navbar text', () => {
    render(<Navbar />);
    const navbarElement = screen.getByText(/Navbar/i);
    expect(navbarElement).toBeInTheDocument();
  });
});
