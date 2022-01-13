import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

describe('test color button', () => {
  let button;
  beforeEach(() => {
    render(<App />);
    button = screen.getByRole('button', {name: /change to blue/i});
  });
  test('button has correct initial color', () => {
    expect(button).toHaveStyle({backgroundColor: 'red'});
  });
  test('button turns blue when clicked', () => {
    fireEvent.click(button);
    expect(button).toHaveStyle({backgroundColor: 'blue'});
  });
  test('button text changed when clicked', () => {
    fireEvent.click(button);
    expect(button).toHaveTextContent(/change to red/i);
  });
});

describe('initial conditions', () => {
  beforeEach(() => {
    render(<App/>);
  });
  test('check that the button starts out enabled', () => {
    const button = screen.getByRole('button', {name: /change to blue/i});
    expect(button).toBeEnabled();
  });
  test('check that the checkbox starts out unchecked', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });
});

describe('checkbox functionality', () => {
  let button;
  let checkbox;
  beforeEach(() => {
    render(<App/>);
    button = screen.getByRole('button', {name: /change to blue/i});
    checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
  });
  test('check that when checkbox checked button become disabled', () => {
    expect(button).toBeDisabled();
  });
  test('check that when checkbox unchecked button become enabled', () => {
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
  });
});

