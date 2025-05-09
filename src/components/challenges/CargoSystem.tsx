import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Package, ArrowDown, ArrowUp } from 'lucide-react';

// Define cargo items for sorting
const initialCargo = [
  { id: 'cargo-5', weight: 5, color: '#06D6A0' },
  { id: 'cargo-1', weight: 1, color: '#118AB2' },
  { id: 'cargo-3', weight: 3, color: '#EF476F' },
  { id: 'cargo-2', weight: 2, color: '#FFD166' },
  { id: 'cargo-4', weight: 4, color: '#073B4C' },
];

const CargoSystem: React.FC = () => {
  const { completeChallenge } = useGame();
  const [cargo, setCargo] = useState([...initialCargo]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [step, setStep] = useState(0);
  const [comparing, setComparing] = useState<[number, number] | null>(null);
  const [swapping, setSwapping] = useState<[number, number] | null>(null);
  const [sortingComplete, setSortingComplete] = useState(false);
  const [message, setMessage] = useState('');
  
  // Function to simulate bubble sort algorithm
  const runSortingAnimation = () => {
    const cargoArray = [...cargo];
    const steps: { type: 'compare' | 'swap' | 'message', indices?: [number, number], message?: string }[] = [];
    
    // Generate the steps for a bubble sort
    for (let i = 0; i < cargoArray.length; i++) {
      for (let j = 0; j < cargoArray.length - i - 1; j++) {
        const shouldSwap = sortOrder === 'asc' 
          ? cargoArray[j].weight > cargoArray[j + 1].weight
          : cargoArray[j].weight < cargoArray[j + 1].weight;
          
        steps.push({ type: 'compare', indices: [j, j + 1] });
        steps.push({ type: 'message', message: `Comparando ${cargoArray[j].weight} y ${cargoArray[j + 1].weight}` });
        
        if (shouldSwap) {
          steps.push({ type: 'message', message: `${cargoArray[j].weight} ${sortOrder === 'asc' ? '>' : '<'} ${cargoArray[j + 1].weight}, realizando intercambio` });
          steps.push({ type: 'swap', indices: [j, j + 1] });
          
          // Perform the swap in our array
          [cargoArray[j], cargoArray[j + 1]] = [cargoArray[j + 1], cargoArray[j]];
        } else {
          steps.push({ type: 'message', message: `${cargoArray[j].weight} ${sortOrder === 'asc' ? '<=' : '>='} ${cargoArray[j + 1].weight}, no es necesario intercambiar` });
        }
      }
    }
    
    // Add completion step
    steps.push({ type: 'message', message: '¡Ordenamiento completado!' });
    
    // Animate the steps
    let stepCounter = 0;
    const interval = setInterval(() => {
      if (stepCounter >= steps.length) {
        clearInterval(interval);
        setSortingComplete(true);
        setComparing(null);
        setSwapping(null);
        
        // Complete the challenge after showing the animation
        setTimeout(() => {
          completeChallenge('cargo-system');
        }, 1500);
        return;
      }
      
      const currentStep = steps[stepCounter];
      
      if (currentStep.type === 'compare' && currentStep.indices) {
        setComparing(currentStep.indices);
        setSwapping(null);
      } else if (currentStep.type === 'swap' && currentStep.indices) {
        setComparing(null);
        setSwapping(currentStep.indices);
        
        // Actually perform the swap
        setCargo(prev => {
          const newCargo = [...prev];
          [newCargo[currentStep.indices![0]], newCargo[currentStep.indices![1]]] = 
            [newCargo[currentStep.indices![1]], newCargo[currentStep.indices![0]]];
          return newCargo;
        });
      } else if (currentStep.type === 'message' && currentStep.message) {
        setMessage(currentStep.message);
      }
      
      stepCounter++;
    }, 1000);
    
    return () => clearInterval(interval);
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setCargo([...initialCargo]); // Reset cargo on sort change
    setStep(0);
    setSortingComplete(false);
    setComparing(null);
    setSwapping(null);
    setMessage('');
  };
  
  const startSorting = () => {
    setMessage('Iniciando algoritmo de ordenamiento...');
    setStep(1);
    runSortingAnimation();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Cargo visualization */}
      <div className="flex flex-col items-center mb-6">
        <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md">
          <h3 className="font-bold mb-4 text-center">
            Sistema de Carga: Ordenar por Peso {sortOrder === 'asc' ? '↑' : '↓'}
          </h3>
          
          {/* Instructions */}
          <div className="text-sm text-gray-600 mb-4 text-center">
            {step === 0 && "Ordena las cajas de la más ligera a la más pesada (o viceversa)"}
            {step > 0 && message}
          </div>
          
          {/* Cargo items */}
          <div className="flex justify-center items-end h-52 border-b-2 border-gray-300 mb-2 relative">
            {cargo.map((item, index) => {
              const isComparing = comparing && (index === comparing[0] || index === comparing[1]);
              const isSwapping = swapping && (index === swapping[0] || index === swapping[1]);
              
              return (
                <div 
                  key={item.id}
                  className={`mx-1 flex flex-col items-center transition-all duration-500 ${
                    isComparing ? 'transform scale-110' : ''
                  } ${
                    isSwapping ? 'animate-bounce' : ''
                  }`}
                  style={{
                    zIndex: isComparing || isSwapping ? 10 : 1
                  }}
                >
                  <div 
                    className={`w-16 h-${8 + item.weight * 6} rounded-t-lg flex items-center justify-center shadow-md`}
                    style={{ 
                      backgroundColor: item.color,
                      height: `${50 + item.weight * 20}px`,
                    }}
                  >
                    <span className="text-white font-bold">{item.weight}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Caja {item.weight}</div>
                </div>
              );
            })}
            
            {/* Conveyor belt */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-400"></div>
          </div>
        </div>
      </div>
      
      {/* Controls and explanation */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Sort direction control */}
        <div className="flex justify-center space-x-4 p-4 bg-gray-100 rounded-lg">
          <button 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              sortOrder === 'asc' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => toggleSortOrder()}
            disabled={step > 0}
          >
            <ArrowUp className="w-5 h-5" />
            <span>Ascendente</span>
          </button>
          
          <button 
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              sortOrder === 'desc' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => toggleSortOrder()}
            disabled={step > 0}
          >
            <ArrowDown className="w-5 h-5" />
            <span>Descendente</span>
          </button>
        </div>
        
        {/* Explanation area */}
        <div className="p-4 bg-blue-100 rounded-lg">
          <h4 className="font-bold text-blue-800 mb-2">Algoritmo de Ordenamiento: Bubble Sort</h4>
          <p className="text-sm text-blue-800">
            Este algoritmo compara elementos adyacentes y los intercambia si están en el orden incorrecto. El proceso se repite hasta que no se necesitan más intercambios.
          </p>
          <ul className="list-disc list-inside text-sm text-blue-800 mt-2">
            <li>Recorre la lista varias veces</li>
            <li>Compara elementos adyacentes</li>
            <li>Intercambia elementos si están en el orden incorrecto</li>
            <li>Repite hasta que la lista esté ordenada</li>
          </ul>
        </div>
        
        {/* Action button */}
        <button 
          className={`mt-auto p-4 rounded-lg font-bold ${
            step === 0
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : sortingComplete 
                ? 'bg-green-600 text-white'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          onClick={startSorting}
          disabled={step > 0}
        >
          {step === 0 ? 'Iniciar Ordenamiento' : 
           sortingComplete ? '¡Ordenamiento Completado!' : 
           'Ordenando...'}
        </button>
      </div>
    </div>
  );
};

export default CargoSystem;