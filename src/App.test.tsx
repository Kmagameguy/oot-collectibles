import { vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "./App";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] ?? null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

vi.mock("./data/loadHeartPieces", () => ({
  heartPieces: [
    {
      id: "dc_1",
      name: "Desert Colossus 1",
      region: "Desert Colossus",
      age: "Child",
      timeOfDay: "Any",
      requirements: ["Magic Beans"],
      description:
        "Plant a magic bean in the soil patch just in front of the Spirit Temple entrance. Return as an adult and ride the magic plant to reach the top of the stone archway. Collect the Piece of Heart on top.",
    },
    {
      id: "dm_crater_1",
      name: "Death Mountain Crater 1",
      region: "Death Mountain",
      age: "Adult",
      timeOfDay: "Any",
      requirements: [],
      description:
        "Inside Death Mountain is a huge wall you can climb with an alcove in the center.  Reach the alcove to find a Piece of Heart.",
    },
  ],
}));

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the main heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /ocarina of time - heart pieces/i }),
    ).toBeInTheDocument();
  });

  it("renders the heart piece cards", () => {
    render(<App />);

    expect(
      screen.getByText("Desert Colossus - Desert Colossus 1"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Death Mountain - Death Mountain Crater 1"),
    ).toBeInTheDocument();
  });

  it("filters heart pieces by age", async () => {
    const user = userEvent.setup();
    render(<App />);

    const ageSelect = screen.getByLabelText(/age/i);
    await user.selectOptions(ageSelect, "Adult");

    expect(
      screen.queryByText("Desert Colossus - Desert Colossus 1"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Death Mountain - Death Mountain Crater 1"),
    ).toBeInTheDocument();
  });

  it("shows a message when no heart pieces match filters", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByLabelText(/age/i), "Adult");
    await user.selectOptions(
      screen.getByLabelText(/region/i),
      "Desert Colossus",
    );

    expect(
      screen.getByText(/no heart pieces match your current filters/i),
    ).toBeInTheDocument();
  });

  it("allows colleccting and uncollecting heart pieces", async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen
      .getByText(/death mountain crater 1/i)
      .closest(".card")! as HTMLElement;

    const button = within(card).getByRole("button", {
      name: /mark as collected/i,
    });

    await user.click(button);

    expect(
      within(card).getByRole("button", { name: /unmark|collected/i }),
    ).toBeInTheDocument();

    await user.click(button);

    expect(
      within(card).getByRole("button", { name: /mark as collected/i }),
    ).toBeInTheDocument();
  });

  it("persists collected heart pieces in localStorage", async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen
      .getByText(/death mountain crater 1/i)
      .closest(".card")! as HTMLElement;

    const button = within(card).getByRole("button", {
      name: /mark as collected/i,
    });

    await user.click(button);

    const stored = JSON.parse(
      localStorage.getItem("collectedHeartPieces") || "[]",
    );

    expect(stored).toContain("dm_crater_1");
  });
});
