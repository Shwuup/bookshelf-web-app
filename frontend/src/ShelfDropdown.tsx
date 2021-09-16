import React, { Fragment } from "react";
import { Dropdown } from "semantic-ui-react";
import styles from "./ShelfDropdown.module.css";

const statusOptions = [
  {
    key: "Currently reading",
    text: "Currently reading",
    value: "reading",
  },
  {
    key: "Read",
    text: "Read",
    value: "read",
  },
  {
    key: "Want to read",
    text: "Want to read",
    value: "want to read",
  },
];
const ShelfDropdown = (props: any) => (
  <Fragment>
    <div className={styles.container}>
      <Dropdown
        placeholder="Select a shelf"
        defaultValue={props.bookStatus.status}
        fluid
        selection
        onChange={(_, data) => {
          props.onDropdownClick(data.value, { ...props.update });
        }}
        options={statusOptions}
      />
    </div>
  </Fragment>
);

export default ShelfDropdown;
