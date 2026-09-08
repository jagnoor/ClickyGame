import React from "react";
import "./Nav.css";

const Nav = props => (
  <header className={`nav nav--${props.status || "idle"}`}>
    <div className="nav__inner">
      <a className="nav__brand" href={`${process.env.PUBLIC_URL}/`}>
        <span className="nav__portal" aria-hidden="true" />
        <span className="nav__title">{props.title}</span>
      </a>

      <p id="rw" className="nav__message" role="status" aria-live="polite">
        {props.message}
      </p>

      <div className="nav__scores">
        <div className="nav__score">
          <span className="nav__label">Score</span>
          <span className="nav__value" data-testid="score">
            {props.score}
            <small>/{props.total}</small>
          </span>
        </div>
        <div className="nav__score">
          <span className="nav__label">Best</span>
          <span className="nav__value" data-testid="top-score">
            {props.topScore}
          </span>
        </div>
      </div>
    </div>
  </header>
);

export default Nav;
