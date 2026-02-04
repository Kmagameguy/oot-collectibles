import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders the correct number of entries", () => {
    render(<ProgressBar current={2} total={5} />);

    const entries = screen.getAllByText("♥");
    expect(entries).toHaveLength(5);
  });

  it("fills the correct number of entries", () => {
    render(<ProgressBar current={3} total={5} />);

    const entries = screen.getAllByText("♥");
    entries.forEach((entry, index) => {
      if (index < 3) {
        expect(entry).toHaveClass("filled");
      } else {
        expect(entry).not.toHaveClass("filled");
      }
    });
  });

  it("renders zero filled entries when current is 0", () => {
    render(<ProgressBar current={0} total={4} />);

    const entries = screen.getAllByText("♥");
    entries.forEach((entry) => {
      expect(entry).not.toHaveClass("filled");
    });
  });

  it("renders all entries filled when current equals total", () => {
    render(<ProgressBar current={5} total={5} />);
    const entries = screen.getAllByText("♥");
    entries.forEach((entry) => {
      expect(entry).toHaveClass("filled");
    });
  });

  it("renders nothing if total is 0", () => {
    render(<ProgressBar current={0} total={0} />);
    const entries = screen.queryAllByText("♥");
    expect(entries).toHaveLength(0);
  });
});
