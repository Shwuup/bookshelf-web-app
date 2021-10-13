import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

describe("DeleteButton", () => {
  test("calls callback functions successfully", () => {
    const mockCallback = jest.fn((mockBookStatusId) =>
      console.log(mockBookStatusId)
    );
    render(
      <DeleteButton
        deleteOnClick={mockCallback}
        renderWithoutDeletedItem={mockCallback}
        bookStatusId={5}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockCallback.mock.calls.length).toBe(2);
  });
});
