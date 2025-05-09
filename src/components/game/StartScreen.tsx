import React from 'react';
import { useGame } from '../../contexts/GameContext';

const StartScreen: React.FC = () => {
  const { startGame } = useGame();

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Mars background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <div className="relative max-w-2xl mx-auto p-8 text-center">
        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-6 animate-float">
          Misión: Regreso a Casa
        </h1>

        {/* Mission briefing */}
        <div className="bg-red-900/30 backdrop-blur-sm p-6 rounded-lg border border-red-500/50 mb-8">
          <h2 className="text-2xl text-red-400 mb-4">Situación Crítica</h2>
          <p className="text-gray-300 mb-4">
            Tu nave espacial ha sufrido daños críticos en la superficie de Marte. 
            El oxígeno se está agotando y tienes solo 15 minutos para reparar los sistemas 
            esenciales antes de que sea demasiado tarde.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-red-800/30 p-4 rounded-lg">
              <h3 className="text-red-400 font-bold mb-2">Objetivos:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Reparar ventanas dañadas</li>
                <li>• Restaurar paneles solares</li>
                <li>• Purificar el sistema de combustible</li>
                <li>• Reorganizar la carga</li>
                <li>• Calibrar navegación</li>
              </ul>
            </div>
            <div className="bg-red-800/30 p-4 rounded-lg">
              <h3 className="text-red-400 font-bold mb-2">Controles:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• WASD o flechas para moverte</li>
                <li>• E para interactuar</li>
                <li>• Click para seleccionar</li>
                <li>• ¡Mantén el oxígeno!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={startGame}
          className="relative group px-12 py-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg text-white font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          {/* Button text */}
          <span className="relative z-10 flex items-center justify-center">
            Iniciar Misión
            <svg className="w-6 h-6 ml-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
        </button>

        {/* Warning text */}
        <p className="text-red-400 text-sm mt-4 animate-pulse">
          ⚠️ El oxígeno se está agotando... ¡Debes actuar rápido!
        </p>
      </div>
    </div>
  );
};

export default StartScreen; 