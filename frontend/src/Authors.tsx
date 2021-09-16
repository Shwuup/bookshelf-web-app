import React, { Fragment } from "react";

const Authors = (props: any) => (
  <Fragment>
    <div>
      {props.authors.map((author: any, index: number) => (
        <span>
          <a href={"/author/" + author.id}>{author.name}</a>
          {index === props.authors.length - 1 ? "" : ",\u00A0"}
        </span>
      ))}
    </div>
  </Fragment>
);
export default Authors;
