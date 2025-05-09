import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';

// Tipos de filtros y sus propiedades
interface Filter {
  id: number;
  type: 'primary' | 'secondary' | 'tertiary';
  efficiency: number;
  pressure: number;
  temperature: number;
  status: 'off' | 'warming' | 'active' | 'error';
}

// Bloques de código disponibles
const initialBlocks = [
  { 
    id: 'init', 
    label: 'inicializarSistema();', 
    type: 'system',
    isPlaced: false 
  },
  { 
    id: 'check', 
    label: 'verificarPresion();', 
    type: 'check',
    isPlaced: false 
  },
  { 
    id: 'filter1', 
    label: 'activarFiltro(1, { temperatura: 25, presion: 2.5 });', 
    type: 'filter',
    filterId: 1,
    isPlaced: false 
  },
  { 
    id: 'filter2', 
    label: 'activarFiltro(2, { temperatura: 30, presion: 3.0 });', 
    type: 'filter',
    filterId: 2,
    isPlaced: false 
  },
  { 
    id: 'filter3', 
    label: 'activarFiltro(3, { temperatura: 35, presion: 3.5 });', 
    type: 'filter',
    filterId: 3,
    isPlaced: false 
  },
  { 
    id: 'monitor', 
    label: 'monitorearNiveles();', 
    type: 'monitor',
    isPlaced: false 
  },
  { 
    id: 'optimize', 
    label: 'optimizarRendimiento();', 
    type: 'optimize',
    isPlaced: false 
  }
];

const correctOrder = ['init', 'check', 'filter1', 'filter2', 'filter3', 'monitor', 'optimize'];

const OxygenSystemChallenge: React.FC = () => {
  const { completeChallenge } = useGame();
  const [blocks, setBlocks] = useState(initialBlocks);
  const [placedBlocks, setPlacedBlocks] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([
    { id: 1, type: 'primary', efficiency: 0, pressure: 0, temperature: 0, status: 'off' },
    { id: 2, type: 'secondary', efficiency: 0, pressure: 0, temperature: 0, status: 'off' },
    { id: 3, type: 'tertiary', efficiency: 0, pressure: 0, temperature: 0, status: 'off' }
  ]);
  const [systemStatus, setSystemStatus] = useState<'off' | 'initializing' | 'running' | 'optimizing'>('off');
  const [oxygenLevel, setOxygenLevel] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; active: boolean }>>([]);

  // Efecto para generar partículas de oxígeno
  useEffect(() => {
    if (systemStatus === 'running') {
      const interval = setInterval(() => {
        setParticles(prev => {
          const newParticles = prev.filter(p => p.active);
          if (newParticles.length < 20) {
            newParticles.push({
              id: Date.now(),
              x: Math.random() * 100,
              y: 0,
              active: true
            });
          }
          return newParticles.map(p => ({
            ...p,
            y: p.y + 2,
            active: p.y < 100
          }));
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [systemStatus]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('blockId', id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData('blockId');
    if (!placedBlocks.includes(blockId)) {
      setPlacedBlocks([...placedBlocks, blockId]);
      setBlocks(blocks.map(b => b.id === blockId ? { ...b, isPlaced: true } : b));
    }
  };

  const removeBlock = (id: string) => {
    setPlacedBlocks(placedBlocks.filter(b => b !== id));
    setBlocks(blocks.map(b => b.id === id ? { ...b, isPlaced: false } : b));
  };

  const runAnimation = () => {
    setFeedback('Iniciando secuencia de activación...');
    setSystemStatus('initializing');
    
    let step = 0;
    const sequence = placedBlocks;
    const interval = setInterval(() => {
      if (step < sequence.length) {
        const currentBlock = blocks.find(b => b.id === sequence[step]);
        
        switch (currentBlock?.type) {
          case 'system':
            setSystemStatus('initializing');
            break;
          case 'check':
            setFeedback('Verificando parámetros del sistema...');
            break;
          case 'filter':
            const filterId = currentBlock.filterId;
            setFilters(prev => prev.map(f => 
              f.id === filterId 
                ? { ...f, status: 'warming', temperature: 25 + (filterId * 5) }
                : f
            ));
            setTimeout(() => {
              setFilters(prev => prev.map(f => 
                f.id === filterId 
                  ? { ...f, status: 'active', efficiency: 85 + (filterId * 5) }
                  : f
              ));
            }, 1000);
            break;
          case 'monitor':
            setSystemStatus('running');
            setOxygenLevel(75);
            break;
          case 'optimize':
            setSystemStatus('optimizing');
            setOxygenLevel(95);
            break;
        }
        
        step++;
      } else {
        clearInterval(interval);
        if (JSON.stringify(placedBlocks) === JSON.stringify(correctOrder)) {
          setFeedback('¡Sistema de oxígeno optimizado y funcionando al 100%!');
          setIsCorrect(true);
          setTimeout(() => completeChallenge('oxygen-system'), 2000);
        } else {
          setFeedback('Error en la secuencia. El sistema no está optimizado.');
          setSystemStatus('off');
          setFilters(prev => prev.map(f => ({ ...f, status: 'off', efficiency: 0 })));
          setOxygenLevel(0);
        }
      }
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold text-blue-400 mb-2">Sistema de Oxígeno</h2>
      <p className="text-gray-300 mb-6 text-center max-w-md">
        Programa la secuencia de activación del sistema de oxígeno. Debes inicializar el sistema, verificar la presión, activar los filtros en orden, monitorear los niveles y optimizar el rendimiento.
      </p>

      {/* Panel de control principal */}
      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl mb-6">
        {/* Visualización del sistema */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20 backdrop-blur-sm">
          <h3 className="text-blue-400 font-bold mb-4">Estado del Sistema</h3>
          <div className="space-y-4">
            {filters.map((filter) => (
              <div key={filter.id} className="relative">
                <div className={`h-24 rounded-lg border-2 transition-all duration-500 ${
                  filter.status === 'active' ? 'border-blue-400 bg-blue-900/30' :
                  filter.status === 'warming' ? 'border-orange-400 bg-orange-900/30' :
                  'border-gray-600 bg-gray-700/30'
                }`}>
                  <div className="absolute inset-0 overflow-hidden">
                    {filter.status === 'active' && (
                      <div className="absolute inset-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float"
                            style={{
                              left: `${20 + (i * 15)}%`,
                              bottom: '0%',
                              animationDelay: `${i * 0.2}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 left-2 text-sm text-gray-300">
                    Filtro {filter.id} - {filter.type}
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      filter.status === 'active' ? 'bg-green-400 animate-pulse' :
                      filter.status === 'warming' ? 'bg-orange-400 animate-pulse' :
                      'bg-gray-400'
                    }`} />
                    <span className="text-xs text-gray-300">
                      {filter.status === 'active' ? `${filter.efficiency}%` :
                       filter.status === 'warming' ? `${filter.temperature}°C` :
                       'Off'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Nivel de oxígeno */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Nivel de Oxígeno</span>
              <span>{oxygenLevel}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 transition-all duration-500"
                style={{ width: `${oxygenLevel}%` }}
              />
            </div>
          </div>
        </div>

        {/* Área de programación */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20 backdrop-blur-sm">
          <h3 className="text-blue-400 font-bold mb-4">Programación</h3>
          
          {/* Bloques disponibles */}
          <div className="mb-4">
            <h4 className="text-sm text-gray-300 mb-2">Bloques disponibles:</h4>
            <div className="flex flex-wrap gap-2">
              {blocks.filter(b => !b.isPlaced).map(block => (
                <div
                  key={block.id}
                  className="px-3 py-2 bg-blue-900/50 text-blue-300 rounded-lg shadow cursor-move text-sm font-mono hover:bg-blue-800/50 transition-all border border-blue-500/30"
                  draggable
                  onDragStart={e => handleDragStart(e, block.id)}
                >
                  {block.label}
                </div>
              ))}
            </div>
          </div>

          {/* Área de construcción */}
          <div
            className="min-h-[200px] bg-gray-900/50 rounded-lg p-3 flex flex-col gap-2 border-2 border-dashed border-blue-500/30"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
          >
            {placedBlocks.length === 0 ? (
              <span className="text-gray-500 italic text-sm">Arrastra los bloques aquí en el orden correcto...</span>
            ) : (
              placedBlocks.map(blockId => {
                const block = blocks.find(b => b.id === blockId);
                if (!block) return null;
                return (
                  <div key={block.id} className="px-3 py-2 bg-blue-800/50 text-blue-300 rounded-lg font-mono flex items-center justify-between text-sm border border-blue-500/30">
                    <span>{block.label}</span>
                    <button 
                      className="ml-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                      onClick={() => removeBlock(block.id)}
                    >
                      ×
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-col items-center gap-4">
        <button
          className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
            isCorrect 
              ? 'bg-green-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
          onClick={runAnimation}
          disabled={isCorrect}
        >
          Ejecutar Secuencia
        </button>
        
        <div className={`text-lg font-bold ${
          isCorrect ? 'text-green-400' : 
          systemStatus === 'running' ? 'text-blue-400' :
          systemStatus === 'optimizing' ? 'text-green-400' :
          'text-gray-400'
        }`}>
          {feedback}
        </div>
      </div>
    </div>
  );
};

export default OxygenSystemChallenge; 