# Rick and Morty Clicky Game

A React memory game. Sixteen Rick and Morty characters are shown in a grid. Click each one exactly once to win. Click any character a second time and your score resets to zero. The cards shuffle after every click, so you have to remember faces, not positions.

Live site: https://jagnoor.github.io/ClickyGame/

## How it works
- Every click shuffles the grid into a random order.
- The first click on a character adds one point. The best score is kept across rounds.
- Clicking a character you already clicked resets the current score and starts a new round.
- Reaching 16 wins the round. The next click starts a fresh game.

## Characters
Rick Sanchez, Morty Smith, Summer Smith, Beth Smith, Jerry Smith, Birdperson, Mr. Meeseeks, Mr. Poopybutthole, Pickle Rick, Evil Morty, Squanchy, Snuffles, Scary Terry, Abradolf Lincler, Jessica, and Toxic Rick.

Portraits are 300x300 JPEGs bundled in `public/characters/`, sourced from the open source [Rick and Morty API](https://github.com/afuh/rick-and-morty-api). Rick and Morty and its characters are the property of Adult Swim. This is a non-commercial fan project.

## Responsive layout
- Phones in portrait and tablets show a 4 by 4 grid that scales with the screen.
- Phones in landscape switch to an 8 by 2 grid so all 16 cards fit without scrolling.
- Hover effects only apply on devices with a mouse. Touch devices get press feedback instead.
- Safe-area insets are respected on iPhones with a notch.

## Technologies used
- React (create-react-app)
- CSS Grid, custom properties, and media queries
- Jest for unit tests
- GitHub Actions for CI and GitHub Pages deployment

## Installation
- clone the repository
- change into the new directory
- `npm install`

## Running
- `npm start` to run the development server at http://localhost:3000
- `npm test` to run the unit tests
- `npm run build` to create a production build in `build/`

## Deployment
Every push to `master` runs the tests and build, then publishes `build/` to GitHub Pages through `.github/workflows/deploy-pages.yml`.
