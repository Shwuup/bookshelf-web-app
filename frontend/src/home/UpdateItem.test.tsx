import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdateItem from "./UpdateItem";
import { Update } from "../types";
describe("UpdateItem", () => {
  const update = {
    update_id: 1,
    rating: 5,
    status: "rating",
    timestamp: 1632739030,
    book_status: {
      book_status_id: 1,
      book: {
        title: "Alice's Adventures in Wonderland and Through the Looking-Glass",
        author: [
          {
            id: 8,
            name: "Lewis Carroll",
          },
        ],
        image:
          "https://booklist-images.s3.ap-southeast-2.amazonaws.com/alice_in_wonderland.jpg",
        book_id: 9,
        blurb:
          "Lewis Carroll's novels Alice's Adventures in Wonderland and Through the Looking Glass (first published in 1865 and 1871, respectively) have entertained readers young and old for more than a century. Their magical worlds, amusing characters, clever dialogue, and playfully logical illogic epitomize the whit and whimsy of Carroll's writing. Both stories feature the coloured classic illustrations of John Tenniel. Alice's Adventures in wonderland and Through the Looking Glass is one of Barnes & Noble's leather bound classics for children. It features classic illustrations, an elegant bonded leather binding, a satin-ribbon bookmark, and distinctive gilt edging.",
      },
      status: "read",
      rating: 5,
      timestamp: 1627084800,
    },
  };
  test("renders properly", () => {
    render(
      <UpdateItem
        update={update}
        deleteOnClick={(id: number) => console.log(id)}
        renderWithoutDeletedItem={(id: number) => console.log(id)}
        onDropdownClick={(status: string, update: Update) =>
          console.log(status)
        }
      />
    );
  });
});
