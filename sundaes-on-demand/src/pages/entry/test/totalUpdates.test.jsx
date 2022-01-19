import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

describe('update scoop subtotal when scoops change', () => {
    let  scoopsSubtotal;
    beforeEach(() => {
        render(<Options optionType="scoops"/>);
        scoopsSubtotal = screen.getByText("Scoops total: $", {exact: false});
    });
    test('make sure total starts out $0.00', () => {
        expect(scoopsSubtotal).toHaveTextContent('0.00');
    });
    test('update vanilla scoops to 1 and check the subtotal', async() => {
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');
        expect(scoopsSubtotal).toHaveTextContent('2.00');
    });
    test('update chocolate scoops to 2 and check the subtotal', async () => {
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
        userEvent.clear(chocolateInput);
        userEvent.type(vanillaInput, '1');
        userEvent.type(chocolateInput, '2');
        expect(scoopsSubtotal).toHaveTextContent('6.00');
    });
});