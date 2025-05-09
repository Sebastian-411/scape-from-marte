import React, { useMemo, useEffect, useState } from 'react';
import { useGame } from '../../contexts/GameContext';

const Timer: React.FC = () => {
  const { state, isTimeCritical } = useGame();
  const { timeRemaining } = state;
  const [isPulsing, setIsPulsing] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  
  // Format time as MM:SS
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeRemaining]);
  
  // Calculate percentage of time remaining
  const percentRemaining = (timeRemaining / (15 * 60)) * 100;
  
  // Add warning effects when time is low
  useEffect(() => {
    if (timeRemaining <= 300) { // Last 5 minutes
      setIsPulsing(true);
      setShowWarning(true);
    } else if (timeRemaining <= 600) { // Last 10 minutes
      setIsPulsing(true);
      setShowWarning(false);
    } else {
      setIsPulsing(false);
      setShowWarning(false);
    }
  }, [timeRemaining]);

  // Play warning sound when time is critical
  useEffect(() => {
    if (timeRemaining <= 300 && timeRemaining % 30 === 0) {
      const audio = new Audio('/warning.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore autoplay restrictions
    }
  }, [timeRemaining]);
  
  return (
    <div className="flex flex-col items-center relative">
      {/* Mars-themed timer container */}
      <div className={`relative bg-red-900/30 backdrop-blur-sm p-4 rounded-lg border ${
        isPulsing ? 'border-red-500 animate-pulse' : 'border-red-500/50'
      } shadow-lg transition-all duration-500`}>
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse"></div>
        
        {/* Oxygen level indicator */}
        <div className={`text-3xl font-bold ${
          isPulsing ? 'text-red-500 animate-pulse' : 'text-white'
        } relative z-10`}>
          <span className="text-sm text-red-300">O₂</span> {formattedTime}
        </div>
        
        {/* Progress bar with Mars dust effect */}
        <div className="w-full h-3 bg-gray-800/50 rounded-full mt-2 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 animate-pulse"></div>
          <div 
            className={`h-full rounded-full relative transition-all duration-1000 ease-linear ${
              percentRemaining > 66 ? 'bg-green-500' : 
              percentRemaining > 33 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${percentRemaining}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-shimmer"></div>
          </div>
        </div>
        
        {/* Time pressure indicators */}
        {showWarning && (
          <div className="text-xs text-red-400 mt-2 animate-pulse flex items-center">
            <span className="mr-1">⚠️</span>
            ¡Nivel de oxígeno crítico!
          </div>
        )}
        
        {/* Dust particles */}
        {isPulsing && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-dust"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;