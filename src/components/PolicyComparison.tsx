import React, { useState } from 'react';
import { ArrowLeft, Download, Share, Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PolicyComparisonProps {
  onBack: () => void;
}

const PolicyComparison: React.FC<PolicyComparisonProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [selectedPolicies, setSelectedPolicies] = useState<number[]>([0, 1, 2]);

  const policies = [
    {
      id: 0,
      name: 'Star Health Family Floater',
      provider: 'Star Health',
      type: 'Health Insurance',
      premium: '₹12,450',
      coverage: '₹10,00,000',
      features: {
        cashlessHospitals: 9500,
        prePostHospitalization: true,
        dayCareProcedures: true,
        ambulanceCover: true,
        maternity: true,
        copayment: false,
        roomRent: 'No Limit'
      },
      rating: 4.5,
      recommended: true
    },
    {
      id: 1,
      name: 'HDFC ERGO Health Suraksha',
      provider: 'HDFC ERGO',
      type: 'Health Insurance',
      premium: '₹10,800',
      coverage: '₹10,00,000',
      features: {
        cashlessHospitals: 8200,
        prePostHospitalization: true,
        dayCareProcedures: true,
        ambulanceCover: true,
        maternity: false,
        copayment: true,
        roomRent: '2% of Sum Insured'
      },
      rating: 4.2,
      recommended: false
    },
    {
      id: 2,
      name: 'Max Bupa Health Companion',
      provider: 'Max Bupa',
      type: 'Health Insurance',
      premium: '₹14,200',
      coverage: '₹10,00,000',
      features: {
        cashlessHospitals: 7500,
        prePostHospitalization: true,
        dayCareProcedures: true,
        ambulanceCover: true,
        maternity: true,
        copayment: false,
        roomRent: 'No Limit'
      },
      rating: 4.3,
      recommended: false
    }
  ];

  const exportToPDF = () => {
    // Simulate PDF export
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,Policy Comparison Report');
    element.setAttribute('download', 'policy-comparison.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const shareComparison = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Insurance Policy Comparison',
        text: 'Check out this insurance policy comparison',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('backToDashboard')}
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={exportToPDF}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            {t('exportPDF')}
          </button>
          <button
            onClick={shareComparison}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Share className="h-4 w-4 mr-2" />
            {t('share')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('policyComparison')}</h1>
          <p className="text-gray-600">{t('compareFeaturesBenefits')}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                  {t('features')}
                </th>
                {selectedPolicies.map(policyId => {
                  const policy = policies[policyId];
                  return (
                    <th key={policyId} className="px-6 py-4 text-center min-w-64">
                      <div className="space-y-2">
                        {policy.recommended && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {t('recommended')}
                          </span>
                        )}
                        <div className="font-semibold text-gray-900">{policy.name}</div>
                        <div className="text-sm text-gray-600">{policy.provider}</div>
                        <div className="flex justify-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(policy.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-sm text-gray-600">{policy.rating}</span>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-blue-50">
                  {t('annualPremium')}
                </td>
                {selectedPolicies.map(policyId => (
                  <td key={policyId} className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-lg font-bold text-blue-600">{policies[policyId].premium}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                  {t('sumInsured')}
                </td>
                {selectedPolicies.map(policyId => (
                  <td key={policyId} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    <span className="font-semibold">{policies[policyId].coverage}</span>
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-gray-50">
                  {t('cashlessHospitals')}
                </td>
                {selectedPolicies.map(policyId => (
                  <td key={policyId} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {policies[policyId].features.cashlessHospitals.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                  {t('prePostHospitalization')}
                </td>
                {selectedPolicies.map(policyId => (
                  <td key={policyId} className="px-6 py-4 whitespace-nowrap text-center">
                    {policies[policyId].features.prePostHospitalization ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-gray-50">
                  {t('dayCareProcedures')}
                </td>
                {selectedPolicies.map(policyId => (
                  <td key={policyId} className="px-6 py-4 whitespace-nowrap text-center">
                    {policies[policyId].features.dayCareProcedures ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                  {t('maternityCover')}
                </td>
                {selectedPolicies.map(policyId => (
                  <td key={policyId} className="px-6 py-4 whitespace-nowrap text-center">
                    {policies[policyId].features.maternity ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-gray-50">
                  {t('copayment')}
                </td>
                {selectedPolicies.map(policyId => (
                  <td key={policyId} className="px-6 py-4 whitespace-nowrap text-center">
                    {policies[policyId].features.copayment ? (
                      <span className="text-red-600 font-medium">{t('yes')}</span>
                    ) : (
                      <span className="text-green-600 font-medium">{t('no')}</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                  {t('roomRentLimit')}
                </td>
                {selectedPolicies.map(policyId => (
                  <td key={policyId} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {policies[policyId].features.roomRent}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-gray-50 border-t">
          <div className="flex flex-wrap justify-center gap-4">
            {selectedPolicies.map(policyId => (
              <button
                key={policyId}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t('selectPlan')} - {policies[policyId].provider}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyComparison;