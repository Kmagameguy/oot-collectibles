import type { AgeRequirement } from "../types/Age";
import type { RegionRequirement } from "../types/Region";
import type { TimeRequirement } from "../types/Time";
import "./Filters.css";

interface FiltersProps {
  ages: readonly AgeRequirement[];
  ageFilter: AgeRequirement;
  regions: readonly RegionRequirement[];
  regionFilter: RegionRequirement;
  timesOfDay: readonly TimeRequirement[];
  timesOfDayFilter: TimeRequirement;
  onAgeChange: (age: AgeRequirement) => void;
  onRegionChange: (region: RegionRequirement) => void;
  onTimeChange: (time: TimeRequirement) => void;
}

function Filters({
  ages,
  ageFilter,
  regions,
  regionFilter,
  timesOfDay,
  timesOfDayFilter,
  onAgeChange,
  onRegionChange,
  onTimeChange,
}: FiltersProps) {
  return (
    <section className="filters-container">
      <label>
        Region{" "}
        <select
          value={regionFilter}
          onChange={(e) => {
            onRegionChange(e.target.value as RegionRequirement);
          }}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </label>

      <label>
        Age{" "}
        <select
          value={ageFilter}
          onChange={(e) => onAgeChange(e.target.value as AgeRequirement)}
        >
          {ages.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </label>

      <label>
        Time of Day{" "}
        <select
          value={timesOfDayFilter}
          onChange={(e) => onTimeChange(e.target.value as TimeRequirement)}
        >
          {timesOfDay.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default Filters;
