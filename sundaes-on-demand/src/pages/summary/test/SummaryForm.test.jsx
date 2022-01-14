import SummaryForm from "../SummaryForm";
import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
      userEvent.click(checkbox);
      expect(button).toBeEnabled();
   });
    test('unchecking checkbox again disables button', () =>{
       userEvent.click(checkbox);
       userEvent.click(checkbox);
       expect(button).toBeDisabled();
    });
});

describe('popover functionality', () => {
    let termsAndConditions;
    beforeEach(() => {
        render(<SummaryForm />);
        termsAndConditions = screen.getByText(/terms and conditions/i);
    });
    test('popover starts out hidden', () => {
        const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
        expect(nullPopover).not.toBeInTheDocument();
    });
    test('popover appears upon mouseover of checkbox label', () => {
        userEvent.hover(termsAndConditions);
        const popover = screen.getByText(/no ice cream will actually be delivered/i);
        expect(popover).toBeInTheDocument();
    });
    test('popover disappears when we mouseout', async() => {
        userEvent.hover(termsAndConditions);
        userEvent.unhover(termsAndConditions);
        await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i));
    });
});