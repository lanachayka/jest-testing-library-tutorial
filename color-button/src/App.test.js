import {fireEvent, render, screen} from '@testing-library/react';
import App , {replaceCamelWithSpaces} from './App';


describe('color button functionality', () => {
  let button;
  beforeEach(() => {
    render(<App />);
    button = screen.getByRole('button', {name: /change to midnight blue/i});
  });
  test('button has correct initial color', () => {
    expect(button).toHaveStyle({backgroundColor: 'MediumVioletRed'});
  });
  test('button turns blue when clicked', () => {
    fireEvent.click(button);
    expect(button).toHaveStyle({backgroundColor: 'MidnightBlue'});
  });
  test('button text changed when clicked', () => {
    fireEvent.click(button);
    expect(button).toHaveTextContent(/change to medium violet red/i);
  });
});

describe('initial conditions', () => {
  beforeEach(() => {
    render(<App/>);
  });
  test('check that the button starts out enabled', () => {
    const button = screen.getByRole('button', {name: /change to midnight blue/i});
    expect(button).toBeEnabled();
  });
  test('check that the checkbox starts out unchecked', () => {
    const checkbox = screen.getByRole('checkbox', {name: /disable button/i});
    expect(checkbox).not.toBeChecked();
  });
});

describe('checkbox functionality', () => {
  let button;
  let checkbox;
  beforeEach(() => {
    render(<App/>);
    button = screen.getByRole('button', {name: /change to midnight blue/i});
    checkbox = screen.getByRole('checkbox', {name: /disable button/i});
    fireEvent.click(checkbox);
  });
  test('check that when checkbox checked button become disabled', () => {
    expect(button).toBeDisabled();
  });
  test('check that when checkbox unchecked button become enabled', () => {
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
  });
  test('check that when checkbox checked button background become grey', () => {
    expect(button).toHaveStyle({backgroundColor: 'grey'});
  });
  test('check that when checkbox unchecked button background become red', () => {
    fireEvent.click(checkbox);
    expect(button).toHaveStyle({backgroundColor: 'MediumVioletRed'});
  });
});

describe('spaces before camel-case capital letters', () => {
  test('works for no inner capital letters', () =>{
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('works for one inner capital letter', () =>{
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('works for multiple inner capital letters', () =>{
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});

