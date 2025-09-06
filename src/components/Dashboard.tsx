import React, { useState } from 'react';
import { Shield, Heart, Car, Home, Users, TrendingUp, Award, Bell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RecommendationsCard from './RecommendationsCard';
import WhatsAppNotifications from './WhatsAppNotifications';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [userProfile] = useState({
    age: 28,
    dependents: 2,
    income: 45000,
    occupation: 'Software Developer'
  });

  const insuranceTypes = [
    { icon: Heart, title: t('healthInsurance'), color: 'text-red-500', bgColor: 'bg-red-50' },
    { icon: Shield, title: t('lifeInsurance'), color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { icon: Car, title: t('vehicleInsurance'), color: 'text-green-500', bgColor: 'bg-green-50' },
    { icon: Home, title: t('homeInsurance'), color: 'text-purple-500', bgColor: 'bg-purple-50' }
  ];

  const specialPrograms = [
    { icon: Users, title: t('gigWorkers'), description: t('affordableCoverage') },
    { icon: TrendingUp, title: t('farmers'), description: t('customPlans') },
    { icon: Award, title: t('dailyWagers'), description: t('flexiblePayments') }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('welcomeMessage')}
          </h1>
          <p className="text-xl mb-6 text-blue-100">
            {t('aiPoweredRecommendations')}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('risk-profiler')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('assessRisk')}
            </button>
            <button
              onClick={() => onNavigate('comparison')}
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              {t('comparePlans')}
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{userProfile.age}</div>
          <div className="text-sm text-gray-600">{t('age')}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{userProfile.dependents}</div>
          <div className="text-sm text-gray-600">{t('dependents')}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">₹{userProfile.income.toLocaleString()}</div>
          <div className="text-sm text-gray-600">{t('monthlyIncome')}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-sm font-medium text-gray-900">{userProfile.occupation}</div>
          <div className="text-sm text-gray-600">{t('occupation')}</div>
        </div>
      </div>

      {/* Insurance Types */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('insuranceTypes')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insuranceTypes.map((type, index) => (
            <div 
              key={index} 
              onClick={() => onNavigate('insurance-search')}
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all cursor-pointer hover:scale-105 hover:border-blue-200"
            >
              <div className={`w-12 h-12 rounded-lg ${type.bgColor} flex items-center justify-center mb-4`}>
                <type.icon className={`h-6 w-6 ${type.color}`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-sm text-gray-600">{t('personalizedPlans')}</p>
              <div className="mt-3 text-blue-600 text-sm font-medium">
                {t('searchPlans')} →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <RecommendationsCard userProfile={userProfile} />

      {/* Special Programs */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('specialPrograms')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialPrograms.map((program, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <program.icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{program.title}</h3>
              <p className="text-sm text-gray-600">{program.description}</p>
              <button className="mt-4 text-green-600 text-sm font-medium hover:text-green-700">
                {t('learnMore')} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Community Pools Preview */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('communityPools')}</h3>
            <p className="text-gray-600 mb-4">{t('groupDiscounts')}</p>
            <button
              onClick={() => onNavigate('community')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {t('joinPool')}
            </button>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-600">30%</div>
            <div className="text-sm text-gray-600">{t('avgSavings')}</div>
          </div>
        </div>
      </div>

      {/* WhatsApp Integration */}
      <WhatsAppNotifications />
    </div>
  );
};

export default Dashboard;