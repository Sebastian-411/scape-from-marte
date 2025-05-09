import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { X } from 'lucide-react';
import WindowRepair from './WindowRepair';
import SolarPanels from './SolarPanels';
import FuelPurifier from './FuelPurifier';
import CargoSystem from './CargoSystem';
import NavigationSystem from './NavigationSystem';
import OxygenSystemChallenge from './OxygenSystemChallenge';
import LifeSupportChallenge from './LifeSupportChallenge';
import CommunicationsChallenge from './CommunicationsChallenge';

const ChallengeContainer: React.FC = () => {
  const { state, exitChallenge } = useGame();
  const { currentChallenge, challenges } = state;
  
  if (!currentChallenge) return null;
  
  const challenge = challenges.find(c => c.id === currentChallenge);
  
  if (!challenge) return null;
  
  // Render the appropriate challenge component
  const renderChallenge = () => {
    switch (currentChallenge) {
      case 'window-repair':
        return <WindowRepair />;
      case 'solar-panels':
        return <SolarPanels />;
      case 'fuel-purifier':
        return <FuelPurifier />;
      case 'cargo-system':
        return <CargoSystem />;
      case 'navigation':
        return <NavigationSystem />;
      case 'oxygen-system':
        return <OxygenSystemChallenge />;
      case 'life-support':
        return <LifeSupportChallenge />;
      case 'communications':
        return <CommunicationsChallenge />;
      default:
        return <div>Challenge not implemented</div>;
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
      {/* Efecto de brillo en el borde */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 animate-gradient-x"></div>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-2xl w-[95%] max-w-5xl h-[90vh] overflow-hidden flex flex-col border border-gray-800 relative">
        {/* Header con gradiente y efecto de brillo */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExIDE4YzMuODY2IDAgNy0zLjEzNCA3LTdzLTMuMTM0LTctNy03LTcgMy4xMzQtNyA3IDMuMTM0IDcgNyA3em00OCAyNWMzLjg2NiAwIDctMy4xMzQgNy03cy0zLjEzNC03LTctNy03IDMuMTM0LTcgNyAzLjEzNCA3IDcgN3ptLTQzLTdjMS42NTcgMCAzLTEuMzQzIDMtM3MtMS4zNDMtMy0zLTMtMyAxLjM0My0zIDMgMS4zNDMgMyAzIDN6bTYzIDMxYzEuNjU3IDAgMy0xLjM0MyAzLTMtLjAwMS0xLjY1Ny0xLjM0NC0yLjk5OS0zLTMtMS42NTctLjAwMS0yLjk5OSAxLjM0My0zIDMgMCAxLjY1NyAxLjM0MyAzIDMgM3pNMzQgOTBjMS42NTcgMCAzLTEuMzQzIDMtM3MtMS4zNDMtMy0zLTMtMyAxLjM0My0zIDMgMS4zNDMgMyAzIDN6bTU2LTc2YzEuNjU3IDAgMy0xLjM0MyAzLTMtLjAwMS0xLjY1Ny0xLjM0NC0yLjk5OS0zLTMtMS42NTctLjAwMS0yLjk5OSAxLjM0My0zIDMgMCAxLjY1NyAxLjM0MyAzIDMgM3pNMTIgODZjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0yOC02NWMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTIzLTExYzIuNzYgMCA1LTIuMjQgNS01cy0yLjI0LTUtNS01LTUgMi4yNC01IDUgMi4yNCA1IDUgNXptLTYgNjBjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0yOSAyMmMyLjc2IDAgNS0yLjI0IDUtNXMtMi4yNC01LTUtNS01IDIuMjQtNSA1IDIuMjQgNSA1IDV6TTMyIDYzYzIuNzYgMCA1LTIuMjQgNS01cy0yLjI0LTUtNS01LTUgMi4yNC01IDUgMi4yNCA1IDUgNXptNTctMTNjMi43NiAwIDUtMi4yNCA1LTVzLTIuMjQtNS01LTUtNSAyLjI0LTUgNSAyLjI0IDUgNSA1em0tOS0yMWMxLjEwNSAwIDItLjg5NSAyLTJzLS44OTUtMi0yLTItMiAuODk1LTIgMiAuODk1IDIgMiAyek02MCA5MWMxLjEwNSAwIDItLjg5NSAyLTJzLS44OTUtMi0yLTItMiAuODk1LTIgMiAuODk1IDIgMiAyek0zNSA0MWMxLjEwNSAwIDItLjg5NSAyLTJzLS44OTUtMi0yLTItMiAuODk1LTIgMiAuODk1IDIgMiAyek0xMiA2MGMxLjEwNSAwIDItLjg5NSAyLTJzLS44OTUtMi0yLTItMiAuODk1LTIgMiAuODk1IDIgMiAyIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-10"></div>
          <div className="relative p-6 flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-white font-bold text-2xl tracking-tight">{challenge.title}</h2>
              <p className="text-blue-200/80 text-sm">{challenge.description}</p>
            </div>
            <button 
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
              onClick={exitChallenge}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Contenido del reto */}
        <div className="flex-1 overflow-y-auto bg-gray-900">
          <div className="max-w-6xl mx-auto p-6">
            {renderChallenge()}
          </div>
        </div>

        {/* Efecto de brillo en las esquinas */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default ChallengeContainer;