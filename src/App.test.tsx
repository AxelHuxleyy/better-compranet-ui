import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App, WrappedApp } from './App';

describe('App', () => {
  it('renders text', () => {
    render(<WrappedApp />);

    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });
  it('not found', () => {
    render(
      <MemoryRouter initialEntries={['/this-link-does-not-exist']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
