# Horror Game

A simple yet thrilling horror game built with React and Howler.js. In this game, you navigate a dark grid, avoiding a monster and finding hidden clues to escape. The monster can only hear you based on your movements, and the closer it gets, the more intense the background music becomes.

## Table of Contents

- [Game Description](#game-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Unique Network and Polkadot Integration](#unique-network-and-polkadot-integration)
- [Credits](#credits)
- [Screenshots](#screenshots)
- [Videos](#videos)

## Game Description

The goal of the game is to find all 5 hidden clues within the grid while avoiding the monster. The player can move using the `W`, `A`, `S`, `D` keys. The monster moves closer to the player based on random decisions, and the game ends if the monster catches the player or the time runs out.

## Features

- **Grid-based movement**: Navigate a 5x5 grid using keyboard controls.
- **Clue collection**: Find all 5 hidden clues to win the game.
- **Monster proximity**: The monster moves closer to the player based on random decisions and proximity.
- **Sound effects**: Background music and sound effects enhance the horror experience.
- **Dynamic messages**: Informative messages guide the player throughout the game.
- **Credit system**: Earn or lose credits based on your performance.
- **User profiles**: Integrated with Unique Network and Polkadot parachains for user logins and profile creation.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/horror-game.git
    cd horror-game
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000/horror`.
2. Use the `W`, `A`, `S`, `D` keys to move around the grid.
3. Find all 5 clues while avoiding the monster to win the game.

## Unique Network and Polkadot Integration

The game utilizes Unique Network and Polkadot parachains for enhanced user experience:

- **User Logins**: Users can log in using their Polkadot accounts.
- **Profile Creation**: User profiles are created and managed through the Unique Network.
- **NFT-based Rewards**: Players can earn NFT-based rewards that are stored on the Polkadot network.

To integrate with Unique Network and Polkadot:

1. Install the Polkadot.js extension for managing accounts.
2. Follow the instructions in the project to connect your Polkadot account.
3. Create and manage user profiles directly within the game.

## Credits

- Developed by Stone Liu & Daniel Wijaya
- Sound effects by Various stock effects
- Background music by Various

## Screenshots

![Game Start](./screenshots/game-start.png)
*Caption: The game start screen.*

![In-Game](./screenshots/in-game.png)
*Caption: In-game screenshot.*

![Game Over](./screenshots/game-over.png)
*Caption: Game over screen.*

## Videos

![Gameplay Video](./videos/gameplay-video.mp4)
*Caption: Full gameplay video.*

