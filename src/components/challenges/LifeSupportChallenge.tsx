import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Droplets, Zap, Thermometer, Wind } from 'lucide-react';

interface SystemStatus {
  id: string;
  name: string;
  icon: React.ReactNode;
  value: number;
  target: number;
  status: 'critical' | 'warning' | 'optimal';
  trend: 'up' | 'down' | 'stable';
}

const LifeSupportChallenge: React.FC = () => {
  const { completeChallenge } = useGame();
  const [systems, setSystems] = useState<SystemStatus[]>([
    {
      id: 'oxygen',
      name: 'Oxígeno',
      icon: <Droplets className="w-5 h-5" />,
      value: 65,
      target: 75,
      status: 'warning',
      trend: 'up'
    },
    {
      id: 'power',
      name: 'Energía',
      icon: <Zap className="w-5 h-5" />,
      value: 45,
      target: 60,
      status: 'critical',
      trend: 'down'
    },
    {
      id: 'temperature',
      name: 'Temperatura',
      icon: <Thermometer className="w-5 h-5" />,
      value: 28,
      target: 22,
      status: 'warning',
      trend: 'up'
    },
    {
      id: 'pressure',
      name: 'Presión',
      icon: <Wind className="w-5 h-5" />,
      value: 0.8,
      target: 1.0,
      status: 'optimal',
      trend: 'stable'
    }
  ]);

  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [adjustmentValue, setAdjustmentValue] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Simular fluctuaciones aleatorias en los sistemas
  useEffect(() => {
    const interval = setInterval(() => {
      setSystems(prev => prev.map(system => {
        const fluctuation = (Math.random() - 0.5) * 2;
        const newValue = system.id === 'pressure' 
          ? Math.max(0.5, Math.min(1.5, system.value + fluctuation * 0.05))
          : Math.max(0, Math.min(100, system.value + fluctuation));
        
        const trend = newValue > system.value ? 'up' : newValue < system.value ? 'down' : 'stable';
        const status = Math.abs(newValue - system.target) < 5 ? 'optimal' :
                      Math.abs(newValue - system.target) < 15 ? 'warning' : 'critical';

        return { ...system, value: newValue, trend, status };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleAdjustment = () => {
    if (!selectedSystem) return;

    setSystems(prev => prev.map(system => {
      if (system.id === selectedSystem) {
        const newValue = system.id === 'pressure'
          ? Math.max(0.5, Math.min(1.5, system.value + adjustmentValue * 0.05))
          : Math.max(0, Math.min(100, system.value + adjustmentValue));
        
        const trend = newValue > system.value ? 'up' : newValue < system.value ? 'down' : 'stable';
        const status = Math.abs(newValue - system.target) < 5 ? 'optimal' :
                      Math.abs(newValue - system.target) < 15 ? 'warning' : 'critical';

        return { ...system, value: newValue, trend, status };
      }
      return system;
    }));

    setAdjustmentValue(0);
  };

  // Verificar si todos los sistemas están óptimos
  useEffect(() => {
    const allOptimal = systems.every(system => system.status === 'optimal');
    if (allOptimal && !isComplete) {
      setIsComplete(true);
      setFeedback('¡Todos los sistemas están en niveles óptimos!');
      setTimeout(() => completeChallenge('life-support'), 2000);
    }
  }, [systems, isComplete, completeChallenge]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold text-blue-400 mb-2">Sistema de Soporte Vital</h2>
      <p className="text-gray-300 mb-6 text-center max-w-md">
        Mantén todos los sistemas de soporte vital en niveles óptimos. Ajusta cada sistema para mantener la nave habitable.
      </p>

      {/* Panel de control principal */}
      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl mb-6">
        {/* Visualización de sistemas */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20 backdrop-blur-sm">
          <h3 className="text-blue-400 font-bold mb-4">Estado de los Sistemas</h3>
          <div className="space-y-4">
            {systems.map((system) => (
              <div 
                key={system.id}
                className={`relative p-4 rounded-lg border-2 transition-all duration-500 cursor-pointer
                  ${system.status === 'optimal' ? 'border-green-500/50 bg-green-900/20' :
                    system.status === 'warning' ? 'border-orange-500/50 bg-orange-900/20' :
                    'border-red-500/50 bg-red-900/20'}
                  ${selectedSystem === system.id ? 'ring-2 ring-blue-500' : ''}
                `}
                onClick={() => setSelectedSystem(system.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {system.icon}
                    <span className="text-gray-200 font-medium">{system.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${
                      system.status === 'optimal' ? 'text-green-400' :
                      system.status === 'warning' ? 'text-orange-400' :
                      'text-red-400'
                    }`}>
                      {system.id === 'pressure' ? system.value.toFixed(2) : Math.round(system.value)}%
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      system.trend === 'up' ? 'bg-green-400' :
                      system.trend === 'down' ? 'bg-red-400' :
                      'bg-blue-400'
                    }`} />
                  </div>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      system.status === 'optimal' ? 'bg-green-500' :
                      system.status === 'warning' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(system.value / (system.id === 'pressure' ? 1.5 : 100)) * 100}%` }}
                  />
                </div>
                <div className="absolute top-2 right-2 text-xs text-gray-400">
                  Objetivo: {system.id === 'pressure' ? system.target.toFixed(2) : system.target}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel de control */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20 backdrop-blur-sm">
          <h3 className="text-blue-400 font-bold mb-4">Control de Ajustes</h3>
          
          {selectedSystem ? (
            <div className="space-y-4">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h4 className="text-gray-300 mb-2">
                  Ajustando: {systems.find(s => s.id === selectedSystem)?.name}
                </h4>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    value={adjustmentValue}
                    onChange={(e) => setAdjustmentValue(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-gray-300 w-16 text-right">
                    {adjustmentValue > 0 ? '+' : ''}{adjustmentValue}
                  </span>
                </div>
              </div>

              <button
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                onClick={handleAdjustment}
              >
                Aplicar Ajuste
              </button>

              <div className="text-sm text-gray-400">
                <p>• Mantén los niveles dentro del rango óptimo</p>
                <p>• Los sistemas fluctúan naturalmente</p>
                <p>• Ajusta gradualmente para evitar cambios bruscos</p>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">
              Selecciona un sistema para ajustar sus parámetros
            </div>
          )}
        </div>
      </div>

      {/* Feedback */}
      <div className={`text-lg font-bold ${
        isComplete ? 'text-green-400' : 'text-gray-400'
      }`}>
        {feedback}
      </div>
    </div>
  );
};

export default LifeSupportChallenge; 