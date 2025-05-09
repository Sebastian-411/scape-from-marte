import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Droplets } from 'lucide-react';

// Define particles for the fuel system
const initialParticles = [
  { id: 1, type: 'fuel', size: 30, color: '#FFD166' },
  { id: 2, type: 'contaminant', size: 20, color: '#073B4C' },
  { id: 3, type: 'fuel', size: 25, color: '#FFD166' },
  { id: 4, type: 'contaminant', size: 15, color: '#073B4C' },
  { id: 5, type: 'fuel', size: 35, color: '#FFD166' },
  { id: 6, type: 'contaminant', size: 18, color: '#073B4C' },
  { id: 7, type: 'fuel', size: 28, color: '#FFD166' },
  { id: 8, type: 'fuel', size: 32, color: '#FFD166' },
];

// Define particle types
const particleTypes = [
  { value: 'fuel', label: 'Combustible', color: '#FFD166' },
  { value: 'contaminant', label: 'Contaminante', color: '#073B4C' }
];

// Define code blocks
const initialCodeBlocks = [
  // Bloques principales y distractores mezclados
  { id: 'block1', type: 'function', content: 'function filtrarParticula(particula) {', isPlaced: false },
  { id: 'block13', type: 'function', content: 'function purificarCombustible() {', isPlaced: false },
  { id: 'block8', type: 'if', content: '  if (particula.size > ', isPlaced: false },
  { id: 'block2', type: 'if', content: '  if (particula.type === ', isPlaced: false },
  { id: 'block14', type: 'variable', content: '  let pureza = 0;', isPlaced: false },
  { id: 'block3', type: 'return', content: '    return true;', isPlaced: false },
  { id: 'block15', type: 'loop', content: '  for (let i = 0; i < 10; i++) {', isPlaced: false },
  { id: 'block4', type: 'else', content: '  } else {', isPlaced: false },
  { id: 'block16', type: 'condition', content: '  if (pureza > 80) {', isPlaced: false },
  { id: 'block9', type: 'number', content: '25', isPlaced: false },
  { id: 'block5', type: 'return', content: '    return false;', isPlaced: false },
  { id: 'block17', type: 'action', content: '    purificar();', isPlaced: false },
  { id: 'block10', type: 'operator', content: '  &&', isPlaced: false },
  { id: 'block6', type: 'closureIf', content: '  } // cierre if', isPlaced: false },
  { id: 'block11', type: 'operator', content: '  ||', isPlaced: false },
  { id: 'block18', type: 'action', content: '    limpiarFiltro();', isPlaced: false },
  { id: 'block12', type: 'return', content: '    return particula.size;', isPlaced: false },
  { id: 'block7', type: 'closureFunc', content: '} // cierre función', isPlaced: false },
];

// The correct order of blocks
const correctOrder = ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'];

const FuelPurifier: React.FC = () => {
  const { completeChallenge } = useGame();
  const [codeBlocks, setCodeBlocks] = useState(initialCodeBlocks);
  const [placedBlocks, setPlacedBlocks] = useState<string[]>([]);
  const [particles, setParticles] = useState(initialParticles);
  const [filteredParticles, setFilteredParticles] = useState<typeof initialParticles>([]);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedParticleType, setSelectedParticleType] = useState('fuel');
  
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

  const runFilterAnimation = () => {
    setAnimationInProgress(true);
    setFilteredParticles([]);
    
    // Filter out one particle at a time
    particles.forEach((particle, index) => {
      setTimeout(() => {
        if (particle.type === 'fuel') {
          setFilteredParticles(prev => [...prev, particle]);
        }
        
        // When done, show success
        if (index === particles.length - 1) {
          setTimeout(() => {
            setAnimationInProgress(false);
            setIsCorrect(true);
            setFeedback('¡Excelente! Has purificado el combustible correctamente.');
            
            // Complete the challenge
            setTimeout(() => {
              completeChallenge('fuel-purifier');
            }, 1500);
          }, 1000);
        }
      }, index * 700);
    });
  };

  const renderBlockContent = (block: typeof initialCodeBlocks[0]) => {
    if (block.type === 'if') {
      return (
        <div className="flex items-center gap-1">
          <span className="font-mono">{block.content}</span>
          <select
            value={selectedParticleType}
            onChange={(e) => setSelectedParticleType(e.target.value)}
            className="bg-transparent border-b border-white text-white focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {particleTypes.map(type => (
              <option key={type.value} value={type.value} className="bg-gray-800">
                {type.label}
              </option>
            ))}
          </select>
          <span className="font-mono">") {`{`}</span>
        </div>
      );
    }
    if (block.type === 'closureIf' || block.type === 'closureFunc') {
      return (
        <div className="flex items-center gap-2">
          <span className="font-mono">{block.content}</span>
          <span className="text-xs opacity-70">
            {block.type === 'closureIf' ? '← cierre if' : '← cierre función'}
          </span>
          {block.type === 'closureIf' ? (
            <Droplets className="w-4 h-4 opacity-70" />
          ) : (
            <div className="w-4 h-4 rounded-full border border-current opacity-70" />
          )}
        </div>
      );
    }
    return <span className="font-mono">{block.content}</span>;
  };

  const checkSolution = () => {
    const isSequenceCorrect = placedBlocks.every((blockId, index) => blockId === correctOrder[index]);
    const isParticleTypeCorrect = selectedParticleType === 'fuel';
    
    // Verificar que los bloques sean los correctos y estén en el orden correcto
    if (!isSequenceCorrect) {
      // Verificar si están todos los bloques necesarios
      const hasAllRequiredBlocks = correctOrder.every(blockId => placedBlocks.includes(blockId));
      if (!hasAllRequiredBlocks) {
        setFeedback('Faltan algunos bloques necesarios. Asegúrate de incluir todos los bloques de la función.');
        return;
      }

      // Verificar el orden específico de los bloques
      const wrongOrderIndex = placedBlocks.findIndex((blockId, index) => blockId !== correctOrder[index]);
      if (wrongOrderIndex >= 0) {
        setFeedback(`El orden de los bloques no es correcto. Revisa la estructura de la función.`);
        return;
      }
    }

    if (!isParticleTypeCorrect) {
      setFeedback('¡Cuidado! Debes filtrar el combustible, no los contaminantes.');
      return;
    }
    
    setFeedback('Ejecutando función de filtrado...');
    runFilterAnimation();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Fuel tank visualization */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-10 items-center">
          {/* Input tank */}
          <div className="w-32 h-64 rounded-b-lg border-2 border-gray-400 relative bg-gray-200">
            <div className="absolute inset-x-0 bottom-0 h-48 bg-amber-200 rounded-b-lg overflow-hidden">
              {/* Original particles */}
              {particles.map(particle => (
                <div 
                  key={particle.id}
                  className={`absolute rounded-full transition-all duration-500 ${
                    animationInProgress ? 'animate-bounce-slow' : ''
                  }`}
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: particle.color,
                    left: `${Math.random() * 70 + 15}%`,
                    top: `${Math.random() * 70}%`,
                    opacity: animationInProgress ? 0.7 : 1
                  }}
                ></div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-full text-center text-gray-600 font-bold">
              Combustible Impuro
            </div>
          </div>
          
          {/* Filter pipe */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-10 bg-gray-400 rounded-lg mb-2 flex items-center justify-center">
              <Droplets className={`w-8 h-8 ${isCorrect ? 'text-blue-500' : 'text-gray-600'}`} />
            </div>
            <div className="h-32 w-8 bg-gray-300 rounded-lg relative overflow-hidden">
              {/* Filter animation */}
              {animationInProgress && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-4 bg-blue-400 animate-pulse"></div>
                </div>
              )}
            </div>
            <div className="mt-2 text-sm text-center text-gray-600">
              Filtro
            </div>
          </div>
          
          {/* Output tank */}
          <div className="w-32 h-64 rounded-b-lg border-2 border-gray-400 relative bg-gray-200">
            <div className="absolute inset-x-0 bottom-0 h-48 bg-amber-100 rounded-b-lg overflow-hidden">
              {/* Filtered particles */}
              {filteredParticles.map(particle => (
                <div 
                  key={particle.id}
                  className="absolute rounded-full animate-float"
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: '#FFDA85', // Cleaner color
                    left: `${Math.random() * 70 + 15}%`,
                    top: `${Math.random() * 70}%`,
                  }}
                ></div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-full text-center text-gray-600 font-bold">
              Combustible Puro
            </div>
          </div>
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
                  block.type === 'function' ? 'bg-violet-600 text-white' :
                  block.type === 'if' ? 'bg-green-600 text-white' :
                  block.type === 'else' ? 'bg-yellow-600 text-white' :
                  block.type === 'return' ? 'bg-pink-600 text-white' :
                  block.type === 'number' ? 'bg-orange-600 text-white' :
                  block.type === 'operator' ? 'bg-indigo-600 text-white' :
                  block.type === 'variable' ? 'bg-teal-600 text-white' :
                  block.type === 'action' ? 'bg-cyan-600 text-white' :
                  block.type === 'condition' ? 'bg-rose-600 text-white' :
                  block.type === 'loop' ? 'bg-blue-600 text-white' :
                  block.type === 'closureIf' ? 'bg-amber-800 text-white hover:bg-amber-700' :
                  block.type === 'closureFunc' ? 'bg-purple-900 text-white hover:bg-purple-800' :
                  'bg-gray-600 text-white'
                } transition-colors duration-200`}
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
          <h3 className="font-bold mb-2 text-white">Función de Filtrado:</h3>
          <div className="flex-1 font-mono text-sm">
            {placedBlocks.length === 0 ? (
              <div className="text-gray-500 italic">Arrastra los bloques aquí para construir la función...</div>
            ) : (
              <div className="space-y-1">
                {placedBlocks.map(blockId => {
                  const block = codeBlocks.find(b => b.id === blockId);
                  if (!block) return null;
                  return (
                    <div 
                      key={blockId}
                      className={`p-2 rounded flex justify-between items-center ${
                        block.type === 'function' ? 'bg-violet-800 text-white' :
                        block.type === 'if' ? 'bg-green-800 text-white' :
                        block.type === 'else' ? 'bg-yellow-800 text-white' :
                        block.type === 'return' ? 'bg-pink-800 text-white' :
                        block.type === 'closureIf' ? 'bg-yellow-900 text-white' :
                        block.type === 'closureFunc' ? 'bg-violet-900 text-white' :
                        'bg-gray-700 text-white'
                      }`}
                    >
                      {renderBlockContent(block)}
                      <button 
                        className="ml-2 text-white hover:text-red-300"
                        onClick={() => removeBlock(blockId)}
                        disabled={animationInProgress}
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
          <p className="font-bold">Objetivo:</p>
          <p>Crea una función que filtre las partículas y deje pasar solo el combustible limpio. Selecciona el tipo de partícula correcto y ordena los bloques adecuadamente.</p>
        </div>
        
        {/* Feedback area */}
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : feedback ? 'bg-yellow-100' : 'bg-gray-100'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : feedback ? 'text-amber-700' : 'text-gray-500'}`}>
            {feedback || "Construye una función de filtrado que separe el combustible de las impurezas."}
          </p>
        </div>
        
        {/* Action button */}
        <button 
          className={`p-3 rounded-lg ${
            placedBlocks.length === correctOrder.length && !animationInProgress
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          } font-bold transition-colors`}
          disabled={placedBlocks.length !== correctOrder.length || animationInProgress || isCorrect}
          onClick={checkSolution}
        >
          {animationInProgress ? 'Filtrando...' : 'Ejecutar Filtro'}
        </button>
      </div>
    </div>
  );
};

export default FuelPurifier;