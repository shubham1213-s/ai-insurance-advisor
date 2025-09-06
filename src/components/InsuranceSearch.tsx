import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Star, Shield, Heart, Car, Home, Users, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InsuranceSearchProps {
  onBack: () => void;
}

interface InsurancePlan {
  id: number;
  name: string;
  provider: string;
  type: 'health' | 'life' | 'vehicle' | 'home';
  premium: number;
  coverage: number;
  features: string[];
  rating: number;
  ageRange: [number, number];
  minIncome: number;
  maxDependents: number;
  recommended: boolean;
}

const InsuranceSearch: React.FC<InsuranceSearchProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPlans, setFilteredPlans] = useState<InsurancePlan[]>([]);
  
  // User profile for filtering
  const [userProfile] = useState({
    age: 28,
    dependents: 2,
    income: 45000,
    occupation: 'Software Developer'
  });

  // Filter criteria
  const [filters, setFilters] = useState({
    maxPremium: 50000,
    minCoverage: 100000,
    sortBy: 'recommended'
  });

  const insurancePlans: InsurancePlan[] = [
    // Health Insurance Plans
    {
      id: 1,
      name: 'Star Health Family Floater',
      provider: 'Star Health',
      type: 'health',
      premium: 12450,
      coverage: 1000000,
      features: ['Cashless Claims', 'Pre/Post Hospitalization', 'Day Care', 'Maternity'],
      rating: 4.5,
      ageRange: [18, 65],
      minIncome: 25000,
      maxDependents: 6,
      recommended: true
    },
    {
      id: 2,
      name: 'HDFC ERGO Health Suraksha',
      provider: 'HDFC ERGO',
      type: 'health',
      premium: 10800,
      coverage: 1000000,
      features: ['Cashless Claims', 'Pre/Post Hospitalization', 'Day Care'],
      rating: 4.2,
      ageRange: [18, 60],
      minIncome: 20000,
      maxDependents: 4,
      recommended: false
    },
    {
      id: 3,
      name: 'Max Bupa Health Companion',
      provider: 'Max Bupa',
      type: 'health',
      premium: 14200,
      coverage: 1000000,
      features: ['Cashless Claims', 'Maternity', 'Wellness Benefits'],
      rating: 4.3,
      ageRange: [21, 65],
      minIncome: 30000,
      maxDependents: 5,
      recommended: false
    },
    // Life Insurance Plans
    {
      id: 4,
      name: 'LIC Tech Term',
      provider: 'LIC',
      type: 'life',
      premium: 8200,
      coverage: 5000000,
      features: ['Pure Term Plan', 'Tax Benefits', 'Online Claims', 'Accidental Death'],
      rating: 4.4,
      ageRange: [18, 60],
      minIncome: 30000,
      maxDependents: 10,
      recommended: true
    },
    {
      id: 5,
      name: 'HDFC Click 2 Protect Plus',
      provider: 'HDFC Life',
      type: 'life',
      premium: 9500,
      coverage: 5000000,
      features: ['Term Plan', 'Critical Illness', 'Waiver of Premium'],
      rating: 4.1,
      ageRange: [18, 65],
      minIncome: 25000,
      maxDependents: 8,
      recommended: false
    },
    // Vehicle Insurance Plans
    {
      id: 6,
      name: 'Bajaj Allianz Motor Package',
      provider: 'Bajaj Allianz',
      type: 'vehicle',
      premium: 4800,
      coverage: 500000,
      features: ['Zero Depreciation', 'Roadside Assistance', 'NCB Protection'],
      rating: 4.3,
      ageRange: [18, 75],
      minIncome: 15000,
      maxDependents: 10,
      recommended: true
    },
    {
      id: 7,
      name: 'ICICI Lombard Car Insurance',
      provider: 'ICICI Lombard',
      type: 'vehicle',
      premium: 5200,
      coverage: 500000,
      features: ['Comprehensive Coverage', 'Engine Protection', 'Key Replacement'],
      rating: 4.0,
      ageRange: [21, 70],
      minIncome: 20000,
      maxDependents: 8,
      recommended: false
    },
    // Home Insurance Plans
    {
      id: 8,
      name: 'HDFC ERGO Home Shield',
      provider: 'HDFC ERGO',
      type: 'home',
      premium: 3500,
      coverage: 2000000,
      features: ['Fire & Allied Perils', 'Burglary', 'Electronics Cover', 'Temporary Accommodation'],
      rating: 4.2,
      ageRange: [21, 75],
      minIncome: 25000,
      maxDependents: 10,
      recommended: true
    },
    {
      id: 9,
      name: 'Bajaj Allianz Home Insurance',
      provider: 'Bajaj Allianz',
      type: 'home',
      premium: 4200,
      coverage: 2500000,
      features: ['Comprehensive Coverage', 'Natural Disasters', 'Jewelry Cover'],
      rating: 4.1,
      ageRange: [25, 70],
      minIncome: 30000,
      maxDependents: 8,
      recommended: false
    }
  ];

  const insuranceTypes = [
    { id: 'all', name: t('allInsurance'), icon: Shield, color: 'text-gray-600' },
    { id: 'health', name: t('healthInsurance'), icon: Heart, color: 'text-red-500' },
    { id: 'life', name: t('lifeInsurance'), icon: Shield, color: 'text-blue-500' },
    { id: 'vehicle', name: t('vehicleInsurance'), icon: Car, color: 'text-green-500' },
    { id: 'home', name: t('homeInsurance'), icon: Home, color: 'text-purple-500' }
  ];

  const filterPlans = () => {
    let filtered = insurancePlans.filter(plan => {
      // Type filter
      if (selectedType !== 'all' && plan.type !== selectedType) return false;
      
      // Search query filter
      if (searchQuery && !plan.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !plan.provider.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // User profile compatibility
      if (userProfile.age < plan.ageRange[0] || userProfile.age > plan.ageRange[1]) return false;
      if (userProfile.income < plan.minIncome) return false;
      if (userProfile.dependents > plan.maxDependents) return false;
      
      // Filter criteria
      if (plan.premium > filters.maxPremium) return false;
      if (plan.coverage < filters.minCoverage) return false;
      
      return true;
    });

    // Sort plans
    switch (filters.sortBy) {
      case 'premium-low':
        filtered.sort((a, b) => a.premium - b.premium);
        break;
      case 'premium-high':
        filtered.sort((a, b) => b.premium - a.premium);
        break;
      case 'coverage-high':
        filtered.sort((a, b) => b.coverage - a.coverage);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // recommended
        filtered.sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0));
    }

    setFilteredPlans(filtered);
  };

  useEffect(() => {
    filterPlans();
  }, [selectedType, searchQuery, filters]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'health': return Heart;
      case 'life': return Shield;
      case 'vehicle': return Car;
      case 'home': return Home;
      default: return Shield;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'health': return 'text-red-500';
      case 'life': return 'text-blue-500';
      case 'vehicle': return 'text-green-500';
      case 'home': return 'text-purple-500';
      default: return 'text-gray-500';
    }
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

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('findInsurance')}</h1>
        <p className="text-gray-600 mb-6">{t('personalizedRecommendations')}</p>
        
        {/* User Profile Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{userProfile.age} {t('yearsOld')}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{userProfile.dependents} {t('dependents')}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>₹{userProfile.income.toLocaleString()}/mo</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{userProfile.occupation}</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchInsurance')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            {t('filters')}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('maxPremium')}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={filters.maxPremium}
                  onChange={(e) => setFilters({...filters, maxPremium: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="text-sm text-gray-600">₹{filters.maxPremium.toLocaleString()}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('minCoverage')}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={filters.minCoverage}
                  onChange={(e) => setFilters({...filters, minCoverage: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="text-sm text-gray-600">₹{(filters.minCoverage / 100000).toFixed(0)}L</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('sortBy')}
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="recommended">{t('recommended')}</option>
                  <option value="premium-low">{t('premiumLowToHigh')}</option>
                  <option value="premium-high">{t('premiumHighToLow')}</option>
                  <option value="coverage-high">{t('coverageHighToLow')}</option>
                  <option value="rating">{t('highestRated')}</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Insurance Type Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {insuranceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === type.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <type.icon className={`h-4 w-4 mr-2 ${selectedType === type.id ? 'text-white' : type.color}`} />
            {type.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {filteredPlans.length} {t('plansFound')}
        </h2>
        <div className="text-sm text-gray-600">
          {t('matchingYourProfile')}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPlans.map((plan) => {
          const TypeIcon = getTypeIcon(plan.type);
          const typeColor = getTypeColor(plan.type);
          
          return (
            <div key={plan.id} className={`bg-white rounded-xl p-6 shadow-sm border-2 hover:shadow-md transition-all ${
              plan.recommended ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100'
            }`}>
              {plan.recommended && (
                <div className="flex items-center text-blue-600 text-sm font-medium mb-3">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  {t('aiRecommended')}
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TypeIcon className={`h-5 w-5 ${typeColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.provider}</p>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(plan.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-600">{plan.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">₹{plan.premium.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{t('perYear')}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">{t('coverage')}</span>
                  <span className="font-medium">₹{(plan.coverage / 100000).toFixed(0)}L</span>
                </div>
                <div className="text-xs text-gray-500">
                  {t('ageRange')}: {plan.ageRange[0]}-{plan.ageRange[1]} | {t('minIncome')}: ₹{plan.minIncome.toLocaleString()}
                </div>
              </div>

              <div className="space-y-1 mb-4">
                {plan.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <Shield className="h-3 w-3 mr-2 text-green-500" />
                    {feature}
                  </div>
                ))}
                {plan.features.length > 3 && (
                  <div className="text-xs text-blue-600">
                    +{plan.features.length - 3} {t('moreFeatures')}
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  {t('getQuote')}
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  {t('compare')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noPlansFound')}</h3>
          <p className="text-gray-600 mb-4">{t('tryAdjustingFilters')}</p>
          <button
            onClick={() => {
              setSelectedType('all');
              setSearchQuery('');
              setFilters({ maxPremium: 50000, minCoverage: 100000, sortBy: 'recommended' });
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('resetFilters')}
          </button>
        </div>
      )}
    </div>
  );
};

export default InsuranceSearch;