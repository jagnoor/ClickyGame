import React from "react";
import "./FriendCard.css";

const FriendCard = props => (
  <div
    className="card"
    data-testid="friend-card"
    data-id={props.id}
    onClick={() => props.handleClick(props.id)}
  >
    <div className="img-container">
      <img alt={`Friend ${props.id}`} src={props.image} />
    </div>
  </div>
);

export default FriendCard;
