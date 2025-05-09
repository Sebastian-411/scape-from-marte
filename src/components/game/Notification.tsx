import React, { useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';

const Notification: React.FC = () => {
  const { state, dispatch } = useGame();
  const { notification } = state;

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-down ${
          notification.type === 'success'
            ? 'bg-green-500/90 text-white'
            : 'bg-blue-500/90 text-white'
        }`}
      >
        {notification.type === 'success' ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <span className="font-medium">{notification.message}</span>
      </div>
    </div>
  );
};

export default Notification; 