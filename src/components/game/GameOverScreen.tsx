import React from 'react';

const GameOverScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Fondo con efecto de polvo marciano */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-red-900/20"></div>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Astronauta caído */}
        <div className="w-48 h-48 mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 relative transform -rotate-45">
              {/* Cuerpo del astronauta */}
              <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>
              {/* Visor roto */}
              <div className="absolute inset-2 bg-red-900/30 rounded-lg">
                <div className="absolute inset-0">
                  {/* Grietas en el visor */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-white/30 transform rotate-45"
                      style={{
                        height: '2px',
                        width: `${20 + Math.random() * 30}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              {/* Tanque de oxígeno */}
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-3 h-12 bg-gray-400 rounded"></div>
            </div>
          </div>
          
          {/* Efecto de oxígeno escapando */}
          <div className="absolute top-1/2 right-1/4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/10 rounded-full animate-escape"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  left: `${Math.random() * 20}px`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Mensaje principal */}
        <h1 className="text-4xl font-bold text-red-500 mb-4 animate-pulse">
          Oxígeno Agotado
        </h1>
        
        {/* Mensaje secundario */}
        <div className="space-y-4 text-gray-400 max-w-md">
          <p className="text-lg">
            El astronauta no logró completar las reparaciones a tiempo...
          </p>
          <p>
            Las últimas reservas de oxígeno se han agotado en la superficie hostil de Marte.
          </p>
          <p className="text-sm italic">
            Presiona F5 para intentarlo de nuevo
          </p>
        </div>

        {/* Estadísticas */}
        <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-red-900">
          <div className="text-gray-500 text-sm">
            Último mensaje registrado:
            <p className="text-red-400 font-mono mt-1">
              "ERROR: SISTEMA_SOPORTE_VITAL [OFFLINE]"
            </p>
          </div>
        </div>
      </div>

      {/* Efecto de viñeta roja */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-red-900/30 pointer-events-none"></div>
    </div>
  );
};

export default GameOverScreen; 