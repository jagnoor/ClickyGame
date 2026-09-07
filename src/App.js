import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import friends from "./friends.json";
import "./App.css";

// Fisher-Yates shuffle that returns a new array instead of mutating the input
export function shuffleFriends(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const MESSAGES = {
  correct: "You guessed correctly!",
  incorrect: "You guessed incorrectly!",
  win: "You win! Click any image to play again."
};

class App extends Component {
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    correctIncorrect: "",
    clicked: []
  };

  handleClick = id => {
    const { clicked, currentScore, topScore, friends } = this.state;
    const total = friends.length;
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
      correctIncorrect: won ? MESSAGES.win : MESSAGES.correct,
      clicked: startingNewGame ? [id] : clicked.concat(id),
      friends: shuffleFriends(friends)
    });
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      correctIncorrect: MESSAGES.incorrect,
      clicked: [],
      friends: shuffleFriends(this.state.friends)
    });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="React Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          correctIncorrect={this.state.correctIncorrect}
        />

        <Title>
          Click on an image to earn points, but don't click on any more than once!
        </Title>
        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column key={friend.id} size="md-3 sm-6">
                <FriendCard
                  handleClick={this.handleClick}
                  id={friend.id}
                  image={friend.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}
export default App;
