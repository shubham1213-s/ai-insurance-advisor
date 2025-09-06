import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Mic, X, Bot, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Chatbot: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: t('chatbotWelcome'),
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('health insurance') || message.includes('health')) {
      return t('healthInsuranceResponse');
    } else if (message.includes('life insurance') || message.includes('life')) {
      return t('lifeInsuranceResponse');
    } else if (message.includes('vehicle') || message.includes('car') || message.includes('auto')) {
      return t('vehicleInsuranceResponse');
    } else if (message.includes('home') || message.includes('property')) {
      return t('homeInsuranceResponse');
    } else if (message.includes('claim')) {
      return t('claimResponse');
    } else if (message.includes('premium')) {
      return t('premiumResponse');
    } else if (message.includes('community') || message.includes('pool')) {
      return t('communityPoolResponse');
    } else {
      return t('defaultBotResponse');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, you would implement speech recognition here
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputValue(t('voiceMessageExample'));
      }, 2000);
    }
  };

  const quickReplies = [
    t('compareHealthPlans'),
    t('claimProcess'),
    t('premiumCalculator'),
    t('communityPools')
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-2xl shadow-2xl border z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">{t('insuranceAssistant')}</div>
            <div className="text-xs opacity-90">{t('onlineNow')}</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                message.type === 'user' ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {message.type === 'user' ? (
                  <User className="h-3 w-3 text-white" />
                ) : (
                  <Bot className="h-3 w-3 text-gray-600" />
                )}
              </div>
              <div className={`px-3 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }`}>
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 text-center">{t('quickReplies')}</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(reply)}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              placeholder={t('typeMessage')}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={toggleRecording}
              className={`absolute right-2 top-2 p-1 rounded-full transition-colors ${
                isRecording
                  ? 'text-red-500 bg-red-50'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;