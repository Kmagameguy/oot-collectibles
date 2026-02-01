import React from "react";
import type { HeartPiece } from "../types/HeartPiece";
import "./HeartPieceCard.css";

interface Props {
  piece: HeartPiece;
  collected: boolean;
  onToggleCollected?: (id: string) => void;
}

export const HeartPieceCard: React.FC<Props> = ({
  piece,
  collected,
  onToggleCollected,
}) => {
  return (
    <div className={`card ${collected ? "collected" : ""}`}>
      <header className="card-header">
        {piece.region} - {piece.name}
      </header>

      <div className="card-age">Age: {piece.age}</div>

      {piece.requirements.length > 0 && (
        <div className="card-requirements">
          Requirements: {piece.requirements.join(", ")}
        </div>
      )}

      <div className="card-description">{piece.description}</div>

      {onToggleCollected && (
        <button
          className="card-toggle"
          onClick={() => onToggleCollected(piece.id)}
        >
          {collected ? "Mark as Uncollected" : "Mark as Collected"}
        </button>
      )}
    </div>
  );
};
