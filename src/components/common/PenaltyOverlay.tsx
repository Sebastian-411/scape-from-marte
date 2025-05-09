import React from 'react';

interface PenaltyOverlayProps {
  show: boolean;
}

const PenaltyOverlay: React.FC<PenaltyOverlayProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-50 bg-red-600 bg-opacity-60 animate-pulse pointer-events-none" style={{animationDuration: '0.8s'}} />
  );
};

export default PenaltyOverlay; 