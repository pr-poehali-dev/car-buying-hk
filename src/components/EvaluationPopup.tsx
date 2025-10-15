import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const EvaluationPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenEvaluationPopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosed(true);
    sessionStorage.setItem('hasSeenEvaluationPopup', 'true');
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleAction = () => {
    sessionStorage.setItem('hasSeenEvaluationPopup', 'true');
    setIsClosed(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
          isClosed ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Закрыть"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calculator" className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Узнайте стоимость вашего авто
            </h3>
            <p className="text-gray-600">
              Бесплатная оценка за 5 минут. Получите реальную рыночную цену прямо сейчас!
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Check" className="text-green-600" size={16} />
              </div>
              <span className="text-sm">Оценка за 5 минут</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Check" className="text-green-600" size={16} />
              </div>
              <span className="text-sm">Деньги в день сделки</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Check" className="text-green-600" size={16} />
              </div>
              <span className="text-sm">Выкупаем кредитные авто</span>
            </div>
          </div>

          <div className="space-y-3">
            <a href="/#evaluation" onClick={handleAction} className="block">
              <Button size="lg" className="w-full gap-2">
                <Icon name="Calculator" size={20} />
                Оценить авто
              </Button>
            </a>
            
            <div className="grid grid-cols-2 gap-3">
              <a href="tel:+79841771588" onClick={handleAction}>
                <Button size="default" variant="outline" className="w-full gap-2">
                  <Icon name="Phone" size={18} />
                  Позвонить
                </Button>
              </a>
              <a href="https://wa.me/79841771588" target="_blank" rel="noopener noreferrer" onClick={handleAction}>
                <Button size="default" variant="outline" className="w-full gap-2">
                  <Icon name="MessageCircle" size={18} />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 rounded-b-2xl border-t">
          <p className="text-xs text-gray-500 text-center">
            🎁 Специальное предложение действует до конца месяца
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPopup;
