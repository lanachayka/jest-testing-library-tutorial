import OrderEntry from "./pages/entry/OrderEntry";
import {Container} from "react-bootstrap";
import {OrderDetailsProvider} from "./context/OrderDetails";
import {useState} from "react";
import OrderSummary from './pages/summary/OrderSummary'
import OrderConformation from "./pages/conformation/OrderConformation/OrderConformation";

function App() {

  const [orderPhase, setOrderPhase] = useState('inProgress');
  let Component = OrderEntry;
  switch (orderPhase){
      case 'inProgress':
          Component = OrderEntry;
          break;
      case 'review':
          Component = OrderSummary;
          break;
      case 'completed':
          Component = OrderConformation;
          break;
  }

  return (
        <OrderDetailsProvider>
           <Container>{<Component setOrderPhase={setOrderPhase}/>}</Container>
        </OrderDetailsProvider>
  );
}

export default App;
