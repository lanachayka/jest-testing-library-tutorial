import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

describe('update scoop subtotal when scoops change', () => {
    let scoopsSubtotal;
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

describe('update topping subtotal when scoops change', () => {
    let toppingsSubtotal;
    beforeEach(() => {
        render(<Options optionType="toppings"/>);
        toppingsSubtotal = screen.getByText("Toppings total: $", {exact: false});
    });
    test('make sure total starts out $0.00', () => {
        expect(toppingsSubtotal).toHaveTextContent('0.00');
    });
    test('add cherries and check the subtotal', async() => {
        const cherriesCheckBox = await screen.findByRole('checkbox', {name: 'Cherries'});
        userEvent.clear(cherriesCheckBox);
        userEvent.click(cherriesCheckBox);
        expect(toppingsSubtotal).toHaveTextContent('1.50');
    });
    test('add cherries and hot fudge check the subtotal', async() => {
        const cherriesCheckBox = await screen.findByRole('checkbox', {name: 'Cherries'});
        const hotFudgeCheckBox = await screen.findByRole('checkbox', {name: 'Hot fudge'});
        userEvent.clear(cherriesCheckBox);
        userEvent.clear(hotFudgeCheckBox);
        userEvent.click(cherriesCheckBox);
        userEvent.click(hotFudgeCheckBox);
        expect(toppingsSubtotal).toHaveTextContent('3.00');
    });
    test('remove cherries and add hot fudge and check the subtotal', async() => {
        const cherriesCheckBox = await screen.findByRole('checkbox', {name: 'Cherries'});
        const hotFudgeCheckBox = await screen.findByRole('checkbox', {name: 'Hot fudge'});
        userEvent.clear(cherriesCheckBox);
        userEvent.clear(hotFudgeCheckBox);
        userEvent.click(cherriesCheckBox);
        userEvent.click(hotFudgeCheckBox);
        userEvent.click(cherriesCheckBox);
        expect(toppingsSubtotal).toHaveTextContent('1.50');
    });
});

describe('grand total', () => {
    let grandTotal;
    beforeEach(() => {
        render(<OrderEntry/>);
        grandTotal = screen.getByRole('heading', {name: /grand total: \$/i})
    });
    test('grand total starts at $0.00', async() => {
        expect(grandTotal).toHaveTextContent('0.00');
    });
    test('grand total updates properly if scoop is added first', async () => {
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('4.00');

        const cherriesCheckBox = await screen.findByRole('checkbox', {name: 'Cherries'});
        userEvent.clear(cherriesCheckBox);
        userEvent.click(cherriesCheckBox);
        expect(grandTotal).toHaveTextContent('5.50');
    });
    test('grand total updates properly if topping is added first', async () => {
        const cherriesCheckBox = await screen.findByRole('checkbox', {name: 'Cherries'});
        userEvent.clear(cherriesCheckBox);
        userEvent.click(cherriesCheckBox);
        expect(grandTotal).toHaveTextContent('1.50');

        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('5.50');
    });
});