import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import App, { MESSAGES, shuffleFriends } from "./App";
import friends from "./friends.json";

function mount() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  ReactDOM.render(<App />, div);
  return div;
}

function cards(div) {
  return Array.from(div.querySelectorAll('[data-testid="friend-card"]'));
}

function cardWithId(div, id) {
  return div.querySelector(`[data-id="${id}"]`);
}

function scoreText(div) {
  return div.querySelector(".alignRight").textContent;
}

function messageText(div) {
  return div.querySelector("#rw").textContent;
}

afterEach(() => {
  document.body.innerHTML = "";
});

it("renders one card per friend", () => {
  const div = mount();
  expect(cards(div)).toHaveLength(friends.length);
  expect(scoreText(div)).toBe("Score - Top: 0 | Current: 0");
});

it("increments the score on a first click and shuffles the cards", () => {
  const div = mount();
  const orderBefore = cards(div).map(c => c.getAttribute("data-id"));

  Simulate.click(cardWithId(div, 1));

  expect(scoreText(div)).toBe("Score - Top: 1 | Current: 1");
  expect(messageText(div)).toBe(MESSAGES.correct);
  // Every card should still be present after the shuffle
  const orderAfter = cards(div).map(c => c.getAttribute("data-id"));
  expect(orderAfter.slice().sort()).toEqual(orderBefore.slice().sort());
});

it("resets the current score but keeps the top score on a repeat click", () => {
  const div = mount();
  Simulate.click(cardWithId(div, 1));
  Simulate.click(cardWithId(div, 2));
  Simulate.click(cardWithId(div, 1));

  expect(scoreText(div)).toBe("Score - Top: 2 | Current: 0");
  expect(messageText(div)).toBe(MESSAGES.incorrect);

  // A previously clicked card counts again after the reset
  Simulate.click(cardWithId(div, 2));
  expect(scoreText(div)).toBe("Score - Top: 2 | Current: 1");
});

it("declares a win after every card is clicked once and then starts a new game", () => {
  const div = mount();
  friends.forEach(friend => Simulate.click(cardWithId(div, friend.id)));

  expect(scoreText(div)).toBe(
    `Score - Top: ${friends.length} | Current: ${friends.length}`
  );
  expect(messageText(div)).toBe(MESSAGES.win);

  // The next click begins a fresh round instead of counting as a repeat
  Simulate.click(cardWithId(div, 1));
  expect(scoreText(div)).toBe(`Score - Top: ${friends.length} | Current: 1`);
  expect(messageText(div)).toBe(MESSAGES.correct);
});

it("shuffleFriends returns a new array with the same items", () => {
  const input = friends.slice();
  const output = shuffleFriends(input);
  expect(output).not.toBe(input);
  expect(input).toEqual(friends);
  expect(output.slice().sort((a, b) => a.id - b.id)).toEqual(friends);
});
