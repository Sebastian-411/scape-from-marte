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
    'El material correcto para reparar la ventana es el vidrio.',
    'La secuencia correcta es: verificar material → reparar → cerrar if → else → buscar material → cerrar else'
  ],
  'solar-panels': [
    'Los bucles "for" nos permiten repetir una acción varias veces sin escribir el mismo código.',
    'Cada iteración del bucle puede limpiar un panel diferente.',
    'Recuerda que un bucle tiene un inicio, una condición y un incremento.',
    'Para limpiar 5 paneles, necesitas un bucle que se repita exactamente 5 veces.',
    'La secuencia correcta es: iniciar bucle → limpiar panel → incrementar contador → cerrar bucle'
  ],
  'fuel-purifier': [
    'Las funciones nos permiten organizar código que realiza una tarea específica.',
    'Para filtrar, necesitas una función que evalúe cada partícula y decida si pasa o no.',
    'Usa condicionales dentro de tu función para verificar si una partícula cumple con los requisitos.',
    'El "return" de la función debe indicar si la partícula pasa el filtro o no.',
    'Solo las partículas de tipo "fuel" deben pasar el filtro.',
    'La secuencia correcta es: función → if → return true → else → return false → cerrar función'
  ],
  'cargo-system': [
    'Ordenar elementos significa colocarlos en una secuencia específica (por ejemplo, de menor a mayor).',
    'Un algoritmo de ordenamiento compara elementos y los reordena según sea necesario.',
    'Compara cada caja con las demás para decidir su posición correcta.',
    'Puedes usar un bucle para revisar cada caja y otro bucle anidado para compararla con las demás.',
    'La secuencia correcta es: bucle exterior → bucle interior → comparar → intercambiar → cerrar bucles'
  ],
  'navigation': [
    'Para elegir una ruta, necesitas evaluar varias condiciones del entorno.',
    'Usa condicionales "if" para verificar cada condición (temperatura, clima, etc.).',
    'Las condiciones pueden combinarse con operadores lógicos como "Y" (&&) y "O" (||).',
    'Selecciona la ruta óptima basada en todas las condiciones ambientales.',
    'La secuencia correcta es: if temperatura → ruta A → else if viento → ruta C → else → ruta B'
  ],
  'oxygen-system': [
    'El sistema de oxígeno requiere una secuencia específica de activación.',
    'Primero debes inicializar el sistema, luego verificar la presión.',
    'Los filtros deben activarse en orden: primario, secundario y terciario.',
    'Después de activar los filtros, monitorea los niveles y optimiza el rendimiento.',
    'La secuencia correcta es: inicializar → verificar → filtro1 → filtro2 → filtro3 → monitorear → optimizar'
  ],
  'life-support': [
    'El sistema de soporte vital mantiene condiciones habitables en la nave.',
    'Debes mantener el oxígeno, energía, temperatura y presión en niveles óptimos.',
    'Los niveles óptimos son: oxígeno 75%, energía 60%, temperatura 22°C, presión 1.0 atm.',
    'Ajusta gradualmente los sistemas para evitar cambios bruscos.',
    'Los sistemas fluctúan naturalmente, así que monitorea constantemente.'
  ],
  'communications': [
    'El sistema de comunicaciones requiere conectar cables según sus funciones.',
    'Cada cable tiene una función que produce un resultado específico.',
    'Debes conectar cables que tengan el mismo resultado numérico.',
    'Analiza el código de cada función para entender su resultado.',
    'Las funciones pueden ser sumas, multiplicaciones, potencias, factoriales o secuencias Fibonacci.'
  ]
};

// Información adicional sobre los retos
export const CHALLENGE_DETAILS: Record<string, {
  objective: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  hints: string[];
  commonMistakes: string[];
}> = {
  'window-repair': {
    objective: 'Reparar una ventana dañada usando el material correcto y siguiendo la secuencia adecuada.',
    difficulty: 'easy',
    timeLimit: 300,
    hints: [
      'El vidrio es el único material que puede reparar la ventana.',
      'El robot debe verificar el material antes de intentar reparar.',
      'Si el material es incorrecto, el robot debe buscar el material correcto.'
    ],
    commonMistakes: [
      'No verificar el material antes de reparar.',
      'Usar un material incorrecto.',
      'Colocar los bloques en orden incorrecto.'
    ]
  },
  'solar-panels': {
    objective: 'Limpiar 5 paneles solares usando un bucle para automatizar el proceso.',
    difficulty: 'medium',
    timeLimit: 240,
    hints: [
      'Usa un contador que vaya de 0 a 4 para los 5 paneles.',
      'Cada iteración del bucle limpia un panel diferente.',
      'El bucle debe incrementar el contador después de limpiar cada panel.'
    ],
    commonMistakes: [
      'No inicializar correctamente el contador.',
      'Usar una condición incorrecta en el bucle.',
      'Olvidar incrementar el contador.'
    ]
  },
  'fuel-purifier': {
    objective: 'Crear una función que filtre partículas, permitiendo solo el paso del combustible.',
    difficulty: 'medium',
    timeLimit: 300,
    hints: [
      'La función debe verificar el tipo de cada partícula.',
      'Solo las partículas de tipo "fuel" deben pasar.',
      'Usa un condicional para tomar la decisión de filtrar.'
    ],
    commonMistakes: [
      'No verificar el tipo de partícula.',
      'Dejar pasar partículas incorrectas.',
      'Estructura incorrecta de la función.'
    ]
  },
  'cargo-system': {
    objective: 'Implementar un algoritmo de ordenamiento para organizar las cajas de carga.',
    difficulty: 'hard',
    timeLimit: 360,
    hints: [
      'Usa dos bucles anidados para comparar cada caja con las demás.',
      'Intercambia las cajas cuando encuentres un orden incorrecto.',
      'Continúa hasta que todas las cajas estén en orden.'
    ],
    commonMistakes: [
      'No comparar todas las cajas entre sí.',
      'Intercambiar cajas incorrectamente.',
      'No verificar el orden final.'
    ]
  },
  'navigation': {
    objective: 'Programar el sistema de navegación para elegir la ruta óptima según las condiciones ambientales.',
    difficulty: 'hard',
    timeLimit: 300,
    hints: [
      'Evalúa la temperatura y el viento para elegir la ruta.',
      'Usa condiciones anidadas para casos específicos.',
      'Considera todas las combinaciones posibles de condiciones.'
    ],
    commonMistakes: [
      'No considerar todas las condiciones.',
      'Orden incorrecto de las condiciones.',
      'Rutas incorrectas para cada condición.'
    ]
  },
  'oxygen-system': {
    objective: 'Activar y optimizar el sistema de oxígeno siguiendo una secuencia específica.',
    difficulty: 'medium',
    timeLimit: 240,
    hints: [
      'Sigue el orden: inicialización → verificación → filtros → monitoreo → optimización.',
      'Cada filtro tiene parámetros específicos de temperatura y presión.',
      'Monitorea los niveles después de activar cada filtro.'
    ],
    commonMistakes: [
      'Activar filtros en orden incorrecto.',
      'No verificar la presión inicial.',
      'Saltarse el paso de monitoreo.'
    ]
  },
  'life-support': {
    objective: 'Mantener todos los sistemas de soporte vital en niveles óptimos.',
    difficulty: 'hard',
    timeLimit: 300,
    hints: [
      'Mantén el oxígeno en 75%, energía en 60%, temperatura en 22°C y presión en 1.0 atm.',
      'Ajusta los sistemas gradualmente para evitar cambios bruscos.',
      'Monitorea constantemente los niveles de cada sistema.'
    ],
    commonMistakes: [
      'Ajustar los sistemas demasiado rápido.',
      'Ignorar las fluctuaciones naturales.',
      'No mantener todos los sistemas en equilibrio.'
    ]
  },
  'communications': {
    objective: 'Restaurar las comunicaciones conectando cables según sus funciones.',
    difficulty: 'hard',
    timeLimit: 360,
    hints: [
      'Analiza el código de cada función para entender su resultado.',
      'Conecta cables que produzcan el mismo resultado numérico.',
      'Considera diferentes tipos de operaciones (suma, multiplicación, etc.).'
    ],
    commonMistakes: [
      'No analizar correctamente el código de las funciones.',
      'Conectar cables con resultados diferentes.',
      'Ignorar el tipo de operación en cada función.'
    ]
  }
};