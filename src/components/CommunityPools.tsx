import React, { useState } from 'react';
import { ArrowLeft, Users, Shield, TrendingDown, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CommunityPoolsProps {
  onBack: () => void;
}

const CommunityPools: React.FC<CommunityPoolsProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [selectedPool, setSelectedPool] = useState<number | null>(null);

  const communityPools = [
    {
      id: 1,
      name: t('techWorkersPool'),
      category: 'Professional',
      members: 2847,
      savings: 35,
      premium: '₹8,450',
      originalPremium: '₹12,450',
      coverage: '₹15,00,000',
      description: t('techWorkersDescription'),
      benefits: [
        t('groupNegotiatedRates'),
        t('tailoredCoverage'),
        t('fastClaimProcessing'),
        t('preventiveHealthchecks')
      ],
      icon: Briefcase,
      color: 'blue'
    },
    {
      id: 2,
      name: t('gigWorkersUnion'),
      category: 'Gig Economy',
      members: 1523,
      savings: 42,
      premium: '₹3,200',
      originalPremium: '₹5,500',
      coverage: '₹5,00,000',
      description: t('gigWorkersDescription'),
      benefits: [
        t('flexiblePremiums'),
        t('incomeBasedCoverage'),
        t('occupationalProtection'),
        t('communitySupport')
      ],
      icon: Users,
      color: 'green'
    },
    {
      id: 3,
      name: t('farmersCollective'),
      category: 'Agriculture',
      members: 3156,
      savings: 38,
      premium: '₹2,800',
      originalPremium: '₹4,500',
      coverage: '₹3,00,000',
      description: t('farmersDescription'),
      benefits: [
        t('seasonalPayments'),
        t('cropInsuranceBundle'),
        t('ruralHealthcare'),
        t('weatherProtection')
      ],
      icon: Shield,
      color: 'emerald'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-600',
        button: 'bg-emerald-600 hover:bg-emerald-700'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        {t('backToDashboard')}
      </button>

      <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
        <div className="text-center mb-8">
          <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('communityPools')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('communityPoolsDescription')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">₹45,000</div>
            <div className="text-sm text-gray-600">{t('avgSavingsPerYear')}</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">7,526</div>
            <div className="text-sm text-gray-600">{t('totalMembers')}</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">38%</div>
            <div className="text-sm text-gray-600">{t('avgDiscount')}</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {communityPools.map((pool) => {
          const colorClasses = getColorClasses(pool.color);
          const isSelected = selectedPool === pool.id;
          
          return (
            <div
              key={pool.id}
              className={`bg-white rounded-2xl shadow-sm border-2 transition-all cursor-pointer ${
                isSelected ? colorClasses.border : 'border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => setSelectedPool(isSelected ? null : pool.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl ${colorClasses.bg} flex items-center justify-center`}>
                      <pool.icon className={`h-6 w-6 ${colorClasses.text}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{pool.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{pool.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {pool.members.toLocaleString()} {t('members')}
                        </span>
                        <span className="flex items-center">
                          <TrendingDown className="h-4 w-4 mr-1" />
                          {pool.savings}% {t('savings')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{pool.premium}</div>
                    <div className="text-sm text-gray-500 line-through">{pool.originalPremium}</div>
                    <div className="text-sm text-green-600 font-medium">
                      {pool.coverage} {t('coverage')}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t('poolBenefits')}</h4>
                        <ul className="space-y-2">
                          {pool.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <Shield className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t('howItWorks')}</h4>
                        <div className="space-y-3 text-sm text-gray-600">
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 mr-3 mt-0.5">1</div>
                            <span>{t('joinPool')}</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 mr-3 mt-0.5">2</div>
                            <span>{t('groupNegotiation')}</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 mr-3 mt-0.5">3</div>
                            <span>{t('enjoySavings')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <button className={`px-8 py-3 text-white rounded-lg font-semibold transition-colors ${colorClasses.button}`}>
                        {t('joinThisPool')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t('createCustomPool')}</h3>
          <p className="text-gray-600 mb-4">{t('customPoolDescription')}</p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            {t('startNewPool')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPools;