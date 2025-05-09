import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { Shield, Zap, Droplets, Package, Compass, AlertTriangle } from 'lucide-react';

const GameMap: React.FC = () => {
  const { state, startChallenge } = useGame();
  const { challenges, playerPosition } = state;

  // Elementos decorativos del mapa
  const mapDecorations = [
    // Ventanas
    { type: 'window', x: 100, y: 100, width: 200, height: 80 },
    { type: 'window', x: 900, y: 100, width: 200, height: 80 },
    { type: 'window', x: 500, y: 300, width: 200, height: 80 },
    
    // Mesas y consolas
    { type: 'console', x: 200, y: 200, width: 120, height: 60 },
    { type: 'console', x: 880, y: 200, width: 120, height: 60 },
    { type: 'table', x: 400, y: 400, width: 160, height: 80 },
    { type: 'table', x: 640, y: 400, width: 160, height: 80 },
    
    // Elementos específicos
    { type: 'oxygen-tank', x: 300, y: 150, width: 60, height: 100 },
    { type: 'solar-panel', x: 840, y: 150, width: 80, height: 60 },
    { type: 'fuel-tank', x: 200, y: 500, width: 80, height: 120 },
    { type: 'cargo-box', x: 920, y: 500, width: 100, height: 80 },
    { type: 'navigation-console', x: 560, y: 150, width: 80, height: 60 },
    { type: 'communication-dish', x: 300, y: 375, width: 60, height: 60 },
    { type: 'life-support-panel', x: 840, y: 375, width: 80, height: 60 },
  ];

  const getTaskVisual = (challengeId: string) => {
    switch (challengeId) {
      case 'window-repair':
        return (
          <svg className="w-16 h-16" viewBox="0 0 64 64">
            <rect x="8" y="8" width="48" height="48" rx="4" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4"/>
            <line x1="8" y1="24" x2="56" y2="24" stroke="#3b82f6" strokeWidth="2"/>
            <line x1="8" y1="40" x2="56" y2="40" stroke="#3b82f6" strokeWidth="2"/>
            <line x1="24" y1="8" x2="24" y2="56" stroke="#3b82f6" strokeWidth="2"/>
            <line x1="40" y1="8" x2="40" y2="56" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="32" cy="32" r="4" fill="#3b82f6"/>
          </svg>
        );
      case 'solar-panels':
        return (
          <svg className="w-16 h-16" viewBox="0 0 64 64">
            <rect x="8" y="8" width="48" height="48" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="8" y1="20" x2="56" y2="20" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="8" y1="32" x2="56" y2="32" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="8" y1="44" x2="56" y2="44" stroke="#f59e0b" strokeWidth="2"/>
            <circle cx="32" cy="32" r="8" fill="#f59e0b"/>
          </svg>
        );
      case 'fuel-purifier':
        return (
          <svg className="w-16 h-16" viewBox="0 0 64 64">
            <path d="M32 8 L56 32 L32 56 L8 32 Z" fill="none" stroke="#22c55e" strokeWidth="2"/>
            <circle cx="32" cy="32" r="16" fill="none" stroke="#22c55e" strokeWidth="2"/>
            <circle cx="32" cy="32" r="8" fill="#22c55e"/>
            <path d="M32 8 L32 56 M8 32 L56 32" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4"/>
          </svg>
        );
      case 'cargo-system':
        return (
          <svg className="w-16 h-16" viewBox="0 0 64 64">
            <rect x="12" y="12" width="40" height="40" fill="none" stroke="#a855f7" strokeWidth="2"/>
            <rect x="16" y="16" width="32" height="32" fill="none" stroke="#a855f7" strokeWidth="2"/>
            <line x1="16" y1="32" x2="48" y2="32" stroke="#a855f7" strokeWidth="2"/>
            <line x1="32" y1="16" x2="32" y2="48" stroke="#a855f7" strokeWidth="2"/>
            <circle cx="32" cy="32" r="4" fill="#a855f7"/>
          </svg>
        );
      case 'navigation':
        return (
          <svg className="w-16 h-16" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="24" fill="none" stroke="#ef4444" strokeWidth="2"/>
            <path d="M32 8 L32 56 M8 32 L56 32" stroke="#ef4444" strokeWidth="2"/>
            <path d="M32 8 L40 32 L32 56 L24 32 Z" fill="#ef4444"/>
          </svg>
        );
      case 'oxygen-system':
        return (
          <svg className="w-16 h-16" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="24" fill="none" stroke="#06b6d4" strokeWidth="2"/>
            <path d="M32 8 C44 8 56 20 56 32 C56 44 44 56 32 56 C20 56 8 44 8 32 C8 20 20 8 32 8" fill="none" stroke="#06b6d4" strokeWidth="2"/>
            <circle cx="32" cy="32" r="8" fill="#06b6d4"/>
          </svg>
        );
      case 'communications':
        return (
          <svg className="w-16 h-16" viewBox="0 0 64 64">
            <path d="M32 8 L56 32 L32 56 L8 32 Z" fill="none" stroke="#f97316" strokeWidth="2"/>
            <circle cx="32" cy="32" r="16" fill="none" stroke="#f97316" strokeWidth="2"/>
            <path d="M32 16 L32 48 M16 32 L48 32" stroke="#f97316" strokeWidth="2"/>
            <circle cx="32" cy="32" r="4" fill="#f97316"/>
          </svg>
        );
      case 'life-support':
        return (
          <svg className="w-16 h-16" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="24" fill="none" stroke="#ec4899" strokeWidth="2"/>
            <path d="M32 8 C44 8 56 20 56 32 C56 44 44 56 32 56 C20 56 8 44 8 32 C8 20 20 8 32 8" fill="none" stroke="#ec4899" strokeWidth="2"/>
            <path d="M32 16 L32 48 M16 32 L48 32" stroke="#ec4899" strokeWidth="2"/>
            <circle cx="32" cy="32" r="8" fill="#ec4899"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const renderDecoration = (decoration: any) => {
    switch (decoration.type) {
      case 'window':
        return (
          <svg
            className="absolute"
            style={{
              left: decoration.x,
              top: decoration.y,
              width: decoration.width,
              height: decoration.height,
            }}
            viewBox="0 0 200 80"
          >
            <rect x="0" y="0" width="200" height="80" fill="none" stroke="#3b82f6" strokeWidth="2"/>
            <line x1="0" y1="40" x2="200" y2="40" stroke="#3b82f6" strokeWidth="2"/>
            <line x1="100" y1="0" x2="100" y2="80" stroke="#3b82f6" strokeWidth="2"/>
          </svg>
        );
      case 'console':
        return (
          <svg
            className="absolute"
            style={{
              left: decoration.x,
              top: decoration.y,
              width: decoration.width,
              height: decoration.height,
            }}
            viewBox="0 0 120 60"
          >
            <rect x="0" y="0" width="120" height="60" fill="#1f2937" stroke="#4b5563" strokeWidth="2"/>
            <rect x="10" y="10" width="100" height="40" fill="#374151" stroke="#6b7280" strokeWidth="1"/>
            <circle cx="30" cy="30" r="5" fill="#10b981"/>
            <circle cx="50" cy="30" r="5" fill="#f59e0b"/>
            <circle cx="70" cy="30" r="5" fill="#ef4444"/>
          </svg>
        );
      case 'table':
        return (
          <svg
            className="absolute"
            style={{
              left: decoration.x,
              top: decoration.y,
              width: decoration.width,
              height: decoration.height,
            }}
            viewBox="0 0 160 80"
          >
            <rect x="0" y="0" width="160" height="80" fill="#1f2937" stroke="#4b5563" strokeWidth="2"/>
            <line x1="0" y1="20" x2="160" y2="20" stroke="#4b5563" strokeWidth="1"/>
            <line x1="0" y1="40" x2="160" y2="40" stroke="#4b5563" strokeWidth="1"/>
            <line x1="0" y1="60" x2="160" y2="60" stroke="#4b5563" strokeWidth="1"/>
          </svg>
        );
      case 'oxygen-tank':
        return (
          <svg
            className="absolute"
            style={{
              left: decoration.x,
              top: decoration.y,
              width: decoration.width,
              height: decoration.height,
            }}
            viewBox="0 0 60 100"
          >
            <rect x="10" y="10" width="40" height="80" fill="none" stroke="#06b6d4" strokeWidth="2"/>
            <circle cx="30" cy="30" r="15" fill="none" stroke="#06b6d4" strokeWidth="2"/>
            <path d="M30 45 L30 80" stroke="#06b6d4" strokeWidth="2"/>
          </svg>
        );
      case 'solar-panel':
        return (
          <svg
            className="absolute"
            style={{
              left: decoration.x,
              top: decoration.y,
              width: decoration.width,
              height: decoration.height,
            }}
            viewBox="0 0 80 60"
          >
            <rect x="0" y="0" width="80" height="60" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="0" y1="20" x2="80" y2="20" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="0" y1="40" x2="80" y2="40" stroke="#f59e0b" strokeWidth="2"/>
            <circle cx="40" cy="30" r="10" fill="#f59e0b"/>
          </svg>
        );
      case 'fuel-tank':
        return (
          <svg
            className="absolute"
            style={{
              left: decoration.x,
              top: decoration.y,
              width: decoration.width,
              height: decoration.height,
            }}
            viewBox="0 0 80 120"
          >
            <rect x="10" y="10" width="60" height="100" fill="none" stroke="#22c55e" strokeWidth="2"/>
            <circle cx="40" cy="40" r="20" fill="none" stroke="#22c55e" strokeWidth="2"/>
            <path d="M40 60 L40 100" stroke="#22c55e" strokeWidth="2"/>
          </svg>
        );
      case 'cargo-box':
        return (
          <svg
            className="absolute"
            style={{
              left: decoration.x,
              top: decoration.y,
              width: decoration.width,
              height: decoration.height,
            }}
            viewBox="0 0 100 80"
          >
            <rect x="0" y="0" width="100" height="80" fill="none" stroke="#a855f7" strokeWidth="2"/>
            <line x1="0" y1="20" x2="100" y2="20" stroke="#a855f7" strokeWidth="2"/>
            <line x1="0" y1="40" x2="100" y2="40" stroke="#a855f7" strokeWidth="2"/>
            <line x1="0" y1="60" x2="100" y2="60" stroke="#a855f7" strokeWidth="2"/>
          </svg>
        );
      case 'navigation-console':
        return (
          <svg
            className="absolute"
            style={{
              left: decoration.x,
              top: decoration.y,
              width: decoration.width,
              height: decoration.height,
            }}
            viewBox="0 0 80 60"
          >
            <rect x="0" y="0" width="80" height="60" fill="#1f2937" stroke="#ef4444" strokeWidth="2"/>
            <circle cx="40" cy="30" r="20" fill="none" stroke="#ef4444" strokeWidth="2"/>
            <path d="M40 10 L40 50 M20 30 L60 30" stroke="#ef4444" strokeWidth="2"/>
            <path d="M40 10 L45 30 L40 50 L35 30 Z" fill="#ef4444"/>
          </svg>
        );
      case 'communication-dish':
        return (
          <svg
            className="absolute"
            style={{
              left: decoration.x,
              top: decoration.y,
              width: decoration.width,
              height: decoration.height,
            }}
            viewBox="0 0 60 60"
          >
            <path d="M30 10 L50 30 L30 50 L10 30 Z" fill="none" stroke="#f97316" strokeWidth="2"/>
            <circle cx="30" cy="30" r="15" fill="none" stroke="#f97316" strokeWidth="2"/>
            <path d="M30 15 L30 45 M15 30 L45 30" stroke="#f97316" strokeWidth="2"/>
          </svg>
        );
      case 'life-support-panel':
        return (
          <svg
            className="absolute"
            style={{
              left: decoration.x,
              top: decoration.y,
              width: decoration.width,
              height: decoration.height,
            }}
            viewBox="0 0 80 60"
          >
            <rect x="0" y="0" width="80" height="60" fill="#1f2937" stroke="#ec4899" strokeWidth="2"/>
            <circle cx="40" cy="30" r="20" fill="none" stroke="#ec4899" strokeWidth="2"/>
            <path d="M40 10 C52 10 60 20 60 30 C60 40 52 50 40 50 C28 50 20 40 20 30 C20 20 28 10 40 10" fill="none" stroke="#ec4899" strokeWidth="2"/>
            <path d="M40 20 L40 40 M30 30 L50 30" stroke="#ec4899" strokeWidth="2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const handleChallengeClick = (challengeId: string) => {
    if (challenges.find(c => c.id === challengeId)?.isAvailable) {
      startChallenge(challengeId);
    }
  };

  return (
    <div className="relative w-[1200px] h-[700px] bg-gray-900 rounded-lg overflow-hidden" style={{ maxWidth: '100%', maxHeight: '100%' }}>
      {/* Mars background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-orange-900/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExIDE4YzMuODY2IDAgNy0zLjEzNCA3LTdzLTMuMTM0LTctNy03LTcgMy4xMzQtNyA3IDMuMTM0IDcgNyA3em00OCAyNWMzLjg2NiAwIDctMy4xMzQgNy03cy0zLjEzNC03LTctNy03IDMuMTM0LTcgNyAzLjEzNCA3IDcgN3ptLTQzLTdjMS42NTcgMCAzLTEuMzQzIDMtM3MtMS4zNDMtMy0zLTMtMyAxLjM0My0zIDMgMS4zNDMgMyAzIDN6bTYzIDMxYzEuNjU3IDAgMy0xLjM0MyAzLTMtLjAwMS0xLjY1Ny0xLjM0NC0yLjk5OS0zLTMtMS42NTctLjAwMS0yLjk5OSAxLjM0My0zIDMgMCAxLjY1NyAxLjM0MyAzIDMgM3pNMzQgOTBjMS42NTcgMCAzLTEuMzQzIDMtM3MtMS4zNDMtMy0zLTMtMyAxLjM0My0zIDMgMS4zNDMgMyAzIDN6bTU2LTc2YzEuNjU3IDAgMy0xLjM0MyAzLTMtLjAwMS0xLjY1Ny0xLjM0NC0yLjk5OS0zLTMtMS42NTctLjAwMS0yLjk5OSAxLjM0My0zIDMgMCAxLjY1NyAxLjM0MyAzIDMgM3pNMTIgODZjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0yOC02NWMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTIzLTExYzIuNzYgMCA1LTIuMjQgNS01cy0yLjI0LTUtNS01LTUgMi4yNC01IDUgMi4yNCA1IDUgNXptLTYgNjBjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0yOSAyMmMyLjc2IDAgNS0yLjI0IDUtNXMtMi4yNC01LTUtNS01IDIuMjQtNSA1IDIuMjQgNSA1IDV6TTMyIDYzYzIuNzYgMCA1LTIuMjQgNS01cy0yLjI0LTUtNS01LTUgMi4yNC01IDUgMi4yNCA1IDUgNXptNTctMTNjMi43NiAwIDUtMi4yNCA1LTVzLTIuMjQtNS01LTUtNSAyLjI0LTUgNSAyLjI0IDUgNSA1em0tOS0yMWMxLjEwNSAwIDItLjg5NSAyLTJzLS44OTUtMi0yLTItMiAuODk1LTIgMiAuODk1IDIgMiAyek02MCA5MWMxLjEwNSAwIDItLjg5NSAyLTJzLS44OTUtMi0yLTItMiAuODk1LTIgMiAuODk1IDIgMiAyek0zNSA0MWMxLjEwNSAwIDItLjg5NSAyLTJzLS44OTUtMi0yLTItMiAuODk1LTIgMiAuODk1IDIgMiAyek0xMiA2MGMxLjEwNSAwIDItLjg5NSAyLTJzLS44OTUtMi0yLTItMiAuODk1LTIgMiAuODk1IDIgMiAyIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      {/* Elementos decorativos */}
      {mapDecorations.map((decoration, index) => (
        <div key={index}>
          {renderDecoration(decoration)}
        </div>
      ))}

      {/* Challenge locations */}
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          data-challenge-id={challenge.id}
          onClick={() => handleChallengeClick(challenge.id)}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            challenge.completed
              ? 'opacity-50 scale-90'
              : challenge.isAvailable
              ? 'opacity-100 scale-100 cursor-pointer hover:scale-105'
              : 'opacity-30 scale-90 cursor-not-allowed'
          }`}
          style={{
            left: challenge.position.x,
            top: challenge.position.y,
          }}
        >
          <div className="relative">
            {/* Elemento visual de la tarea */}
            {getTaskVisual(challenge.id)}
            
            {/* Triángulo de alerta para tareas disponibles */}
            {challenge.isAvailable && !challenge.completed && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <AlertTriangle className="w-6 h-6 text-yellow-500 animate-bounce" />
              </div>
            )}

            {/* Indicador de completado */}
            {challenge.completed && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                </div>
              </div>
            )}

            {/* Tooltip con información */}
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 rounded-lg text-sm text-white bg-gray-800/90 whitespace-nowrap ${
              challenge.completed ? 'opacity-50' : 'opacity-100'
            }`}>
              {challenge.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameMap;