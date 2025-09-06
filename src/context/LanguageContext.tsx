import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    riskProfiler: 'Risk Profiler',
    compare: 'Compare',
    community: 'Community',
    
    // Common
    age: 'Age',
    dependents: 'Dependents',
    monthlyIncome: 'Monthly Income',
    occupation: 'Occupation',
    learnMore: 'Learn More',
    viewDetails: 'View Details',
    premium: 'Premium',
    coverage: 'Coverage',
    features: 'Features',
    recommended: 'Recommended',
    yes: 'Yes',
    no: 'No',
    previous: 'Previous',
    next: 'Next',
    complete: 'Complete',
    
    // Dashboard
    welcomeMessage: 'Welcome to Smart Insurance',
    aiPoweredRecommendations: 'Get AI-powered recommendations tailored to your needs',
    assessRisk: 'Assess My Risk',
    comparePlans: 'Compare Plans',
    insuranceTypes: 'Insurance Types',
    healthInsurance: 'Health Insurance',
    lifeInsurance: 'Life Insurance',
    vehicleInsurance: 'Vehicle Insurance',
    homeInsurance: 'Home Insurance',
    personalizedPlans: 'Personalized plans for you',
    specialPrograms: 'Special Programs',
    gigWorkers: 'Gig Workers',
    farmers: 'Farmers',
    dailyWagers: 'Daily Wagers',
    affordableCoverage: 'Affordable coverage for flexible income',
    customPlans: 'Custom plans for agricultural community',
    flexiblePayments: 'Flexible payment schedules',
    communityPools: 'Community Insurance Pools',
    groupDiscounts: 'Join with others and save up to 40% on premiums',
    joinPool: 'Join a Pool',
    avgSavings: 'Avg. Savings',
    
    // AI Recommendations
    aiRecommendations: 'AI Recommendations',
    personalizedForYou: 'Personalized for you',
    topRecommended: 'Top Recommended',
    aiScore: 'AI Score',
    
    // Risk Profiler
    backToDashboard: 'Back to Dashboard',
    riskAssessment: 'Risk Assessment Results',
    basedOnYourResponses: 'Based on your responses to our lifestyle questionnaire',
    recommendations: 'Recommendations',
    lowRiskRecommendation: 'Your healthy lifestyle puts you in the low-risk category. Consider basic coverage with preventive care benefits.',
    moderateRiskRecommendation: 'Some lifestyle factors increase your risk. Comprehensive coverage with wellness programs is recommended.',
    highRiskRecommendation: 'Multiple risk factors detected. Comprehensive coverage with specialized care options is strongly recommended.',
    retakeAssessment: 'Retake Assessment',
    getPersonalizedQuote: 'Get Personalized Quote',
    
    // Risk Assessment Questions
    whatIsYourAge: 'What is your age group?',
    describeLifestyle: 'How would you describe your lifestyle?',
    smokingHabit: 'Do you smoke?',
    medicalHistory: 'Any existing medical conditions?',
    occupationRisk: 'What is your occupation risk level?',
    sedentary: 'Mostly Sedentary',
    moderatelyActive: 'Moderately Active',
    veryActive: 'Very Active',
    never: 'Never',
    occasionally: 'Occasionally',
    regularly: 'Regularly',
    diabetes: 'Diabetes',
    heartDisease: 'Heart Disease',
    hypertension: 'Hypertension',
    none: 'None',
    lowRisk: 'Low Risk',
    mediumRisk: 'Medium Risk',
    highRisk: 'High Risk',
    moderateRisk: 'Moderate Risk',
    viewResults: 'View Results',
    
    // Policy Comparison
    policyComparison: 'Policy Comparison',
    compareFeaturesBenefits: 'Compare features, benefits, and pricing side by side',
    exportPDF: 'Export PDF',
    share: 'Share',
    annualPremium: 'Annual Premium',
    sumInsured: 'Sum Insured',
    cashlessHospitals: 'Cashless Hospitals',
    prePostHospitalization: 'Pre/Post Hospitalization',
    dayCareProcedures: 'Day Care Procedures',
    maternityCover: 'Maternity Cover',
    copayment: 'Co-payment',
    roomRentLimit: 'Room Rent Limit',
    selectPlan: 'Select Plan',
    
    // Community Pools
    techWorkersPool: 'Tech Workers Pool',
    gigWorkersUnion: 'Gig Workers Union',
    farmersCollective: 'Farmers Collective',
    techWorkersDescription: 'Exclusive pool for IT professionals and tech workers',
    gigWorkersDescription: 'Affordable insurance for freelancers and gig economy workers',
    farmersDescription: 'Community insurance for agricultural workers and farmers',
    members: 'members',
    savings: 'savings',
    poolBenefits: 'Pool Benefits',
    howItWorks: 'How It Works',
    joinThisPool: 'Join This Pool',
    createCustomPool: 'Create Custom Pool',
    customPoolDescription: "Can't find a suitable pool? Create your own community pool",
    startNewPool: 'Start New Pool',
    groupNegotiatedRates: 'Group negotiated rates',
    tailoredCoverage: 'Industry-tailored coverage',
    fastClaimProcessing: 'Fast claim processing',
    preventiveHealthchecks: 'Preventive health check-ups',
    flexiblePremiums: 'Flexible premium payments',
    incomeBasedCoverage: 'Income-based coverage',
    occupationalProtection: 'Occupational hazard protection',
    communitySupport: 'Community support network',
    seasonalPayments: 'Seasonal payment options',
    cropInsuranceBundle: 'Crop insurance bundle',
    ruralHealthcare: 'Rural healthcare network',
    weatherProtection: 'Weather-related coverage',
    joinPool: 'Join the pool',
    groupNegotiation: 'Pool negotiates better rates',
    enjoySavings: 'Enjoy group savings',
    avgSavingsPerYear: 'Avg. Savings Per Year',
    totalMembers: 'Total Members',
    avgDiscount: 'Avg. Discount',
    communityPoolsDescription: 'Join community pools to get better rates through group purchasing power',
    
    // WhatsApp Integration
    whatsappIntegration: 'WhatsApp Integration',
    stayConnectedWhatsApp: 'Stay connected and get instant updates on WhatsApp',
    enableWhatsApp: 'Enable WhatsApp',
    connected: 'Connected',
    recentNotifications: 'Recent Notifications',
    premiumDueReminder: 'Premium due in 5 days - Pay now to avoid lapse',
    claimStatusUpdate: 'Claim #CLM001 approved - Amount credited to your account',
    specialOfferNotification: 'Special offer: 20% off on family floater plans',
    premiumReminders: 'Premium Reminders',
    neverMissPayment: 'Never miss a payment',
    claimUpdates: 'Claim Updates',
    realTimeStatus: 'Real-time status updates',
    directSupport: 'Direct Support',
    instantHelp: 'Instant help via chat',
    
    // Chatbot
    insuranceAssistant: 'Insurance Assistant',
    onlineNow: 'Online now',
    chatbotWelcome: 'Hello! I\'m your AI insurance assistant. How can I help you today?',
    typeMessage: 'Type a message...',
    quickReplies: 'Quick replies:',
    compareHealthPlans: 'Compare health plans',
    claimProcess: 'Claim process',
    premiumCalculator: 'Premium calculator',
    voiceMessageExample: 'Voice message received',
    
    // Chatbot Responses
    healthInsuranceResponse: 'For health insurance, I recommend looking at family floater plans. They offer comprehensive coverage for your entire family at competitive rates. Would you like me to show you some options?',
    lifeInsuranceResponse: 'Life insurance is crucial for financial security. Based on your profile, term insurance would be most cost-effective. The coverage amount should be 10-15 times your annual income.',
    vehicleInsuranceResponse: 'For vehicle insurance, comprehensive coverage is recommended. It includes third-party liability plus own damage coverage. Zero depreciation add-on is great for new cars.',
    homeInsuranceResponse: 'Home insurance protects your property and belongings. It covers fire, theft, natural disasters, and liability. The sum insured should match your property\'s current market value.',
    claimResponse: 'To file a claim, you can use our app, call our helpline, or WhatsApp us. Keep all relevant documents ready. Most cashless claims are processed within 2-4 hours.',
    premiumResponse: 'Premiums depend on coverage amount, your age, health status, and chosen add-ons. You can save money by choosing higher deductibles, maintaining good health, and comparing plans annually.',
    communityPoolResponse: 'Community pools allow groups with similar profiles to get better rates through collective bargaining. You can save 30-40% on premiums while getting better coverage.',
    defaultBotResponse: 'I\'m here to help with all your insurance questions. You can ask me about health, life, vehicle, or home insurance, claims process, premiums, or community pools.',
    
    // Insurance Search
    findInsurance: 'Find Insurance Plans',
    personalizedRecommendations: 'Discover insurance plans tailored to your profile and needs',
    allInsurance: 'All Insurance',
    searchInsurance: 'Search insurance plans...',
    filters: 'Filters',
    maxPremium: 'Max Premium',
    minCoverage: 'Min Coverage',
    sortBy: 'Sort By',
    premiumLowToHigh: 'Premium: Low to High',
    premiumHighToLow: 'Premium: High to Low',
    coverageHighToLow: 'Coverage: High to Low',
    highestRated: 'Highest Rated',
    plansFound: 'plans found',
    matchingYourProfile: 'Matching your profile',
    aiRecommended: 'AI Recommended',
    perYear: 'per year',
    ageRange: 'Age Range',
    minIncome: 'Min Income',
    moreFeatures: 'more features',
    getQuote: 'Get Quote',
    compare: 'Compare',
    noPlansFound: 'No Plans Found',
    tryAdjustingFilters: 'Try adjusting your filters or search criteria',
    resetFilters: 'Reset Filters',
    yearsOld: 'years old',
    searchPlans: 'Search Plans'
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    riskProfiler: 'जोखिम प्रोफाइलर',
    compare: 'तुलना करें',
    community: 'समुदाय',
    
    // Common
    age: 'आयु',
    dependents: 'आश्रित',
    monthlyIncome: 'मासिक आय',
    occupation: 'व्यवसाय',
    learnMore: 'और जानें',
    viewDetails: 'विवरण देखें',
    premium: 'प्रीमियम',
    coverage: 'कवरेज',
    features: 'सुविधाएं',
    recommended: 'अनुशंसित',
    yes: 'हाँ',
    no: 'नहीं',
    previous: 'पिछला',
    next: 'अगला',
    complete: 'पूर्ण',
    
    // Add more Hindi translations as needed...
  }
  // Add other language translations (bn, ta, te) as needed...
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;