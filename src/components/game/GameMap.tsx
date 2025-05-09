import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { Shield, Zap, Droplets, Package, Compass } from 'lucide-react';

const GameMap: React.FC = () => {
  const { state, startChallenge } = useGame();
  const { challenges, playerPosition } = state;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'Package':
        return <Package className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
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
          <div className={`relative p-2 rounded-md ${
            challenge.completed
              ? 'bg-green-500/20 border border-green-500'
              : challenge.isAvailable
              ? 'bg-blue-500/20 border border-blue-500 animate-pulse'
              : 'bg-gray-500/20 border border-gray-500'
          }`} style={{ minWidth: 120, maxWidth: 180 }}>
            <div className="text-white text-center">
              <div className="flex items-center justify-center mb-1">
                {getIcon(challenge.icon)}
              </div>
              <div className="text-base font-bold mb-0.5">{challenge.title}</div>
              <div className="text-xs opacity-80">{challenge.description}</div>
            </div>
            {!challenge.isAvailable && !challenge.completed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
            {challenge.completed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameMap;