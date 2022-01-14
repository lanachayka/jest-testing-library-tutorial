import SummaryForm from "../SummaryForm";
import {fireEvent, render, screen} from "@testing-library/react";

describe('checkbox functionality', () => {
   let button;
   let checkbox;
   beforeEach(() => {
       render(<SummaryForm />);
       button = screen.getByRole('button', {name: /confirm order/i});
       checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i});
   });
   test('checkbox is unchecked by default', () => {
      expect(checkbox).not.toBeChecked();
   });
   test('button is disabled by default', () => {
      expect(button).toBeDisabled();
   });
   test('checking checkbox enables button', () =>{
      fireEvent.click(checkbox);
      expect(button).toBeEnabled();
   });
    test('unchecking checkbox again disables button', () =>{
        fireEvent.click(checkbox);
        fireEvent.click(checkbox);
        expect(button).toBeDisabled();
    });
});