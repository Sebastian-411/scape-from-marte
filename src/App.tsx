import React from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import GameMap from './components/game/GameMap';
import Astronaut from './components/game/Astronaut';
import GameHUD from './components/game/GameHUD';
import RobotAssistant from './components/game/RobotAssistant';
import ChallengeContainer from './components/challenges/ChallengeContainer';
import StartScreen from './components/game/StartScreen';
import Notification from './components/game/Notification';
import TaskList from './components/game/TaskList';
import MissionCompleteScreen from './components/game/MissionCompleteScreen';

// Game component that uses the context
const Game: React.FC = () => {
  const { state } = useGame();

  if (state.gameCompleted) {
    return <MissionCompleteScreen />;
  }

  return (
    <div className="min-h-screen bg-black">
      {!state.gameStarted && <StartScreen />}
      
      {/* Main game layout */}
      <div className="flex h-screen">
        {/* Left game area */}
        <div className="flex-1 flex flex-col">
          {/* Game HUD at the top */}
            <GameHUD />
          {/* Game map area */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              <GameMap />
              <Astronaut />
            </div>
            <Notification />
          </div>
        </div>

        {/* Right sidebar - Tasks and Chat stacked vertically */}
        <div className="w-96 flex flex-col h-full border-l border-gray-800">
          {/* Tasks panel - half height */}
          <div className="h-1/2 border-b border-gray-800 overflow-y-auto">
            <TaskList />
          </div>
          {/* Chat panel - half height */}
          <div className="h-1/2">
            <RobotAssistant />
          </div>
        </div>
      </div>

      {/* Challenge container (modal) */}
      <ChallengeContainer />
    </div>
  );
};

// Main App component that provides the context
function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;