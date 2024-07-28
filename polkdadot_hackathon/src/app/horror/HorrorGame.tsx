import React, { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import './HorrorGame.css';

interface Position {
  x: number;
  y: number;
}

const gridSize = 5;
const totalClues = 5;
const gameTime = 150; // 2.5 minutes in seconds

const HorrorGame: React.FC = () => {
  const generateClues = (): Position[] => {
    const clues: Position[] = [];
    while (clues.length < totalClues) {
      const cluePosition = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
      if (!clues.some((clue) => clue.x === cluePosition.x && clue.y === cluePosition.y)) {
        clues.push(cluePosition);
      }
    }
    return clues;
  };

  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 });
  const [monsterPosition, setMonsterPosition] = useState<Position>({ x: gridSize - 1, y: gridSize - 1 });
  const [clues, setClues] = useState<Position[]>(generateClues());
  const [foundClues, setFoundClues] = useState(0);
  const [message, setMessage] = useState('');
  const [credits, setCredits] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameTime);
  const [isMonsterClose, setIsMonsterClose] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      const validKeys = ['w', 'a', 's', 'd'];
      if (!validKeys.includes(e.key)) {
        setMessage('Invalid key! Use W, A, S, D to move.');
        return;
      }

      let newPlayerPosition = { ...playerPosition };
      switch (e.key) {
        case 'w':
          if (newPlayerPosition.y > 0) newPlayerPosition.y -= 1;
          break;
        case 'a':
          if (newPlayerPosition.x > 0) newPlayerPosition.x -= 1;
          break;
        case 's':
          if (newPlayerPosition.y < gridSize - 1) newPlayerPosition.y += 1;
          break;
        case 'd':
          if (newPlayerPosition.x < gridSize - 1) newPlayerPosition.x += 1;
          break;
        default:
          break;
      }
      if (newPlayerPosition.x !== playerPosition.x || newPlayerPosition.y !== playerPosition.y) {
        setPlayerPosition(newPlayerPosition);
        checkClue(newPlayerPosition);
        checkGridEdge(newPlayerPosition);
        moveMonster(newPlayerPosition);
        playSound('short_movement');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, monsterPosition, gameOver]);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame(false);
    }
  }, [timeLeft, gameOver]);

  const checkClue = (position: Position) => {
    if (clues.some((clue) => clue.x === position.x && clue.y === position.y)) {
      setClues(clues.filter((clue) => clue.x !== position.x || clue.y !== position.y));
      setFoundClues(foundClues + 1);
      setMessage('You found a clue!');
      playSound('clue');
      if (foundClues + 1 === totalClues) {
        endGame(true);
      }
    } else {
      setMessage('');
    }
  };

  const checkGridEdge = (position: Position) => {
    if (position.x === 0 || position.x === gridSize - 1 || position.y === 0 || position.y === gridSize - 1) {
      setMessage('You have reached the edge of the grid!');
    } else {
      setMessage('');
    }
  };

  const moveMonster = (newPlayerPosition: Position) => {
    let newMonsterPosition = { ...monsterPosition };

    // Randomly decide if the monster moves closer or farther from the player
    const moveCloser = Math.random() < 0.5;

    if (moveCloser) {
      if (Math.abs(newPlayerPosition.x - monsterPosition.x) > Math.abs(newPlayerPosition.y - monsterPosition.y)) {
        newMonsterPosition.x += newPlayerPosition.x > monsterPosition.x ? 1 : -1;
      } else {
        newMonsterPosition.y += newPlayerPosition.y > monsterPosition.y ? 1 : -1;
      }
    } else {
      if (Math.abs(newPlayerPosition.x - monsterPosition.x) > Math.abs(newPlayerPosition.y - monsterPosition.y)) {
        newMonsterPosition.x += newPlayerPosition.x > monsterPosition.x ? -1 : 1;
      } else {
        newMonsterPosition.y += newPlayerPosition.y > monsterPosition.y ? -1 : 1;
      }
    }

    // Ensure the monster stays within the grid
    newMonsterPosition.x = Math.max(0, Math.min(gridSize - 1, newMonsterPosition.x));
    newMonsterPosition.y = Math.max(0, Math.min(gridSize - 1, newMonsterPosition.y));

    setMonsterPosition(newMonsterPosition);

    // Check if the monster is close
    if (Math.abs(newMonsterPosition.x - newPlayerPosition.x) <= 1 && Math.abs(newMonsterPosition.y - newPlayerPosition.y) <= 1) {
      setIsMonsterClose(true);
      playSound('monster_music');
    } else {
      setIsMonsterClose(false);
      Howler.stop();
    }

    if (newMonsterPosition.x === newPlayerPosition.x && newMonsterPosition.y === newPlayerPosition.y) {
      playSound('jumpscare');
      setTimeout(() => endGame(false), 2000); // End game 2 seconds after the jumpscare
    }
  };

  const endGame = (won: boolean) => {
    let creditChange;
    if (won) {
      creditChange = 10; // If all clues found, give maximum credits
      setMessage(`Game over! You won! Credits: +${creditChange}`);
    } else {
      switch (foundClues) {
        case 1:
          creditChange = 1;
          break;
        case 2:
          creditChange = 5;
          break;
        case 3:
          creditChange = 7;
          break;
        case 4:
          creditChange = 10;
          break;
        default:
          creditChange = -5;
          break;
      }
      setMessage(`Game over! You ${creditChange > 0 ? 'won' : 'lost'}! Credits: ${creditChange > 0 ? '+' : ''}${creditChange}`);
    }
    setCredits(credits + creditChange);
    setGameOver(true);
  };

  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setMonsterPosition({ x: gridSize - 1, y: gridSize - 1 });
    setClues(generateClues());
    setFoundClues(0);
    setMessage('');
    setGameOver(false);
    setTimeLeft(gameTime);
    setIsMonsterClose(false);
    setCredits(0);
    Howler.stop(); // Stop all sounds
  };

  const playSound = (type: string) => {
    let sound;
    switch (type) {
      case 'short_movement':
        sound = new Howl({ src: ['movement.mp3'] });
        break;
      case 'clue':
        sound = new Howl({ src: ['/clue.mp3'] });
        break;
      case 'jumpscare':
        sound = new Howl({ src: ['/jumpscare.mp3'] });
        break;
      case 'monster_music':
        sound = new Howl({ src: ['/monster_music.mp3'], loop: true });
        break;
      default:
        return;
    }
    sound.play();
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < gridSize; y++) {
      const row = [];
      for (let x = 0; x < gridSize; x++) {
        row.push(
          <div
            key={`${x}-${y}`}
            className={`grid-cell ${playerPosition.x === x && playerPosition.y === y ? 'player' : ''}`}
          />
        );
      }
      grid.push(<div key={y} className="grid-row">{row}</div>);
    }
    return grid;
  };

  return (
    <div className="game-container">
      {gameOver && (
        <div className="game-over">
          <p>{message}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      <p>{`Time left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}</p>
      <p>Credits: {credits}</p>
      <p>Clues found: {foundClues}/{totalClues}</p>
      <div className="grid-map">
        {renderGrid()}
      </div>
    </div>
  );
};

export default HorrorGame;
