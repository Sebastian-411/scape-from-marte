import React, { useState, useRef } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Shield } from 'lucide-react';

// Define the code blocks available for this challenge
const initialCodeBlocks = [
  { id: 'block1', type: 'if', content: 'if (sensor.detectaMaterial() === "vidrio") {', isPlaced: false },
  { id: 'block2', type: 'action', content: '  robot.repararVentana();', isPlaced: false },
  { id: 'block3', type: 'else', content: '} else {', isPlaced: false },
  { id: 'block4', type: 'action', content: '  robot.buscarMaterialCorrecto();', isPlaced: false },
  { id: 'block5', type: 'action', content: '}', isPlaced: false },
];

// The correct order of blocks
const correctOrder = ['block1', 'block2', 'block3', 'block4', 'block5'];

const WindowRepair: React.FC = () => {
  const { completeChallenge } = useGame();
  const [codeBlocks, setCodeBlocks] = useState(initialCodeBlocks);
  const [placedBlocks, setPlacedBlocks] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('blockId', id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
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

  const checkSolution = () => {
    const isSequenceCorrect = JSON.stringify(placedBlocks) === JSON.stringify(correctOrder);
    
    if (isSequenceCorrect) {
      setFeedback('¡Correcto! Has reparado la ventana.');
      setIsCorrect(true);
      setShowSuccess(true);
      
      // Mark challenge as completed after animation
      setTimeout(() => {
        completeChallenge('window-repair');
      }, 2000);
    } else {
      setFeedback('Hmm, parece que el código no funciona correctamente. Intenta de nuevo.');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Window visual */}
      <div className="flex justify-center mb-4">
        <div className={`w-48 h-48 border-8 border-gray-700 rounded-lg relative ${showSuccess ? 'bg-blue-200' : 'bg-red-200'} transition-colors duration-1000`}>
          {/* Crack in the window */}
          {!showSuccess && (
            <div className="absolute inset-0">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <path d="M50,0 L45,50 L60,30 L40,70 L55,100" 
                        stroke="black" 
                        strokeWidth="3" 
                        fill="none" />
                  <path d="M45,50 L20,45 M45,50 L10,60" 
                        stroke="black" 
                        strokeWidth="2" 
                        fill="none" />
                  <path d="M45,50 L70,30 M45,50 L80,45" 
                        stroke="black" 
                        strokeWidth="2" 
                        fill="none" />
                </svg>
              </div>
            </div>
          )}

          {/* Robot */}
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            showSuccess ? 'translate-y-0' : 'translate-y-20'
          }`}>
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Air leak animation */}
          {!showSuccess && (
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-3 h-3 bg-white rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    top: `${Math.sin(i) * 10}px`,
                    left: `${Math.cos(i) * 10}px`,
                    opacity: 0.8 - (i * 0.1)
                  }}
                ></div>
              ))}
            </div>
          )}
          
          {/* Success overlay */}
          {showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-20 h-20 text-green-600 animate-pulse" />
            </div>
          )}
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
                className={`p-2 bg-blue-500 text-white rounded cursor-move ${
                  block.type === 'if' ? 'bg-green-600' : 
                  block.type === 'else' ? 'bg-yellow-600' : 
                  'bg-blue-600'
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, block.id)}
                onDragEnd={handleDragEnd}
              >
                <code>{block.content}</code>
              </div>
            ))}
          </div>
        </div>
        
        {/* Drop area */}
        <div 
          ref={dropAreaRef}
          className={`flex-1 p-4 bg-gray-800 rounded-lg shadow flex flex-col ${
            isDragging ? 'border-2 border-yellow-400' : 'border-2 border-transparent'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h3 className="font-bold mb-2 text-white">Código del Robot:</h3>
          <div className="flex-1 font-mono text-sm">
            {placedBlocks.length === 0 ? (
              <div className="text-gray-500 italic">Arrastra los bloques aquí para construir el código...</div>
            ) : (
              <div className="space-y-1">
                {placedBlocks.map(blockId => {
                  const block = codeBlocks.find(b => b.id === blockId);
                  if (!block) return null;
                  return (
                    <div 
                      key={blockId}
                      className={`p-2 rounded flex justify-between items-center ${
                        block.type === 'if' ? 'bg-green-800 text-white' : 
                        block.type === 'else' ? 'bg-yellow-800 text-white' : 
                        'bg-blue-800 text-white'
                      }`}
                    >
                      <code>{block.content}</code>
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
        
        {/* Feedback area */}
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : feedback ? 'bg-red-100' : 'bg-gray-100'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : feedback ? 'text-red-700' : 'text-gray-500'}`}>
            {feedback || "Ordena los bloques correctamente y haz que el robot repare la ventana."}
          </p>
        </div>
        
        {/* Action button */}
        <button 
          className={`p-3 rounded-lg ${
            placedBlocks.length === correctOrder.length
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          } font-bold transition-colors`}
          disabled={placedBlocks.length !== correctOrder.length}
          onClick={checkSolution}
        >
          Ejecutar Código
        </button>
      </div>
    </div>
  );
};

export default WindowRepair;