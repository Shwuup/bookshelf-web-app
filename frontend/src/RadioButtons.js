import React, { useState } from "react";
import { Radio } from "semantic-ui-react";

const RadioButtons = props => {
  const [radioState, setRadioState] = useState({ value: props.newReadStatus });

  const handleChange = () => {
    if (radioState.value === "unread") {
      setRadioState({ value: "read" });
    } else if (radioState.value === "read") {
      setRadioState({ value: "unread" });
    }
  };

  const readOrNot = () => {
    return radioState.value === "unread" ? "read" : "unread";
  };

  return (
    <Radio
      value={readOrNot()}
      onClick={handleChange}
      onChange={props.handleChange}
      checked={radioState.value === "read"}
      slider
      label="Read"
    />
  );
};

export default RadioButtons;
