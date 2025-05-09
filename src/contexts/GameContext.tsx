import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, Challenge, Direction } from '../types';
import { INITIAL_CHALLENGES } from '../data/challenges';

const GAME_TIME = 15 * 60; // 15 minutes in seconds
const DEV_MODE = true; // Cambia a false para desactivar el modo desarrollador

type NotificationType = 'success' | 'info';

type Notification = {
  message: string;
  type: NotificationType;
};

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'MOVE_PLAYER'; direction: Direction }
  | { type: 'START_CHALLENGE'; challengeId: string }
  | { type: 'COMPLETE_CHALLENGE'; challengeId: string }
  | { type: 'EXIT_CHALLENGE' }
  | { type: 'TICK_TIMER' }
  | { type: 'SHOW_ASSISTANT'; message: string }
  | { type: 'HIDE_ASSISTANT' }
  | { type: 'GAME_OVER'; success: boolean }
  | { type: 'SHOW_NOTIFICATION'; message: string; notificationType: NotificationType }
  | { type: 'CLEAR_NOTIFICATION' };

const initialState: GameState = {
  playerPosition: { x: 250, y: 250 },
  challenges: DEV_MODE
    ? INITIAL_CHALLENGES.map(ch => ({ ...ch, isAvailable: true }))
    : INITIAL_CHALLENGES,
  currentChallenge: null,
  timeRemaining: GAME_TIME,
  gameStarted: false,
  gameCompleted: false,
  gameFailed: false,
  showAssistant: false,
  assistantMessage: '',
  notification: null,
  currentTaskIndex: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        challenges: DEV_MODE
          ? state.challenges.map((challenge) => ({ ...challenge, isAvailable: true }))
          : state.challenges.map((challenge, index) => ({
              ...challenge,
              isAvailable: index === 0
            })),
        notification: {
          message: "¡Bienvenido a la misión! Tu primera tarea es reparar las ventanas dañadas.",
          type: "info"
        }
      };
    case 'MOVE_PLAYER': {
      const { x, y } = state.playerPosition;
      const step = 10;
      const minX = 40;
      const maxX = 1160;
      const minY = 40;
      const maxY = 660;
      let newX = x;
      let newY = y;
      switch (action.direction) {
        case 'up':
          newY = Math.max(minY, y - step);
          break;
        case 'down':
          newY = Math.min(maxY, y + step);
          break;
        case 'left':
          newX = Math.max(minX, x - step);
          break;
        case 'right':
          newX = Math.min(maxX, x + step);
          break;
      }
      return {
        ...state,
        playerPosition: { x: newX, y: newY },
      };
    }
    case 'START_CHALLENGE': {
      const challenge = state.challenges.find(c => c.id === action.challengeId);
      if (!challenge?.isAvailable) {
        return {
          ...state,
          notification: {
            message: "Esta tarea aún no está disponible. Completa las tareas anteriores primero.",
            type: "info"
          }
        };
      }
      return {
        ...state,
        currentChallenge: action.challengeId,
        notification: {
          message: `Iniciando tarea: ${challenge.title}`,
          type: "info"
        }
      };
    }
    case 'COMPLETE_CHALLENGE': {
      const updatedChallenges = state.challenges.map((challenge, index) => {
        if (challenge.id === action.challengeId) {
          return { ...challenge, completed: true, isAvailable: DEV_MODE ? true : false };
        }
        if (DEV_MODE) {
          return { ...challenge, isAvailable: true };
        }
        if (index === state.currentTaskIndex + 1) {
          return { ...challenge, isAvailable: true };
        }
        return { ...challenge, isAvailable: false };
      });
      
      const allCompleted = updatedChallenges.every(challenge => challenge.completed);
      const nextTaskIndex = state.currentTaskIndex + 1;
      const nextTask = updatedChallenges[nextTaskIndex];
      
      let notification = null;
      if (allCompleted) {
        notification = {
          message: "¡Felicidades! Has completado todas las tareas. ¡La nave está lista para despegar!",
          type: "success"
        };
      } else if (nextTask) {
        notification = {
          message: `¡Excelente trabajo! Ahora debes ${nextTask.description.toLowerCase()}.`,
          type: "info"
        };
      }
      
      return {
        ...state,
        challenges: updatedChallenges,
        currentChallenge: null,
        gameCompleted: allCompleted,
        currentTaskIndex: nextTaskIndex,
        notification
      };
    }
    case 'EXIT_CHALLENGE':
      return {
        ...state,
        currentChallenge: null,
        notification: {
          message: "Has salido de la tarea. Puedes volver a intentarlo cuando quieras.",
          type: "info"
        }
      };
    case 'TICK_TIMER': {
      const newTime = state.timeRemaining - 1;
      const failed = newTime <= 0 && !state.gameCompleted;
      
      if (newTime === 300) { // 5 minutes remaining
        return {
          ...state,
          timeRemaining: newTime,
          gameFailed: failed,
          notification: {
            message: "¡Últimos 5 minutos! ¡Date prisa!",
            type: "info"
          }
        };
      }
      
      return {
        ...state,
        timeRemaining: Math.max(0, newTime),
        gameFailed: failed,
      };
    }
    case 'SHOW_ASSISTANT':
      return {
        ...state,
        showAssistant: true,
        assistantMessage: action.message,
      };
    case 'HIDE_ASSISTANT':
      return {
        ...state,
        showAssistant: false,
        assistantMessage: '',
      };
    case 'GAME_OVER':
      return {
        ...state,
        gameCompleted: action.success,
        gameFailed: !action.success,
        notification: {
          message: action.success 
            ? "¡Misión completada con éxito!" 
            : "¡Se acabó el tiempo! La misión ha fallado.",
          type: action.success ? "success" : "info"
        }
      };
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        notification: {
          message: action.message,
          type: action.notificationType
        }
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: null
      };
    default:
      return state;
  }
}

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startGame: () => void;
  movePlayer: (direction: Direction) => void;
  startChallenge: (id: string) => void;
  completeChallenge: (id: string) => void;
  exitChallenge: () => void;
  showAssistant: (message: string) => void;
  hideAssistant: () => void;
  isTimeCritical: boolean;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  const startGame = () => dispatch({ type: 'START_GAME' });
  const movePlayer = (direction: Direction) => dispatch({ type: 'MOVE_PLAYER', direction });
  const startChallenge = (id: string) => dispatch({ type: 'START_CHALLENGE', challengeId: id });
  const completeChallenge = (id: string) => dispatch({ type: 'COMPLETE_CHALLENGE', challengeId: id });
  const exitChallenge = () => dispatch({ type: 'EXIT_CHALLENGE' });
  const showAssistant = (message: string) => dispatch({ type: 'SHOW_ASSISTANT', message });
  const hideAssistant = () => dispatch({ type: 'HIDE_ASSISTANT' });

  // Timer effect
  useEffect(() => {
    let timer: number;
    
    if (state.gameStarted && !state.gameCompleted && !state.gameFailed) {
      timer = window.setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state.gameStarted, state.gameCompleted, state.gameFailed]);

  // Calculate if we're in the time-critical phase (last 5 minutes)
  const isTimeCritical = state.timeRemaining < GAME_TIME / 3;
  
  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        startGame,
        movePlayer,
        startChallenge,
        completeChallenge,
        exitChallenge,
        showAssistant,
        hideAssistant,
        isTimeCritical
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};