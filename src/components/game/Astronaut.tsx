import React, { useEffect, useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Direction } from '../../types';

const Astronaut: React.FC = () => {
  const { state, movePlayer, startChallenge } = useGame();
  const { playerPosition, currentChallenge, challenges } = state;
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Check if player is near a challenge
  const checkChallengeProximity = () => {
    const challengeLocations = [
      { id: 'window-repair', x: 100, y: 100 },
      { id: 'solar-panels', x: 400, y: 100 },
      { id: 'fuel-purifier', x: 100, y: 400 },
      { id: 'cargo-system', x: 400, y: 400 },
      { id: 'navigation', x: 250, y: 250 },
    ];

    for (const location of challengeLocations) {
      const dx = Math.abs(playerPosition.x - location.x);
      const dy = Math.abs(playerPosition.y - location.y);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 50) {
        const challenge = challenges.find(c => c.id === location.id);
        if (challenge && !challenge.completed) {
          return location.id;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentChallenge) return;
      
      let newDirection: Direction | null = null;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          newDirection = 'up';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newDirection = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newDirection = 'left';
          setDirection('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newDirection = 'right';
          setDirection('right');
          break;
        case 'e':
        case 'E':
          const nearbyChallengeId = checkChallengeProximity();
          if (nearbyChallengeId) {
            startChallenge(nearbyChallengeId);
          }
          break;
      }

      if (newDirection) {
        setIsMoving(true);
        movePlayer(newDirection);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'w', 'W', 'ArrowDown', 's', 'S', 'ArrowLeft', 'a', 'A', 'ArrowRight', 'd', 'D'].includes(e.key)) {
        setIsMoving(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [movePlayer, currentChallenge, playerPosition, startChallenge, challenges]);

  const getAnimationClass = () => {
    if (!isMoving) return 'astronaut idle';
    return direction === 'left' ? 'astronaut walking-left' : 'astronaut walking';
  };

  return (
    <div
      className={getAnimationClass()}
      style={{
        position: 'absolute',
        left: `${playerPosition.x}px`,
        top: `${playerPosition.y}px`,
        width: '32px',
        height: '32px',
        zIndex: 10
      }}
    >
      {/* Astronaut suit */}
      <div className="relative w-full h-full">
        {/* Helmet */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8">
          {/* Helmet outer ring */}
          <div className="absolute inset-0 bg-white rounded-full border-2 border-gray-200"></div>
          {/* Helmet visor */}
          <div className="absolute top-1 left-1 right-1 bottom-1 bg-blue-400/30 rounded-full backdrop-blur-sm">
            <div className="absolute top-0.5 left-0.5 right-0.5 bottom-0.5 bg-blue-500/20 rounded-full"></div>
          </div>
          {/* Face */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4">
            {/* Eyes */}
            <div className="absolute top-0 left-0.5 w-1 h-1.5 bg-gray-800 rounded-full"></div>
            <div className="absolute top-0 right-0.5 w-1 h-1.5 bg-gray-800 rounded-full"></div>
            {/* Smile */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-0.5 border-b border-gray-800"></div>
          </div>
          {/* Helmet reflection */}
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/70 rounded-full"></div>
        </div>

        {/* Body */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-8">
          {/* Main suit */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg"></div>
          {/* White chest piece */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-white rounded-t-lg"></div>
          {/* Control panel */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 rounded">
            <div className="grid grid-cols-2 gap-0.5 p-0.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
          {/* Oxygen tank */}
          <div className="absolute -right-1.5 top-1 w-1.5 h-4 bg-white rounded">
            <div className="absolute inset-0.5 bg-blue-400/20 rounded"></div>
          </div>
        </div>

        {/* Legs */}
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
          <div className="leg-left w-2 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-b"></div>
          <div className="leg-right w-2 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-b"></div>
        </div>

        {/* Dust particles - only show when moving */}
        {isMoving && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="dust-particle dust-particle-1 w-1 h-1"></div>
            <div className="dust-particle dust-particle-2 w-1 h-1"></div>
            <div className="dust-particle dust-particle-3 w-1 h-1"></div>
          </div>
        )}

        {/* Oxygen bubbles */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${i * 6 - 3}px`,
                animationDelay: `${i * 0.3}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Astronaut;