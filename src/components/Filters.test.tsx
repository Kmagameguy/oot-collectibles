import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "./Filters";
import type { AgeRequirement } from "../types/Age";
import type { RegionRequirement } from "../types/Region";
import type { TimeRequirement } from "../types/Time";

describe("Filters", () => {
  const ages = ["Any", "Both", "Child", "Adult"] as const;
  const regions = ["Kokiri Forest", "Hyrule Field"] as const;
  const timesOfDay = ["Any", "Day", "Night"] as const;

  let selectedAge: AgeRequirement = "Any";
  let selectedRegion: RegionRequirement = "Kokiri Forest";
  let selectedTime: TimeRequirement = "Day";

  const onAgeChange = vi.fn((age: AgeRequirement) => {
    selectedAge = age;
  });
  const onRegionChange = vi.fn((region: RegionRequirement) => {
    selectedRegion = region;
  });
  const onTimeChange = vi.fn((time: TimeRequirement) => {
    selectedTime = time;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all the options for each filter", () => {
    render(
      <Filters
        ages={ages}
        ageFilter={selectedAge}
        regions={regions}
        regionFilter={selectedRegion}
        timesOfDay={timesOfDay}
        timesOfDayFilter={selectedTime}
        onAgeChange={onAgeChange}
        onRegionChange={onRegionChange}
        onTimeChange={onTimeChange}
      />,
    );

    const ageSelect = screen.getByLabelText(/age/i);
    ages.forEach((age) => {
      expect(
        within(ageSelect).getByRole("option", { name: age }),
      ).toBeInTheDocument();
    });

    const regionSelect = screen.getByLabelText(/region/i);
    regions.forEach((region) => {
      expect(
        within(regionSelect).getByRole("option", { name: region }),
      ).toBeInTheDocument();
    });

    const timeSelect = screen.getByLabelText(/time of day/i);
    timesOfDay.forEach((time) => {
      expect(
        within(timeSelect).getByRole("option", { name: time }),
      ).toBeInTheDocument();
    });
  });

  it("shows the correct selected value initially", () => {
    render(
      <Filters
        ages={ages}
        ageFilter="Adult"
        regions={regions}
        regionFilter="Hyrule Field"
        timesOfDay={timesOfDay}
        timesOfDayFilter="Night"
        onAgeChange={onAgeChange}
        onRegionChange={onRegionChange}
        onTimeChange={onTimeChange}
      />,
    );

    const ageSelect = screen.getByLabelText(/age/i) as HTMLSelectElement;
    const regionSelect = screen.getByLabelText(/region/i) as HTMLSelectElement;
    const timeSelect = screen.getByLabelText(
      /time of day/i,
    ) as HTMLSelectElement;

    expect(ageSelect.value).toBe("Adult");
    expect(regionSelect.value).toBe("Hyrule Field");
    expect(timeSelect.value).toBe("Night");
  });

  it("calls the callback when a new option is selected", async () => {
    const user = userEvent.setup();

    render(
      <Filters
        ages={ages}
        ageFilter={selectedAge}
        regions={regions}
        regionFilter={selectedRegion}
        timesOfDay={timesOfDay}
        timesOfDayFilter={selectedTime}
        onAgeChange={onAgeChange}
        onRegionChange={onRegionChange}
        onTimeChange={onTimeChange}
      />,
    );

    const ageSelect = screen.getByLabelText(/age/i);
    const regionSelect = screen.getByLabelText(/region/i);
    const timeSelect = screen.getByLabelText(/time of day/i);

    await user.selectOptions(ageSelect, "Both");
    expect(onAgeChange).toHaveBeenCalledWith("Both");

    await user.selectOptions(regionSelect, "Hyrule Field");
    expect(onRegionChange).toHaveBeenCalledWith("Hyrule Field");

    await user.selectOptions(timeSelect, "Night");
    expect(onTimeChange).toHaveBeenCalledWith("Night");
  });
});
