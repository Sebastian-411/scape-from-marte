import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { Shield, Zap, Droplets, Package, Compass } from 'lucide-react';

const TaskList: React.FC = () => {
  const { state } = useGame();
  const { challenges } = state;

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

  return (
    <div className="h-full bg-gray-900/90 backdrop-blur-sm p-2 overflow-y-auto">
      <h2 className="text-lg font-bold text-white mb-2 border-b border-gray-700 pb-1 sticky top-0 bg-gray-900/90">
        Misiones
      </h2>
      <div className="space-y-2">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`p-2 rounded-lg transition-all duration-300 ${
              challenge.completed
                ? 'bg-green-500/20 border border-green-500'
                : challenge.isAvailable
                ? 'bg-blue-500/20 border border-blue-500'
                : 'bg-gray-500/20 border border-gray-500'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                {getIcon(challenge.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate">{challenge.title}</h3>
                <p className="text-xs text-gray-300 truncate">{challenge.description}</p>
              </div>
              {challenge.completed && (
                <div className="flex-shrink-0 text-green-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 