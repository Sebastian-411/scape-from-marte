import React from 'react';
import { useGame } from '../../contexts/GameContext';
import Timer from './Timer';

const GameHUD: React.FC = () => {
  const { state, isTimeCritical } = useGame();
  const { challenges, timeRemaining } = state;
  
  // Calculate completion percentage
  const completedChallenges = challenges.filter(c => c.completed).length;
  const completionPercentage = (completedChallenges / challenges.length) * 100;
  
  // Calculate time pressure level
  const timePressureLevel = timeRemaining <= 300 ? 'critical' : 
                           timeRemaining <= 600 ? 'warning' : 
                           'normal';
  
  return (
    <div className={`w-full p-4 flex items-center justify-between transition-all duration-500 ${
      timePressureLevel === 'critical' ? 'bg-red-900/90' : 
      timePressureLevel === 'warning' ? 'bg-orange-900/80' : 
      'bg-black/70'
    }`}>
      {/* Mission title */}
      <div className={`text-white font-bold text-xl ${
        timePressureLevel === 'critical' ? 'animate-critical' : ''
      }`}>
        Misión: Regreso a Casa
      </div>
      
      {/* Timer */}
      <div className="flex-1 flex justify-center">
        <Timer />
      </div>
      
      {/* Mission progress */}
      <div className="flex flex-col items-end">
        <div className={`text-white text-sm ${
          timePressureLevel === 'critical' ? 'animate-pulse' : ''
        }`}>
          Progreso: {completedChallenges}/{challenges.length}
        </div>
        <div className="w-32 h-2 bg-gray-700 rounded-full mt-1">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              completionPercentage === 100 ? 'bg-green-500' :
              timePressureLevel === 'critical' ? 'bg-red-500' :
              timePressureLevel === 'warning' ? 'bg-yellow-500' :
              'bg-blue-500'
            }`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Time pressure effects */}
      {timePressureLevel === 'critical' && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 border-8 border-red-500 border-opacity-40 animate-pulse"></div>
          <div className="absolute top-20 left-0 right-0 text-center">
            <div className="text-red-500 font-bold text-xl animate-pulse">
              ¡ALERTA! TIEMPO LIMITADO
            </div>
            <div className="text-red-400 text-sm mt-1 animate-pulse">
              {timeRemaining <= 60 ? 
                `¡Solo ${timeRemaining} segundos restantes!` :
                `¡Menos de ${Math.ceil(timeRemaining / 60)} minutos restantes!`
              }
            </div>
          </div>
          
          {/* Dust storm effect */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-red-500/20 rounded-full animate-dust"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Warning effects */}
      {timePressureLevel === 'warning' && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 border-4 border-orange-500 border-opacity-20 animate-pulse"></div>
          <div className="absolute top-20 left-0 right-0 text-center">
            <div className="text-orange-500 font-bold text-lg animate-pulse">
              ¡Atención! Tiempo limitado
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameHUD;