import React from 'react';
import { Shield, Menu, Globe, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">InsureAI</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('dashboard')}
            </button>
            <button
              onClick={() => onNavigate('risk-profiler')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'risk-profiler'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('riskProfiler')}
            </button>
            <button
              onClick={() => onNavigate('comparison')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'comparison'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('compare')}
            </button>
            <button
              onClick={() => onNavigate('community')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'community'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('community')}
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="bn">বাংলা</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
            </select>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <User className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;