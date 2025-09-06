import React from 'react';
import { Star, Shield, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface RecommendationsCardProps {
  userProfile: {
    age: number;
    dependents: number;
    income: number;
    occupation: string;
  };
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ userProfile }) => {
  const { t } = useLanguage();

  const recommendations = [
    {
      type: 'Health',
      provider: 'Star Health',
      plan: 'Family Floater',
      premium: '₹12,450/year',
      coverage: '₹10,00,000',
      score: 95,
      features: ['Cashless Claims', 'Pre/Post Hospitalization', 'Day Care'],
      recommended: true
    },
    {
      type: 'Life',
      provider: 'LIC',
      plan: 'Term Plus',
      premium: '₹8,200/year',
      coverage: '₹50,00,000',
      score: 92,
      features: ['Pure Term Plan', 'Tax Benefits', 'Online Claims'],
      recommended: true
    },
    {
      type: 'Vehicle',
      provider: 'Bajaj Allianz',
      plan: 'Motor Package',
      premium: '₹4,800/year',
      coverage: '₹5,00,000',
      score: 88,
      features: ['Zero Depreciation', 'Roadside Assistance', 'NCB Protection'],
      recommended: false
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('aiRecommendations')}</h2>
        <div className="flex items-center text-sm text-gray-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          {t('personalizedForYou')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <div key={index} className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
            rec.recommended ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100'
          } hover:shadow-md transition-all`}>
            {rec.recommended && (
              <div className="flex items-center text-blue-600 text-sm font-medium mb-3">
                <Star className="h-4 w-4 mr-1 fill-current" />
                {t('topRecommended')}
              </div>
            )}
            
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{rec.plan}</h3>
                <p className="text-sm text-gray-600">{rec.provider}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{rec.score}</div>
                <div className="text-xs text-gray-500">{t('aiScore')}</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('premium')}</span>
                <span className="font-medium">{rec.premium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('coverage')}</span>
                <span className="font-medium">{rec.coverage}</span>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              {rec.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-600">
                  <Shield className="h-3 w-3 mr-2 text-green-500" />
                  {feature}
                </div>
              ))}
            </div>

            <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
              rec.recommended
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              {t('viewDetails')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsCard;