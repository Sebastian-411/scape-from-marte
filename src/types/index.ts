export type Position = {
  x: number;
  y: number;
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export type Challenge = {
  id: string;
  title: string;
  description: string;
  position: Position;
  completed: boolean;
  isAvailable: boolean;
  icon: string;
};

export type NotificationType = 'success' | 'info';

export type Notification = {
  message: string;
  type: NotificationType;
} | null;

export type GameState = {
  playerPosition: Position;
  challenges: Challenge[];
  currentChallenge: string | null;
  timeRemaining: number;
  gameStarted: boolean;
  gameCompleted: boolean;
  gameFailed: boolean;
  showAssistant: boolean;
  assistantMessage: string;
  notification: Notification;
  currentTaskIndex: number;
};

export type CodeBlock = {
  id: string;
  type: 'if' | 'else' | 'for' | 'while' | 'function' | 'condition' | 'action';
  content: string;
  isPlaced: boolean;
};