import React, { Fragment } from "react";
import UpdateItem from "./UpdateItem";
import { Update } from "./types";

const UpdateFeed = (props: any) => (
  <Fragment>
    <h3>Recent Updates</h3>
    {props.updates.map((update: Update) => (
      <UpdateItem
        key={update.update_id}
        update={update}
        onDropdownClick={props.onDropdownClick}
      ></UpdateItem>
    ))}
  </Fragment>
);
export default UpdateFeed;
