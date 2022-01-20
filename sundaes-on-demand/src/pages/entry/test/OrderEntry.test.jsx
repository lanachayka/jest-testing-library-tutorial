import {render, screen, waitFor} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import {rest} from "msw";
import {server} from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test('handlers error for scoops and toppings routes ', async () => {
   server.resetHandlers(
       rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
          return res(ctx.status(500));
       }),
       rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
          return res(ctx.status(500));
       }),
   );

   render(<OrderEntry setOrderPhase={jest.fn()}/>);

   await waitFor(async() => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);
   })
});

test('disable order button if there are no scoops ordered', async() => {
    render(<OrderEntry setOrderPhase={jest.fn()}/>);

    //order button should be disabled at first, even before options load
    const orderButton = screen.getByRole('button', {name: /order sundae/i});
    expect(orderButton).toBeDisabled();

    //expect order button to be enabled after adding scoop
    const vanillaInput = await screen.findByRole('spinbutton', {name: "Vanilla"});
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(orderButton).toBeEnabled();

    //expect order button to be disabled after removing scoop
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '0');
    expect(orderButton).toBeDisabled();
});