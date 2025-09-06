import React, { useState } from 'react';
import { MessageSquare, Bell, Check, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WhatsAppNotifications: React.FC = () => {
  const { t } = useLanguage();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'reminder',
      message: t('premiumDueReminder'),
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'claim',
      message: t('claimStatusUpdate'),
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'offer',
      message: t('specialOfferNotification'),
      time: '3 days ago',
      read: true
    }
  ];

  const subscribeToWhatsApp = () => {
    setIsSubscribed(true);
    // In a real app, this would integrate with WhatsApp Business API
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t('whatsappIntegration')}</h3>
            <p className="text-gray-600">{t('stayConnectedWhatsApp')}</p>
          </div>
        </div>
        
        {!isSubscribed ? (
          <button
            onClick={subscribeToWhatsApp}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            {t('enableWhatsApp')}
          </button>
        ) : (
          <div className="flex items-center text-green-600">
            <Check className="h-5 w-5 mr-2" />
            <span className="font-medium">{t('connected')}</span>
          </div>
        )}
      </div>

      {isSubscribed && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">{t('recentNotifications')}</h4>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                  notification.read ? 'bg-white/50' : 'bg-white border border-green-200'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.read ? 'bg-gray-300' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className={`text-sm ${
                    notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'
                  }`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {notification.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-white/50 rounded-lg">
          <Bell className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-gray-900">{t('premiumReminders')}</div>
          <div className="text-xs text-gray-600">{t('neverMissPayment')}</div>
        </div>
        <div className="text-center p-3 bg-white/50 rounded-lg">
          <Check className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-gray-900">{t('claimUpdates')}</div>
          <div className="text-xs text-gray-600">{t('realTimeStatus')}</div>
        </div>
        <div className="text-center p-3 bg-white/50 rounded-lg">
          <MessageSquare className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-gray-900">{t('directSupport')}</div>
          <div className="text-xs text-gray-600">{t('instantHelp')}</div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppNotifications;