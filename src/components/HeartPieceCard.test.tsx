import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { HeartPieceCard } from "./HeartPieceCard";
import type { HeartPiece } from "../types/HeartPiece";

const mockPiece: HeartPiece = {
  id: "hp-1",
  region: "Ice Cavern",
  name: "Sample Heart Piece 1",
  age: "Any",
  timeOfDay: "Any",
  requirements: ["Item 1", "Item 2"],
  description: "This is a sample heart piece found in the sample region.",
};

describe("HeartPieceCard", () => {
  it("renders basic heart piece information", () => {
    render(<HeartPieceCard piece={mockPiece} collected={false} />);

    expect(
      screen.getByText(`${mockPiece.region} - ${mockPiece.name}`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Age: ${mockPiece.age}`)).toBeInTheDocument();
    expect(screen.getByText(mockPiece.description)).toBeInTheDocument();
  });

  it("renders requirements if present", () => {
    render(<HeartPieceCard piece={mockPiece} collected={false} />);

    expect(screen.getByText(/Requirements:/)).toHaveTextContent(
      "Requirements: Item 1, Item 2",
    );
  });

  it("does not render requirements if empty", () => {
    const pieceWithoutRequirements = { ...mockPiece, requirements: [] };
    render(
      <HeartPieceCard piece={pieceWithoutRequirements} collected={false} />,
    );

    expect(screen.queryByText(/Requirements:/)).toBeNull();
  });

  it("shows the collected button when onToggleCollected is provided", async () => {
    const onToggleCollected = vi.fn();
    const { rerender } = render(
      <HeartPieceCard
        piece={mockPiece}
        collected={false}
        onToggleCollected={onToggleCollected}
      />,
    );

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Mark as Collected");

    await userEvent.click(button);
    expect(onToggleCollected).toHaveBeenCalledWith(mockPiece.id);

    rerender(
      <HeartPieceCard
        piece={mockPiece}
        collected
        onToggleCollected={onToggleCollected}
      />,
    );
    expect(screen.getByRole("button")).toHaveTextContent("Mark as Uncollected");
  });

  it("does not render button if onToggleCollected is not provided", () => {
    render(<HeartPieceCard piece={mockPiece} collected={false} />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
