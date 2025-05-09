import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { usePenalty } from '../../hooks/usePenalty';
import PenaltyOverlay from '../common/PenaltyOverlay';
import { Zap } from 'lucide-react';

// Code blocks for loop challenge
const initialCodeBlocks = [
  { id: 'block2', type: 'forComplete', content: 'for (let panel = 0; panel < N; panel++) {', isPlaced: false },
  { id: 'block3', type: 'action', content: '  robot.limpiarPanel(panel);', isPlaced: false },
  { id: 'block4', type: 'close', content: '}', isPlaced: false },
  { id: 'block5', type: 'action', content: '  robot.verificarEnergia();', isPlaced: false },
  { id: 'block6', type: 'action', content: '  robot.calibrarPanel(panel);', isPlaced: false },
  { id: 'block7', type: 'action', content: '  robot.optimizarRendimiento();', isPlaced: false },
  { id: 'block8', type: 'action', content: '  robot.reportarEstado();', isPlaced: false },
  { id: 'block9', type: 'action', content: '  robot.reiniciarSistema();', isPlaced: false },
  { id: 'block10', type: 'action', content: '  robot.verificarConexiones();', isPlaced: false },
];

// Correct order of blocks
const correctOrder = ['block2', 'block3', 'block4'];

const SolarPanels: React.FC = () => {
  const { completeChallenge } = useGame();
  const { penalize, showPenalty } = usePenalty();
  const [codeBlocks, setCodeBlocks] = useState(() => {
    // Mezclar aleatoriamente los bloques al inicio
    return [...initialCodeBlocks].sort(() => Math.random() - 0.5);
  });
  const [placedBlocks, setPlacedBlocks] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [cleaningPanel, setCleaningPanel] = useState(-1);
  const [panelsClean, setPanelsClean] = useState([false, false, false, false, false]);
  const [iterations, setIterations] = useState(() => Math.floor(Math.random() * 4) + 1);
  const TOTAL_PANELS = 5;
  
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('blockId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData('blockId');
    
    // Don't allow already placed blocks
    const block = codeBlocks.find(b => b.id === blockId);
    if (!block || block.isPlaced) return;
    
    // Update the block as placed
    setCodeBlocks(codeBlocks.map(block => 
      block.id === blockId ? { ...block, isPlaced: true } : block
    ));
    
    // Add to placed blocks
    setPlacedBlocks([...placedBlocks, blockId]);
  };

  const removeBlock = (id: string) => {
    // Update the block as not placed
    setCodeBlocks(codeBlocks.map(block => 
      block.id === id ? { ...block, isPlaced: false } : block
    ));
    
    // Remove from placed blocks
    setPlacedBlocks(placedBlocks.filter(blockId => blockId !== id));
  };

  const executeAnimation = () => {
    // Simulate the loop animation
    setPanelsClean([false, false, false, false, false]);
    setCleaningPanel(-1);
    
    for (let i = 0; i < iterations; i++) {
      setTimeout(() => {
        setCleaningPanel(i);
        
        // Mark panel as clean after a short delay
        setTimeout(() => {
          setPanelsClean(prev => {
            const newPanels = [...prev];
            newPanels[i] = true;
            return newPanels;
          });
          
          // If we're cleaning the last panel, mark as success
          if (i === iterations - 1) {
            setIsCorrect(true);
            setFeedback(`¡Excelente! Has limpiado ${iterations} paneles solares.`);
            
            // Complete the challenge after showing the animation
            setTimeout(() => {
              completeChallenge('solar-panels');
            }, 1000);
          }
        }, 500);
      }, i * 1000);
    }
  };

  const checkSolution = () => {
    // Verificar que todos los bloques necesarios estén colocados
    if (placedBlocks.length !== correctOrder.length) {
      const penalty = penalize();
      setFeedback(`Necesitas colocar todos los bloques necesarios. Has perdido ${penalty} segundos de oxígeno. Faltan ${correctOrder.length - placedBlocks.length} bloques.`);
      return;
    }

    // Verificar el orden de los bloques
    const isSequenceCorrect = placedBlocks.every((blockId, index) => blockId === correctOrder[index]);
    
    if (!isSequenceCorrect) {
      const penalty = penalize();
      setFeedback(`El orden de los bloques no es correcto. Has perdido ${penalty} segundos de oxígeno. Asegúrate de que el bucle esté bien estructurado.`);
      return;
    }

    // Verificar que se vayan a limpiar todos los paneles
    if (iterations < TOTAL_PANELS) {
      const penalty = penalize();
      setFeedback(`Has perdido ${penalty} segundos de oxígeno. ¡El número de iteraciones no es suficiente para limpiar todos los paneles solares!`);
      return;
    }

    setFeedback('Ejecutando el bucle para limpiar los paneles...');
    executeAnimation();
  };

  const renderBlockContent = (block: typeof initialCodeBlocks[0]) => {
    if (block.type === 'forComplete') {
      return (
        <div className="flex items-center gap-1">
          <span className="font-mono">for (let panel = 0; panel &lt; </span>
          <input
            type="number"
            min="1"
            max={TOTAL_PANELS}
            value={iterations}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= TOTAL_PANELS) {
                setIterations(value);
              }
            }}
            className="w-16 bg-transparent border-b border-white text-white focus:outline-none text-center font-mono"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="font-mono">; panel++) {'{'}</span>
        </div>
      );
    }
    return <span className="font-mono">{block.content}</span>;
  };

  return (
    <div className="h-full flex flex-col relative">
      <PenaltyOverlay show={showPenalty} />
      {/* Solar panels visualization */}
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: TOTAL_PANELS }).map((_, i) => (
            <div 
              key={i}
              className={`w-16 h-24 relative transition-all duration-300 ${
                panelsClean[i] 
                  ? 'bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg' 
                  : 'bg-gradient-to-b from-gray-400 to-gray-600'
              } ${
                cleaningPanel === i ? 'transform scale-110' : ''
              }`}
            >
              {/* Panel structure */}
              <div className="absolute inset-1 grid grid-cols-2 grid-rows-2 gap-1">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div 
                    key={j}
                    className={`${panelsClean[i] ? 'bg-blue-300' : 'bg-gray-300'} border border-black`}
                  ></div>
                ))}
              </div>
              
              {/* Dust overlay */}
              {!panelsClean[i] && (
                <div className="absolute inset-0 bg-brown-200 bg-opacity-50">
                  {Array.from({ length: 10 }).map((_, j) => (
                    <div 
                      key={j}
                      className="absolute w-2 h-2 bg-amber-800 rounded-full opacity-40"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                    ></div>
                  ))}
                </div>
              )}
              
              {/* Cleaning animation */}
              {cleaningPanel === i && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-blue-300 bg-opacity-40 animate-pulse flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
              
              {/* Powered indicator */}
              {panelsClean[i] && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Code building area */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Available blocks */}
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="font-bold mb-2 text-gray-700">Bloques Disponibles:</h3>
          <div className="flex flex-wrap gap-2">
            {codeBlocks.filter(block => !block.isPlaced).map(block => (
              <div
                key={block.id}
                className={`p-2 rounded cursor-move ${
                  block.type === 'for' ? 'bg-purple-600 text-white' : 
                  block.type === 'forEnd' ? 'bg-purple-600 text-white' :
                  block.type === 'close' ? 'bg-red-600 text-white' :
                  'bg-blue-600 text-white'
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, block.id)}
              >
                {renderBlockContent(block)}
              </div>
            ))}
          </div>
        </div>
        
        {/* Drop area */}
        <div 
          className="flex-1 p-4 bg-gray-800 rounded-lg shadow flex flex-col"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h3 className="font-bold mb-2 text-white">Código de Limpieza:</h3>
          <div className="flex-1 font-mono text-sm">
            {placedBlocks.length === 0 ? (
              <div className="text-gray-500 italic">Arrastra los bloques aquí para construir el bucle...</div>
            ) : (
              <div className="space-y-1">
                {placedBlocks.map(blockId => {
                  const block = codeBlocks.find(b => b.id === blockId);
                  if (!block) return null;
                  return (
                    <div 
                      key={blockId}
                      className={`p-2 rounded flex justify-between items-center ${
                        block.type === 'for' ? 'bg-purple-800 text-white' : 
                        block.type === 'forEnd' ? 'bg-purple-800 text-white' :
                        block.type === 'close' ? 'bg-red-800 text-white' :
                        'bg-blue-800 text-white'
                      }`}
                    >
                      {renderBlockContent(block)}
                      <button 
                        className="ml-2 text-white hover:text-red-300"
                        onClick={() => removeBlock(blockId)}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        {/* Explanation area */}
        <div className="p-3 bg-blue-100 rounded text-blue-800 text-sm">
          <p className="mb-1 font-bold">Recuerda:</p>
          <p>Un bucle <code className="bg-blue-200 px-1 rounded">for</code> repite una acción varias veces. Observa cuántos paneles solares hay y asegúrate de limpiarlos todos.</p>
        </div>
        
        {/* Feedback area */}
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : feedback ? 'bg-yellow-100' : 'bg-gray-100'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : feedback ? 'text-amber-700' : 'text-gray-500'}`}>
            {feedback || "Construye un bucle para limpiar los paneles solares."}
          </p>
        </div>
        
        {/* Action button */}
        <button 
          className={`p-3 rounded-lg ${
            placedBlocks.length === correctOrder.length
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          } font-bold transition-colors`}
          disabled={placedBlocks.length !== correctOrder.length || isCorrect}
          onClick={checkSolution}
        >
          Ejecutar Bucle
        </button>
      </div>
    </div>
  );
};

export default SolarPanels;