import React from 'react';

const MissionCompleteScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Fondo estrellado */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      {/* Nave y astronauta */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Nave espacial */}
        <div className="w-48 h-48 flex items-center justify-center animate-float">
          {/* Puedes reemplazar esto por una imagen SVG o PNG de una nave si tienes una */}
          <svg viewBox="0 0 128 128" className="w-full h-full">
            <ellipse cx="64" cy="100" rx="40" ry="10" fill="#222" opacity="0.3" />
            <rect x="44" y="40" width="40" height="40" rx="20" fill="#bbb" />
            <ellipse cx="64" cy="60" rx="18" ry="10" fill="#6cf" />
            <rect x="58" y="80" width="12" height="20" rx="6" fill="#888" />
            {/* Astronauta */}
            <circle cx="64" cy="60" r="8" fill="#fff" stroke="#ccc" strokeWidth="2" />
            <circle cx="62" cy="58" r="1.5" fill="#333" />
            <circle cx="66" cy="58" r="1.5" fill="#333" />
            <path d="M62 63 Q64 65 66 63" stroke="#333" strokeWidth="1" fill="none" />
          </svg>
        </div>
        {/* Texto de misión cumplida */}
        <h1 className="text-4xl font-bold text-white mt-8 mb-2 animate-fade-in">¡Misión cumplida!</h1>
        <p className="text-lg text-blue-200 animate-fade-in">El astronauta regresa a la Tierra sano y salvo 🚀🌍</p>
      </div>
    </div>
  );
};

export default MissionCompleteScreen; 