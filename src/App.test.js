import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import App, { MESSAGES, shuffleCharacters } from "./App";
import characters from "./characters.json";

function mount() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  ReactDOM.render(<App />, div);
  return div;
}

function cards(div) {
  return Array.from(div.querySelectorAll('[data-testid="character-card"]'));
}

function cardWithId(div, id) {
  return div.querySelector(`[data-id="${id}"]`);
}

function score(div) {
  return div.querySelector('[data-testid="score"]').textContent;
}

function topScore(div) {
  return div.querySelector('[data-testid="top-score"]').textContent;
}

function message(div) {
  return div.querySelector("#rw").textContent;
}

afterEach(() => {
  document.body.innerHTML = "";
});

it("has exactly 16 characters with unique ids, names, and images", () => {
  expect(characters).toHaveLength(16);
  const unique = key => new Set(characters.map(c => c[key])).size;
  expect(unique("id")).toBe(16);
  expect(unique("name")).toBe(16);
  expect(unique("image")).toBe(16);
});

it("renders one card per character with the starting message", () => {
  const div = mount();
  expect(cards(div)).toHaveLength(16);
  expect(score(div)).toBe("0/16");
  expect(topScore(div)).toBe("0");
  expect(message(div)).toBe(MESSAGES.start);
});

it("increments the score on a first click and shuffles the cards", () => {
  const div = mount();
  const before = cards(div).map(c => c.getAttribute("data-id"));

  Simulate.click(cardWithId(div, 1));

  expect(score(div)).toBe("1/16");
  expect(topScore(div)).toBe("1");
  expect(message(div)).toBe(MESSAGES.correct);
  const after = cards(div).map(c => c.getAttribute("data-id"));
  expect(after.slice().sort()).toEqual(before.slice().sort());
});

it("resets the current score but keeps the best score on a repeat click", () => {
  const div = mount();
  Simulate.click(cardWithId(div, 1));
  Simulate.click(cardWithId(div, 2));
  Simulate.click(cardWithId(div, 1));

  expect(score(div)).toBe("0/16");
  expect(topScore(div)).toBe("2");
  expect(message(div)).toBe(MESSAGES.incorrect);

  Simulate.click(cardWithId(div, 2));
  expect(score(div)).toBe("1/16");
});

it("wins at 16 and then starts a new game on the next click", () => {
  const div = mount();
  characters.forEach(c => Simulate.click(cardWithId(div, c.id)));

  expect(score(div)).toBe("16/16");
  expect(topScore(div)).toBe("16");
  expect(message(div)).toBe(MESSAGES.win);

  Simulate.click(cardWithId(div, 1));
  expect(score(div)).toBe("1/16");
  expect(topScore(div)).toBe("16");
  expect(message(div)).toBe(MESSAGES.correct);
});

it("shuffleCharacters returns a new array with the same items", () => {
  const input = characters.slice();
  const output = shuffleCharacters(input);
  expect(output).not.toBe(input);
  expect(input).toEqual(characters);
  expect(output.slice().sort((a, b) => a.id - b.id)).toEqual(characters);
});
