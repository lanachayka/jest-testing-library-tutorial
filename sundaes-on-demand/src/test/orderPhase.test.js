import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test('order phases for happy path', async () => {
    // render app
    render(<App/>);

    // add ice creams and toppings
    const vanillaInput = await screen.findByRole('spinbutton', {name: "Vanilla"});
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const chocolateInput = screen.getByRole('spinbutton', {name: "Chocolate"});
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');

    const cherriesCheckbox = await screen.findByRole('checkbox', {name: "Cherries"});
    userEvent.clear(cherriesCheckbox);
    userEvent.click(cherriesCheckbox);

    // find and click order button
    const orderSummaryButton = screen.getByRole('button', {name: /order sundae/i});
    userEvent.click(orderSummaryButton);

    // check summary information based on order
    const summaryHeading = screen.getByRole('heading', {name: "Order Summary"});
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading', {name: "Scoops: $6.00"});
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole('heading', {name: "Toppings: $1.50"});
    expect(toppingsHeading).toBeInTheDocument();

    //check summary options items
    expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
    expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Cherries')).toBeInTheDocument();

    // accept terms and condition and click button to confirm order
    const tcCheckbox = screen.getByRole('checkbox', {name: /terms and condition/i});
    userEvent.click(tcCheckbox);

    const confirmOrderButton = screen.getByRole('button', {name: /confirm order/i});
    userEvent.click(confirmOrderButton);

    // confirm order number on conformation page
    const thankYouHeader = await screen.findByRole('heading', {name: /thank you!/i});
    expect(thankYouHeader).toBeInTheDocument();

    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // click "new order" button on conformation page
    const newOrderButton = screen.getByRole('button', {name: /new order/i});
    expect(newOrderButton).toBeInTheDocument();

    // check that scoops and toppings subtotals have been reset
    userEvent.click(newOrderButton);
    const scoopsTotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText('Toppings total: $0.00');
    expect(toppingsTotal).toBeInTheDocument();

    await screen.findByRole('spinbutton', {name: 'Vanilla'});
    await screen.findByRole('checkbox', {name: 'Cherries'});
});