import React from "react";
import { Button, Icon } from "semantic-ui-react";
import "./DeleteButton.css";

interface DeleteButtonProps {
  id: number;
  deleteOnClick: (id: number) => void;
  renderWithoutDeletedItem: (id: number) => void;
}
const DeleteButton = (props: DeleteButtonProps) => (
  <Button
    onClick={(event, _) => {
      event.stopPropagation();
      props.deleteOnClick(props.id);
      props.renderWithoutDeletedItem(props.id);
    }}
    className="deleteButton"
    floated="right"
    compact
  >
    <Icon fitted name="close" />
  </Button>
);

export default DeleteButton;
