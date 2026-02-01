import { useState } from "react";
import "./App.css";
import { heartPieces } from "./data/loadHeartPieces";
import { AGE_REQUIREMENTS } from "./types/Age";
import type { AgeRequirement } from "./types/Age";
import { REGION_REQUIREMENTS } from "./types/Region";
import type { RegionRequirement } from "./types/Region";
import { TIME_REQUIREMENTS } from "./types/Time";
import type { TimeRequirement } from "./types/Time";
import { HeartPieceCard } from "./components/HeartPieceCard";

import Filters from "./components/Filters";
import { ProgressBar } from "./components/ProgressBar";

type RegionFilter = RegionRequirement;
type AgeFilter = AgeRequirement;
type TimeOfDayFilter = TimeRequirement;

const allPieces = heartPieces;

export const App: React.FC = () => {
  const [ageFilter, setAgeFilter] = useState<AgeFilter>("Any");
  const [regionFilter, setRegionFilter] = useState<RegionFilter>("All");
  const [timesOfDayFilter, setTimeOfDayFilter] =
    useState<TimeOfDayFilter>("Any");
  const [collectedHeartPieceIds, setCollectedHeartPieceIds] = useState<
    string[]
  >(() => {
    const saved = localStorage.getItem("collectedHeartPieces");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleCollectedHeartPieces = (id: string) => {
    setCollectedHeartPieceIds((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((pid) => pid !== id); //uncollect
      } else {
        updated = [...prev, id]; //collect
      }
      localStorage.setItem("collectedHeartPieces", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredPieces = allPieces.filter((piece) => {
    const matchesAge = () => {
      if (ageFilter === "Any") return true;

      return piece.age === "Both" || piece.age === ageFilter;
    };

    const matchesRegion = () => {
      if (regionFilter === "All") return true;
      return piece.region === regionFilter;
    };

    const matchesTimeOfDay = () => {
      if (timesOfDayFilter === "Any") return true;
      return piece.timeOfDay === timesOfDayFilter;
    };

    return matchesAge() && matchesRegion() && matchesTimeOfDay();
  });

  return (
    <main>
      <h1>Ocarina of Time - Heart Pieces</h1>

      <Filters
        ages={AGE_REQUIREMENTS}
        ageFilter={ageFilter}
        regions={REGION_REQUIREMENTS}
        regionFilter={regionFilter}
        timesOfDay={TIME_REQUIREMENTS}
        timesOfDayFilter={timesOfDayFilter}
        onAgeChange={setAgeFilter}
        onRegionChange={setRegionFilter}
        onTimeChange={setTimeOfDayFilter}
      />

      <ProgressBar
        current={collectedHeartPieceIds.length}
        total={heartPieces.length}
      />

      <div className="cards-container">
        {filteredPieces.map((piece) => (
          <HeartPieceCard
            key={piece.id}
            piece={piece}
            collected={collectedHeartPieceIds.includes(piece.id)}
            onToggleCollected={toggleCollectedHeartPieces}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
