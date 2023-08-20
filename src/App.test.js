// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app with Navbar and Home content', () => {
    render(<App />);
    
    // Check if the Navbar logo is rendered
    const logoElement = screen.getByText(/Guess the Number/i);
    expect(logoElement).toBeInTheDocument();
    
});


