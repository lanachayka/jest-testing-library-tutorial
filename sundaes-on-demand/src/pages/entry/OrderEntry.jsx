import Options from "./Options";
import {useOrderDetails} from "../../context/OrderDetails";

export default function OrderEntry(){
    const [orderDetails] = useOrderDetails();
    return (
        <div>
            <h2>Design Your Sundae!</h2>
            <Options optionType="scoops"/>
            <Options optionType="toppings"/>
            <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
        </div>
    )
}
