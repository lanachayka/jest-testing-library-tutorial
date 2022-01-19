import OrderEntry from "./pages/entry/OrderEntry";
import {Container} from "react-bootstrap";
import {OrderDetailsProvider} from "./context/OrderDetails";

function App() {
  return (
    <Container>
        <OrderDetailsProvider>
            <OrderEntry />
        </OrderDetailsProvider>
    </Container>
  );
}

export default App;
