import { Challenge } from '../types';
import { Shield, Zap, Droplets, Package, Compass } from 'lucide-react';

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'window-repair',
    title: 'Reparar Ventanas',
    description: 'Repara las ventanas dañadas de la nave',
    position: { x: 436, y: 150 },
    completed: false,
    isAvailable: true,
    icon: 'Shield'
  },
  {
    id: 'solar-panels',
    title: 'Paneles Solares',
    description: 'Restaura los paneles solares para obtener energía',
    position: { x: 1050, y: 150 },
    completed: false,
    isAvailable: false,
    icon: 'Zap'
  },
  {
    id: 'fuel-purifier',
    title: 'Sistema de Combustible',
    description: 'Purifica el sistema de combustible',
    position: { x: 200, y: 600 },
    completed: false,
    isAvailable: false,
    icon: 'Droplets'
  },
  {
    id: 'cargo-system',
    title: 'Sistema de Carga',
    description: 'Reorganiza la carga de la nave',
    position: { x: 1050, y: 600 },
    completed: false,
    isAvailable: false,
    icon: 'Package'
  },
  {
    id: 'navigation',
    title: 'Navegación',
    description: 'Calibra el sistema de navegación',
    position: { x: 625, y: 375 },
    completed: false,
    isAvailable: false,
    icon: 'Compass'
  },
  {
    id: 'oxygen-system',
    title: 'Sistema de Oxígeno',
    description: 'Repara el sistema de oxígeno',
    position: { x: 625, y: 150 },
    completed: false,
    isAvailable: false,
    icon: 'Droplets'
  },
  {
    id: 'communications',
    title: 'Comunicaciones',
    description: 'Restaura la antena de comunicaciones',
    position: { x: 300, y: 375 },
    completed: false,
    isAvailable: false,
    icon: 'Zap'
  },
  {
    id: 'life-support',
    title: 'Soporte Vital',
    description: 'Asegura el soporte vital de la nave',
    position: { x: 950, y: 375 },
    completed: false,
    isAvailable: false,
    icon: 'Shield'
  },
];

export const CHALLENGE_HELP_MESSAGES: Record<string, string[]> = {
  'window-repair': [
    'Recuerda que los condicionales "if" nos permiten tomar decisiones basadas en condiciones.',
    'Un "if" ejecuta código solo cuando su condición es verdadera.',
    'El "else" se ejecuta cuando la condición del "if" no se cumple.',
    'Intenta ordenar los bloques para que el robot verifique si el material es correcto antes de reparar.',
  ],
  'solar-panels': [
    'Los bucles "for" nos permiten repetir una acción varias veces sin escribir el mismo código.',
    'Cada iteración del bucle puede limpiar un panel diferente.',
    'Recuerda que un bucle tiene un inicio, una condición y un incremento.',
    'Para limpiar 5 paneles, necesitas un bucle que se repita exactamente 5 veces.',
  ],
  'fuel-purifier': [
    'Las funciones nos permiten organizar código que realiza una tarea específica.',
    'Para filtrar, necesitas una función que evalúe cada partícula y decida si pasa o no.',
    'Usa condicionales dentro de tu función para verificar si una partícula cumple con los requisitos.',
    'El "return" de la función debe indicar si la partícula pasa el filtro o no.',
  ],
  'cargo-system': [
    'Ordenar elementos significa colocarlos en una secuencia específica (por ejemplo, de menor a mayor).',
    'Un algoritmo de ordenamiento compara elementos y los reordena según sea necesario.',
    'Compara cada caja con las demás para decidir su posición correcta.',
    'Puedes usar un bucle para revisar cada caja y otro bucle anidado para compararla con las demás.',
  ],
  'navigation': [
    'Para elegir una ruta, necesitas evaluar varias condiciones del entorno.',
    'Usa condicionales "if" para verificar cada condición (temperatura, clima, etc.).',
    'Las condiciones pueden combinarse con operadores lógicos como "Y" (&&) y "O" (||).',
    'Selecciona la ruta óptima basada en todas las condiciones ambientales.',
  ],
};