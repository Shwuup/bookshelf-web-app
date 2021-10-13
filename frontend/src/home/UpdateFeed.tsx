import React, { Fragment } from "react";
import { Update } from "../types";
import UpdateItem from "./UpdateItem";

const UpdateFeed = (props: any) => (
  <Fragment>
    <h3>Recent Updates</h3>
    {props.updates.map((update: Update) => (
      <UpdateItem
        key={update.update_id}
        update={update}
        onDropdownClick={props.onDropdownClick}
        deleteOnClick={props.deleteOnClick}
        renderWithoutDeletedItem={props.renderWithoutDeletedItem}
      ></UpdateItem>
    ))}
  </Fragment>
);
export default UpdateFeed;
