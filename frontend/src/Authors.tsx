import React, { Fragment } from "react";

const Authors = (props: any) => (
  <Fragment>
    <div>
      {props.authors.map((author: any, index: number) =>
        index === props.authors.length - 1 ? (
          <span>
            <a href={"/author/" + author.id}>{author.name}</a>&nbsp;
          </span>
        ) : (
          <span>
            <a href={"/author/" + author.id}>{author.name}</a>,&nbsp;
          </span>
        )
      )}
    </div>
  </Fragment>
);
export default Authors;
