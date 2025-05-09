import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../contexts/GameContext';

const DEEPSEEK_API_KEY = 'sk-835c51cc2e964c73bbc8a7d01ef4ffbf';

const MISSION_INTRO = [
  "¡Bienvenido a la misión espacial! Soy tu asistente robótico y te ayudaré a completar todas las tareas necesarias para regresar a casa.",
  "La nave ha sufrido daños críticos y necesitamos reparar varios sistemas. El oxígeno se está agotando, así que debemos actuar rápido.",
  "Las tareas deben completarse en orden: primero las ventanas, luego los paneles solares, el sistema de combustible, la carga y finalmente la navegación.",
  "Acércate a cada estación y presiona 'E' para interactuar. ¡Estoy aquí para ayudarte si necesitas más información!"
];

const RobotAssistant: React.FC = () => {
  const { state, showAssistant, hideAssistant } = useGame();
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: MISSION_INTRO[0], isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const introIndex = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show mission intro messages
  useEffect(() => {
    if (state.gameStarted && introIndex.current < MISSION_INTRO.length - 1) {
      const timer = setTimeout(() => {
        introIndex.current += 1;
        setMessages(prev => [...prev, { text: MISSION_INTRO[introIndex.current], isUser: false }]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.gameStarted, messages]);

  // Respond to challenge completion
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, { text: state.notification.message, isUser: false }]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsTyping(true);

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'Eres un asistente robótico en una misión espacial en Marte. Debes ser conciso, útil y mantener un tono amigable pero profesional. Tu objetivo es ayudar al astronauta a completar sus tareas y sobrevivir en Marte.'
            },
            {
              role: 'user',
              content: userMessage
            }
          ]
        })
      });

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;
      
      setTimeout(() => {
        setMessages(prev => [...prev, { text: assistantMessage, isUser: false }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: "Lo siento, hubo un error al procesar tu mensaje.", isUser: false }]);
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full bg-gray-900/90 backdrop-blur-sm border border-blue-500/30 flex flex-col">
      {/* Chat Header */}
      <div className="bg-blue-900/50 p-3 flex items-center gap-3 border-b border-blue-500/30">
        <div className="relative">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-float">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">Nexus-7</h3>
          <p className="text-blue-300 text-xs">En línea</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-2 text-sm ${
                message.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-lg p-2 text-gray-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-blue-500/30">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white rounded-lg px-3 py-1 hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RobotAssistant;