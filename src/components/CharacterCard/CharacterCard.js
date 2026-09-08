import React from "react";
import "./CharacterCard.css";

const CharacterCard = props => (
  <button
    type="button"
    className="card"
    data-testid="character-card"
    data-id={props.id}
    aria-label={props.name}
    onClick={() => props.handleClick(props.id)}
  >
    <span className="card__frame">
      <img
        className="card__image"
        alt={props.name}
        src={props.image}
        draggable="false"
      />
      <span className="card__name">{props.name}</span>
    </span>
  </button>
);

export default CharacterCard;
