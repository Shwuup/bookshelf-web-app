import React from "react";

const BookTitle = (props: any) => (
  <a href={"/book/" + props.book.book_id}>{props.book.title}</a>
);

export default BookTitle;
