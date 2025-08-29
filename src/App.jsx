import React, { useState, useEffect, useCallback, useRef } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import SuccessScreen from './components/SuccessScreen';

const App = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'success'
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalStars, setTotalStars] = useState(0);

  const startGame = () => {
    setGameState('playing');
    setCurrentLevel(1);
    setTotalStars(0);
  };

  const completeLevel = (starsCollected) => {
    setTotalStars(prev => prev + starsCollected);
    if (currentLevel >= 3) {
      setGameState('success');
    } else {
      setCurrentLevel(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setGameState('start');
    setCurrentLevel(1);
    setTotalStars(0);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* 星空背景 */}
      <div className="star-background"></div>
      <div className="galaxy-river"></div>
      
      {gameState === 'start' && (
        <StartScreen onStart={startGame} />
      )}
      
      {gameState === 'playing' && (
        <GameScreen 
          level={currentLevel}
          onComplete={completeLevel}
          onReset={resetGame}
        />
      )}
      
      {gameState === 'success' && (
        <SuccessScreen 
          totalStars={totalStars}
          onRestart={resetGame}
        />
      )}
    </div>
  );
};

export default App;
