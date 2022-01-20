import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

describe('indicate if scoop is non-int or out of range', () => {
    let vanillaInput;
    beforeEach(async() => {
        render(<ScoopOption name="Vanilla" imagePath="" updateItemCount={jest.fn()}/> );
        vanillaInput = await screen.findByRole('spinbutton', {name: "Vanilla"});
        userEvent.clear(vanillaInput);
    });
    test('expect input to be invalid with negative number', async () => {
        userEvent.type(vanillaInput, '-1');
        expect(vanillaInput).toHaveClass('is-invalid');
    });
    test('expect input to be invalid with decimal number', async () => {
        userEvent.type(vanillaInput, '2.5');
        expect(vanillaInput).toHaveClass('is-invalid');
    });
    test('expect input to be invalid with to high number', async () => {
        userEvent.type(vanillaInput, '11');
        expect(vanillaInput).toHaveClass('is-invalid');
    });
    test('expect input not to be invalid with correct number', async () => {
        userEvent.type(vanillaInput, '3');
        expect(vanillaInput).not.toHaveClass('is-invalid');
    });
});
