// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app with Navbar and Home content', () => {
    render(<App />);
    
    // Check if the Navbar logo is rendered
    const logoElement = screen.getByText(/Guess the Number/i);
    expect(logoElement).toBeInTheDocument();
    
    // Check if the Home page content is rendered
    const homePageElement = screen.getByText(/Guess the Number/i);
    expect(homePageElement).toBeInTheDocument();
    const signupButton = screen.getByText(/Signup to get started/i);
    expect(signupButton).toBeInTheDocument();
    const loginButton = screen.getByText(/or login/i);
    expect(loginButton).toBeInTheDocument();
});


