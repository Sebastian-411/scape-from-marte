import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Code } from 'lucide-react';

interface Cable {
  id: string;
  equation: string;
  solution: number;
  connected: boolean;
  connectionId: string | null;
  code: string;
  side: 'left' | 'right';
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

const generateEquation = () => {
  const operations = [
    {
      type: 'sum',
      generate: () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const solution = num1 + num2;
        const code = `function calculate() {
  let result = 0;
  for(let i = 0; i < ${num1}; i++) {
    result += 1;
  }
  for(let i = 0; i < ${num2}; i++) {
    result += 1;
  }
  return result;
}`;
        return {
          equation: `${num1} + ${num2}`,
          solution,
          code
        };
      }
    },
    {
      type: 'multiply',
      generate: () => {
        const num1 = Math.floor(Math.random() * 5) + 1;
        const num2 = Math.floor(Math.random() * 5) + 1;
        const solution = num1 * num2;
        const code = `function calculate() {
  let result = 0;
  for(let i = 0; i < ${num1}; i++) {
    result += ${num2};
  }
  return result;
}`;
        return {
          equation: `${num1} × ${num2}`,
          solution,
          code
        };
      }
    },
    {
      type: 'power',
      generate: () => {
        const base = Math.floor(Math.random() * 3) + 2;
        const exp = Math.floor(Math.random() * 3) + 2;
        const solution = Math.pow(base, exp);
        const code = `function calculate() {
  let result = 1;
  for(let i = 0; i < ${exp}; i++) {
    result *= ${base};
  }
  return result;
}`;
        return {
          equation: `${base}^${exp}`,
          solution,
          code
        };
      }
    },
    {
      type: 'fibonacci',
      generate: () => {
        const n = Math.floor(Math.random() * 5) + 5;
        const solution = n;
        const code = `function calculate() {
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
  }
  return fibonacci(${n});
}`;
        return {
          equation: `fibonacci(${n})`,
          solution,
          code
        };
      }
    },
    {
      type: 'factorial',
      generate: () => {
        const n = Math.floor(Math.random() * 5) + 1;
        const solution = Array.from({length: n}, (_, i) => i + 1).reduce((a, b) => a * b, 1);
        const code = `function calculate() {
  function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
  }
  return factorial(${n});
}`;
        return {
          equation: `${n}!`,
          solution,
          code
        };
      }
    }
  ];

  const operation = operations[Math.floor(Math.random() * operations.length)];
  return operation.generate();
};

const CommunicationsChallenge: React.FC = () => {
  const { completeChallenge } = useGame();
  const [cables, setCables] = useState<Cable[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedCable, setSelectedCable] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [signalStrength, setSignalStrength] = useState(0);

  // Generar cables iniciales
  useEffect(() => {
    const newCables: Cable[] = [];
    const solutions: number[] = [];
    
    // Generar 5 soluciones únicas
    while (solutions.length < 5) {
      const { solution } = generateEquation();
      if (!solutions.includes(solution)) {
        solutions.push(solution);
      }
    }
    
    // Generar 5 cables para el lado izquierdo
    for (let i = 0; i < 5; i++) {
      const { equation, code } = generateEquation();
      newCables.push({
        id: `left-${i}`,
        equation,
        solution: solutions[i],
        code,
        connected: false,
        connectionId: null,
        side: 'left'
      });
    }
    
    // Generar 5 cables para el lado derecho con las mismas soluciones
    for (let i = 0; i < 5; i++) {
      const { equation, code } = generateEquation();
      newCables.push({
        id: `right-${i}`,
        equation,
        solution: solutions[i],
        code,
        connected: false,
        connectionId: null,
        side: 'right'
      });
    }
    
    setCables(newCables);
  }, []);

  const handleCableSelect = (cableId: string) => {
    if (selectedCable === cableId) {
      setSelectedCable(null);
      return;
    }

    if (!selectedCable) {
      setSelectedCable(cableId);
      return;
    }

    // Intentar conectar cables
    const cable1 = cables.find(c => c.id === selectedCable);
    const cable2 = cables.find(c => c.id === cableId);

    if (!cable1 || !cable2) return;

    // Verificar que los cables sean de lados opuestos
    if (cable1.side === cable2.side) {
      setFeedback('Error: Debes conectar cables de lados opuestos');
      setSelectedCable(null);
      return;
    }

    // Verificar si la conexión es correcta
    if (cable1.solution === cable2.solution) {
      const newConnection = {
        id: `conn-${selectedCable}-${cableId}`,
        from: selectedCable,
        to: cableId
      };

      setConnections([...connections, newConnection]);
      setCables(cables.map(c => {
        if (c.id === selectedCable || c.id === cableId) {
          return { ...c, connected: true, connectionId: newConnection.id };
        }
        return c;
      }));

      setFeedback('¡Conexión exitosa!');
      setSignalStrength(prev => Math.min(100, prev + 20)); // Ahora cada conexión vale 20%
    } else {
      setFeedback('Error: Las soluciones no coinciden');
    }

    setSelectedCable(null);
  };

  // Verificar si el reto está completo
  useEffect(() => {
    if (signalStrength >= 100 && !isComplete) {
      setIsComplete(true);
      setFeedback('¡Comunicaciones restauradas!');
      setTimeout(() => completeChallenge('communications'), 2000);
    }
  }, [signalStrength, isComplete, completeChallenge]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold text-blue-400 mb-2">Sistema de Comunicaciones</h2>
      <p className="text-gray-300 mb-6 text-center max-w-md">
        Conecta los cables cortados según el resultado de sus funciones. Cada cable debe conectarse con otro que tenga la misma solución.
      </p>

      {/* Panel de control principal */}
      <div className="grid grid-cols-3 gap-8 w-full max-w-6xl mb-6">
        {/* Cables izquierdos - Solo código */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20 backdrop-blur-sm">
          <h3 className="text-blue-400 font-bold mb-4">Código Fuente</h3>
          <div className="space-y-4">
            {cables.filter(c => c.side === 'left').map((cable) => (
              <div
                key={cable.id}
                className={`relative p-4 rounded-lg border-2 transition-all duration-500 cursor-pointer
                  ${cable.connected ? 'border-green-500/50 bg-green-900/20' :
                    selectedCable === cable.id ? 'border-blue-500 bg-blue-900/20' :
                    'border-gray-600 bg-gray-700/20'}
                `}
                onClick={() => !cable.connected && handleCableSelect(cable.id)}
              >
                {/* Cable visual */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-600">
                  <div className="absolute top-0 right-0 w-1 h-1 bg-red-500 rounded-full"></div>
                </div>
                
                {/* Contenido del cable */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Code className={`w-5 h-5 ${
                        cable.connected ? 'text-green-400' : 'text-gray-400'
                      }`} />
                      <span className="text-gray-200 font-mono text-sm">Cable {cable.id.split('-')[1]}</span>
                    </div>
                    {cable.connected && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </div>
                  
                  {/* Código expuesto */}
                  <div className="mt-2 p-2 bg-gray-900/50 rounded text-xs font-mono text-gray-300 overflow-x-auto">
                    <pre className="whitespace-pre-wrap break-words">{cable.code}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel central - Conexiones y estado */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20 backdrop-blur-sm">
          <h3 className="text-blue-400 font-bold mb-4">Estado de la Antena</h3>
          
          {/* Indicador de señal */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Fuerza de Señal</span>
              <span>{Math.round(signalStrength)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 transition-all duration-500"
                style={{ width: `${signalStrength}%` }}
              />
            </div>
          </div>

          {/* Conexiones activas */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            <h4 className="text-gray-300 text-sm mb-2">Conexiones Activas:</h4>
            {connections.map((conn) => {
              const cable1 = cables.find(c => c.id === conn.from);
              const cable2 = cables.find(c => c.id === conn.to);
              return (
                <div key={conn.id} className="bg-gray-900/50 p-2 rounded text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-green-400" />
                    <span className="truncate">Cable {cable1?.id.split('-')[1]} → {cable2?.equation}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Instrucciones */}
          <div className="mt-6 text-sm text-gray-400">
            <p>• Analiza el código de cada cable</p>
            <p>• Conecta con el resultado correcto</p>
            <p>• Restaura todas las conexiones</p>
          </div>
        </div>

        {/* Cables derechos - Solo resultados */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20 backdrop-blur-sm">
          <h3 className="text-blue-400 font-bold mb-4">Resultados</h3>
          <div className="space-y-4">
            {cables.filter(c => c.side === 'right').map((cable) => (
              <div
                key={cable.id}
                className={`relative p-4 rounded-lg border-2 transition-all duration-500 cursor-pointer
                  ${cable.connected ? 'border-green-500/50 bg-green-900/20' :
                    selectedCable === cable.id ? 'border-blue-500 bg-blue-900/20' :
                    'border-gray-600 bg-gray-700/20'}
                `}
                onClick={() => !cable.connected && handleCableSelect(cable.id)}
              >
                {/* Cable visual */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-600">
                  <div className="absolute top-0 left-0 w-1 h-1 bg-red-500 rounded-full"></div>
                </div>
                
                {/* Contenido del cable */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Code className={`w-5 h-5 ${
                        cable.connected ? 'text-green-400' : 'text-gray-400'
                      }`} />
                      <span className="text-gray-200 font-mono text-sm">{cable.equation}</span>
                    </div>
                    {cable.connected && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </div>
                  
                  {/* Resultado */}
                  <div className="mt-2 p-2 bg-gray-900/50 rounded text-sm font-mono text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>Resultado:</span>
                      <span className="text-blue-400 font-bold">{cable.solution}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

export default CommunicationsChallenge; 