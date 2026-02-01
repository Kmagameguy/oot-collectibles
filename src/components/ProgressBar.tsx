import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const entries = Array.from({ length: total }, (_, index) => index < current);

  return (
    <div className="progress-container">
      {entries.map((filled, index) => (
        <span key={index} className={`entry ${filled ? "filled" : ""}`}>
          ♥
        </span>
      ))}
    </div>
  );
};
