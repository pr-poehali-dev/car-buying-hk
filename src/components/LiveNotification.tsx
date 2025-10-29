import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Notification {
  name: string;
  car: string;
  city: string;
  action: string;
}

const notifications: Notification[] = [
  { name: 'Сергей из Хабаровска', car: 'Toyota Camry 2018', city: 'Хабаровск', action: 'только что оставил заявку' },
  { name: 'Анна из Комсомольска', car: 'Nissan X-Trail 2016', city: 'Комсомольск-на-Амуре', action: 'продала авто' },
  { name: 'Дмитрий из Амурска', car: 'Mazda 6 2017', city: 'Амурск', action: 'получил деньги' },
  { name: 'Елена из Хабаровска', car: 'Honda CR-V 2019', city: 'Хабаровск', action: 'оставила заявку' },
  { name: 'Александр из Бикина', car: 'Hyundai Solaris 2020', city: 'Бикин', action: 'продал кредитное авто' }
];

export default function LiveNotification() {
  const [visible, setVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [notificationIndex, setNotificationIndex] = useState(0);

  useEffect(() => {
    const showNotification = () => {
      const notification = notifications[notificationIndex];
      setCurrentNotification(notification);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);

      setNotificationIndex((prev) => (prev + 1) % notifications.length);
    };

    const initialDelay = setTimeout(showNotification, 3000);
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [notificationIndex]);

  if (!visible || !currentNotification) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="p-4 shadow-2xl border-2 border-green-200 bg-white max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="CheckCircle2" className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 mb-1">
              {currentNotification.name}
            </p>
            <p className="text-xs text-gray-600 mb-1">
              {currentNotification.action}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Icon name="Car" className="w-3 h-3" />
              {currentNotification.car}
            </p>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <Icon name="X" className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </div>
  );
}
