import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResult from "./SearchResult";

describe("SearchResult", () => {
  test("renders successfully", () => {
    const book = {
      title: "Norwegian Wood",
      author: [
        {
          id: 12,
          name: "Haruki Murakami",
        },
        {
          id: 13,
          name: "Jay Rubin",
        },
      ],
      image:
        "https://booklist-images.s3.ap-southeast-2.amazonaws.com/norwegian_wood.jpg",
    };
    const { title, author, image } = book;
    render(<SearchResult title={title} author={author} image={image} />);
    expect(screen.getByText("Norwegian Wood")).toBeInTheDocument();
    expect(screen.getByText("Haruki Murakami")).toBeInTheDocument();
    expect(screen.getByText("Jay Rubin")).toBeInTheDocument();
  });
});
