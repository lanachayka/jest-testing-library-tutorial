import Options from "./Options";
import {useOrderDetails} from "../../context/OrderDetails";
import {Button} from "react-bootstrap";

export default function OrderEntry({setOrderPhase}){

    const [orderDetails] = useOrderDetails();

    const orderDisabled = orderDetails.totals.scoops === '$0.00';

    return (
        <div>
            <h2>Design Your Sundae!</h2>
            <Options optionType="scoops"/>
            <Options optionType="toppings"/>
            <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
            <Button onClick={()=>setOrderPhase('review')} disabled={orderDisabled}>
                Order Sundae!</Button>
        </div>
    )
}
