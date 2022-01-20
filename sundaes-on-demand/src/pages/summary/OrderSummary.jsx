import {useOrderDetails} from "../../context/OrderDetails";
import SummaryForm from "./SummaryForm";

export default function OrderSummary({setOrderPhase}){
    const [orderDetails] = useOrderDetails();

    const scoopsArray = Array.from(orderDetails.scoops.entries());
    const scoopList = scoopsArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    const toppingsArray = Array.from(orderDetails.toppings.entries());
    const toppingList = toppingsArray.map(([key, value]) => (
        <li key={key}>
            {key}
        </li>
    ));

    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {orderDetails.totals.scoops}</h2>
            <ul>{scoopList}</ul>
            <h2>Toppings: {orderDetails.totals.toppings}</h2>
            <ul>{toppingList}</ul>
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    )
}