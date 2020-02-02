import React, { useState } from "react";
import { Form, Radio } from "semantic-ui-react";

const RadioButtons = props => {
  const [radioState, setRadioState] = useState({ value: props.newReadStatus });
  const handleChange = (e, { value }) => setRadioState({ value: value });

  return (
    <Form>
      <Form.Field></Form.Field>
      <Form.Field>
        <Radio
          label="Unread"
          name="radioGroup"
          value="unread"
          checked={radioState.value === "unread"}
          onChange={props.handleChange}
          onClick={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Read"
          name="radioGroup"
          value="read"
          checked={radioState.value === "read"}
          onChange={props.handleChange}
          onClick={handleChange}
        />
      </Form.Field>
    </Form>
  );
};

export default RadioButtons;
