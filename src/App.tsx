import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RiskProfiler from './components/RiskProfiler';
import PolicyComparison from './components/PolicyComparison';
import Chatbot from './components/Chatbot';
import CommunityPools from './components/CommunityPools';
import InsuranceSearch from './components/InsuranceSearch';
import LanguageProvider from './context/LanguageContext';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'risk-profiler':
        return <RiskProfiler onBack={() => setCurrentView('dashboard')} />;
      case 'comparison':
        return <PolicyComparison onBack={() => setCurrentView('dashboard')} />;
      case 'community':
        return <CommunityPools onBack={() => setCurrentView('dashboard')} />;
      case 'insurance-search':
        return <InsuranceSearch onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header currentView={currentView} onNavigate={setCurrentView} />
        <main className="pt-16">
          {renderView()}
          <Chatbot />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;