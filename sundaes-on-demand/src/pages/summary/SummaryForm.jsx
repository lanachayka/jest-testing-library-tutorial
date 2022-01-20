import {useState} from "react";
import {Popover, PopoverBody, Form, Button, OverlayTrigger} from "react-bootstrap";

export default function SummaryForm({setOrderPhase}) {
    const [checked, setChecked] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        setOrderPhase('completed');
    }

    const popover = (
        <Popover id="popover-basic">
            <PopoverBody>
                No ice cream will actually be delivered
            </PopoverBody>
        </Popover>
    );

    const checkboxLabel = (
        <span>
            I agree to
            <OverlayTrigger overlay={popover} placement="right">
                <span style={{color: "blue"}}> Terms and Conditions</span>
            </OverlayTrigger>
        </span>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!checked}>
                Confirm order
            </Button>
        </Form>
    )
}