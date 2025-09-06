import React, { useState } from 'react';
import { ArrowLeft, Activity, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RiskChart from './RiskChart';
import RiskGauge from './RiskGauge';

interface RiskProfilerProps {
  onBack: () => void;
}

const RiskProfiler: React.FC<RiskProfilerProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'age',
      question: t('whatIsYourAge'),
      type: 'select',
      options: ['18-25', '26-35', '36-45', '46-55', '55+']
    },
    {
      id: 'lifestyle',
      question: t('describeLifestyle'),
      type: 'select',
      options: [t('sedentary'), t('moderatelyActive'), t('veryActive')]
    },
    {
      id: 'smoking',
      question: t('smokingHabit'),
      type: 'select',
      options: [t('never'), t('occasionally'), t('regularly')]
    },
    {
      id: 'medical',
      question: t('medicalHistory'),
      type: 'multiple',
      options: [t('diabetes'), t('heartDisease'), t('hypertension'), t('none')]
    },
    {
      id: 'occupation',
      question: t('occupationRisk'),
      type: 'select',
      options: [t('lowRisk'), t('mediumRisk'), t('highRisk')]
    }
  ];

  const calculateRiskScore = () => {
    let score = 0;
    
    // Age risk
    const ageRisk = { '18-25': 10, '26-35': 20, '36-45': 30, '46-55': 40, '55+': 50 };
    score += ageRisk[responses.age as keyof typeof ageRisk] || 0;

    // Lifestyle risk
    const lifestyleRisk = { [t('sedentary')]: 30, [t('moderatelyActive')]: 15, [t('veryActive')]: 5 };
    score += lifestyleRisk[responses.lifestyle as keyof typeof lifestyleRisk] || 0;

    // Smoking risk
    const smokingRisk = { [t('never')]: 0, [t('occasionally')]: 15, [t('regularly')]: 30 };
    score += smokingRisk[responses.smoking as keyof typeof smokingRisk] || 0;

    return Math.min(100, score);
  };

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const riskScore = showResults ? calculateRiskScore() : 0;
  const riskLevel = riskScore < 30 ? t('lowRisk') : riskScore < 60 ? t('moderateRisk') : t('highRisk');

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('backToDashboard')}
        </button>

        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <div className="text-center mb-8">
            <Activity className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('riskAssessment')}</h1>
            <p className="text-gray-600">{t('basedOnYourResponses')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <RiskGauge score={riskScore} />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{riskScore}/100</div>
                <div className={`text-sm font-medium ${
                  riskScore < 30 ? 'text-green-600' : riskScore < 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {riskLevel}
                </div>
              </div>
            </div>

            <div>
              <RiskChart responses={responses} />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('recommendations')}</h3>
            <div className="space-y-3">
              {riskScore < 30 && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">{t('lowRiskRecommendation')}</p>
                </div>
              )}
              {riskScore >= 30 && riskScore < 60 && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">{t('moderateRiskRecommendation')}</p>
                </div>
              )}
              {riskScore >= 60 && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">{t('highRiskRecommendation')}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => setShowResults(false)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t('retakeAssessment')}
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {t('getPersonalizedQuote')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        {t('backToDashboard')}
      </button>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / questions.length) * 100)}% {t('complete')}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.type === 'select' && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleResponse(currentQuestion.id, option)}
                  className={`w-full p-4 text-left border rounded-lg transition-all hover:border-blue-300 ${
                    responses[currentQuestion.id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiple' && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    onChange={(e) => {
                      const current = responses[currentQuestion.id] || [];
                      if (e.target.checked) {
                        handleResponse(currentQuestion.id, [...current, option]);
                      } else {
                        handleResponse(currentQuestion.id, current.filter((item: string) => item !== option));
                      }
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('previous')}
          </button>
          <button
            onClick={nextStep}
            disabled={!responses[currentQuestion.id]}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentStep === questions.length - 1 ? t('viewResults') : t('next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskProfiler;