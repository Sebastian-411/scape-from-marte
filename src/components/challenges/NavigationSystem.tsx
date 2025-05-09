import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Compass, Thermometer, Cloud, Wind } from 'lucide-react';

// Define route options
const routes = [
  { id: 'A', name: 'Ruta Polar', temp: -50, weather: 'clear', wind: 5 },
  { id: 'B', name: 'Ruta Ecuatorial', temp: 30, weather: 'storm', wind: 15 },
  { id: 'C', name: 'Ruta Orbital', temp: -10, weather: 'clear', wind: 25 },
];

// Define code blocks for the navigation logic
const initialCodeBlocks = [
  { id: 'block1', type: 'if', content: 'if (temperatura < -20 && clima === "clear") {', isPlaced: false },
  { id: 'block2', type: 'action', content: '  elegirRuta("A");  // Ruta Polar', isPlaced: false },
  { id: 'block3', type: 'else-if', content: '} else if (viento > 20) {', isPlaced: false },
  { id: 'block4', type: 'action', content: '  elegirRuta("C");  // Ruta Orbital', isPlaced: false },
  { id: 'block5', type: 'else', content: '} else {', isPlaced: false },
  { id: 'block6', type: 'action', content: '  elegirRuta("B");  // Ruta Ecuatorial', isPlaced: false },
  { id: 'block7', type: 'closure', content: '}', isPlaced: false },
];

// Correct order of blocks for the solution
const correctOrder = ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'];

const NavigationSystem: React.FC = () => {
  const { completeChallenge } = useGame();
  const [codeBlocks, setCodeBlocks] = useState(initialCodeBlocks);
  const [placedBlocks, setPlacedBlocks] = useState<string[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

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
    setCodeBlocks(codeBlocks.map(block => 
      block.id === id ? { ...block, isPlaced: false } : block
    ));
    setPlacedBlocks(placedBlocks.filter(blockId => blockId !== id));
  };

  const simulateNavigation = () => {
    setIsAnimating(true);
    setSelectedRoute('A'); // Start with Route A

    // Simulate checking each route
    const routeSequence = ['A', 'B', 'C'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < routeSequence.length) {
        setSelectedRoute(routeSequence[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
        setIsCorrect(true);
        setFeedback('¡Excelente! Has programado la ruta de navegación correctamente.');
        
        // Complete the challenge
        setTimeout(() => {
          completeChallenge('navigation');
        }, 1500);
      }
    }, 1000);
  };

  const checkSolution = () => {
    const isSequenceCorrect = JSON.stringify(placedBlocks) === JSON.stringify(correctOrder);
    
    if (isSequenceCorrect) {
      setFeedback('Ejecutando sistema de navegación...');
      simulateNavigation();
    } else {
      setFeedback('La lógica de navegación no es correcta. Revisa las condiciones.');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Navigation visualization */}
      <div className="flex justify-center mb-6">
        <div className="relative w-[500px] h-[300px] bg-slate-900 rounded-lg overflow-hidden">
          {/* Stars background */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Earth */}
          <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-green-500">
            <div className="absolute inset-0 rounded-full bg-white opacity-30 mix-blend-overlay" />
          </div>

          {/* Mars */}
          <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800">
            <div className="absolute inset-0 rounded-full bg-white opacity-20 mix-blend-overlay" />
          </div>

          {/* Navigation Routes */}
          {routes.map((route) => (
            <div
              key={route.id}
              className={`absolute h-1 transition-all duration-500 ${
                selectedRoute === route.id
                  ? 'bg-yellow-400 animate-pulse'
                  : 'bg-gray-600'
              }`}
              style={{
                left: '25%',
                top: route.id === 'A' ? '20%' : route.id === 'B' ? '50%' : '80%',
                width: '50%',
                transform: route.id === 'A' 
                  ? 'rotate(-20deg)' 
                  : route.id === 'B' 
                    ? 'rotate(0deg)' 
                    : 'rotate(20deg)',
              }}
            />
          ))}

          {/* Route Labels */}
          {routes.map((route) => (
            <div
              key={route.id}
              className={`absolute left-16 px-3 py-1 rounded-lg transition-all duration-300 ${
                selectedRoute === route.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-800 text-gray-400'
              }`}
              style={{
                top: route.id === 'A' ? '15%' : route.id === 'B' ? '45%' : '75%',
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="font-bold">{route.name}</span>
                <div className="flex items-center space-x-1 text-xs">
                  <Thermometer className="w-4 h-4" />
                  <span>{route.temp}°C</span>
                  <Cloud className="w-4 h-4 ml-2" />
                  <span>{route.weather}</span>
                  <Wind className="w-4 h-4 ml-2" />
                  <span>{route.wind}km/s</span>
                </div>
              </div>
            </div>
          ))}

          {/* Spacecraft */}
          <div 
            className={`absolute left-20 w-8 h-8 transition-all duration-1000 transform ${
              isAnimating ? 'animate-pulse' : ''
            }`}
            style={{
              top: selectedRoute === 'A' 
                ? '20%' 
                : selectedRoute === 'B' 
                  ? '50%' 
                  : selectedRoute === 'C' 
                    ? '80%' 
                    : '50%',
            }}
          >
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Compass className="w-5 h-5 text-blue-600" />
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
                  block.type === 'if' ? 'bg-green-600 text-white' :
                  block.type === 'else-if' ? 'bg-yellow-600 text-white' :
                  block.type === 'else' ? 'bg-orange-600 text-white' :
                  block.type === 'action' ? 'bg-blue-600 text-white' :
                  'bg-gray-600 text-white'
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, block.id)}
              >
                <code>{block.content}</code>
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
          <h3 className="font-bold mb-2 text-white">Sistema de Navegación:</h3>
          <div className="flex-1 font-mono text-sm">
            {placedBlocks.length === 0 ? (
              <div className="text-gray-500 italic">Arrastra los bloques aquí para construir la lógica de navegación...</div>
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
                        block.type === 'else-if' ? 'bg-yellow-800 text-white' :
                        block.type === 'else' ? 'bg-orange-800 text-white' :
                        block.type === 'action' ? 'bg-blue-800 text-white' :
                        'bg-gray-700 text-white'
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

        {/* Explanation area */}
        <div className="p-3 bg-blue-100 rounded text-blue-800 text-sm">
          <p className="font-bold mb-1">Condiciones de navegación:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Temperatura &lt; -20°C y clima despejado → Ruta Polar (A)</li>
            <li>Viento &gt; 20 km/s → Ruta Orbital (C)</li>
            <li>En otros casos → Ruta Ecuatorial (B)</li>
          </ul>
        </div>

        {/* Feedback area */}
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : feedback ? 'bg-yellow-100' : 'bg-gray-100'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : feedback ? 'text-amber-700' : 'text-gray-500'}`}>
            {feedback || "Construye la lógica de navegación usando las condiciones ambientales."}
          </p>
        </div>

        {/* Action button */}
        <button 
          className={`p-3 rounded-lg ${
            placedBlocks.length === correctOrder.length && !isAnimating
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          } font-bold transition-colors`}
          disabled={placedBlocks.length !== correctOrder.length || isAnimating || isCorrect}
          onClick={checkSolution}
        >
          {isAnimating ? 'Calculando ruta...' : 'Iniciar Navegación'}
        </button>
      </div>
    </div>
  );
};

export default NavigationSystem;