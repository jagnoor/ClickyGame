import React, { Component } from "react";
import Nav from "./components/Nav";
import CharacterCard from "./components/CharacterCard";
import characters from "./characters.json";
import "./App.css";

// Fisher-Yates shuffle that returns a new array instead of mutating the input
export function shuffleCharacters(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const MESSAGES = {
  start: "Tap a character to start",
  correct: "Nice! Keep going.",
  incorrect: "Aw geez, you already clicked that one!",
  win: "Wubba Lubba Dub Dub! You got all 16. Tap any character to play again."
};

class App extends Component {
  state = {
    characters,
    currentScore: 0,
    topScore: 0,
    message: MESSAGES.start,
    status: "",
    clicked: []
  };

  handleClick = id => {
    const { clicked, currentScore, topScore, characters } = this.state;
    const total = characters.length;
    // A finished round stays on screen until the next click starts a new game
    const startingNewGame = currentScore === total;

    if (!startingNewGame && clicked.indexOf(id) !== -1) {
      this.handleReset();
      return;
    }

    const newScore = startingNewGame ? 1 : currentScore + 1;
    const won = newScore === total;

    this.setState({
      currentScore: newScore,
      topScore: Math.max(topScore, newScore),
      message: won ? MESSAGES.win : MESSAGES.correct,
      status: won ? "win" : "good",
      clicked: startingNewGame ? [id] : clicked.concat(id),
      characters: shuffleCharacters(characters)
    });
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      message: MESSAGES.incorrect,
      status: "bad",
      clicked: [],
      characters: shuffleCharacters(this.state.characters)
    });
  };

  render() {
    const total = this.state.characters.length;
    return (
      <div className="app">
        <Nav
          title="Rick and Morty Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          total={total}
          message={this.state.message}
          status={this.state.status}
        />

        <main className="board">
          <p className="instructions">
            Tap each character once to win. Tap one twice and Rick sends you
            back to zero.
          </p>

          <div className="grid" data-testid="grid">
            {this.state.characters.map(character => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={`${process.env.PUBLIC_URL}/${character.image}`}
                handleClick={this.handleClick}
              />
            ))}
          </div>
        </main>

        <footer className="footer">
          Fan project. Rick and Morty and all character images are the property
          of Adult Swim. Images via the Rick and Morty API.
        </footer>
      </div>
    );
  }
}
export default App;
