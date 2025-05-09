import { useState } from 'react';
import { useGame } from '../contexts/GameContext';

export const usePenalty = () => {
  const { penalizeTime } = useGame();
  const [errorCount, setErrorCount] = useState(0);
  const [showPenalty, setShowPenalty] = useState(false);

  const penalize = () => {
    const nextError = errorCount + 1;
    setErrorCount(nextError);
    // Penalización exponencial: 10 * 2^(errorCount)
    // Para errorCount = 0, penalty = 10
    // Para errorCount = 1, penalty = 20
    // Para errorCount = 2, penalty = 40
    // Para errorCount = 3, penalty = 80
    // etc.
    const penalty = 10 * Math.pow(2, errorCount);
    penalizeTime(penalty);
    setShowPenalty(true);
    setTimeout(() => setShowPenalty(false), 800);
    return penalty;
  };

  return {
    errorCount,
    showPenalty,
    penalize
  };
}; 