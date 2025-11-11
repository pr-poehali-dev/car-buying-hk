import Icon from '@/components/ui/icon';
import { trackWhatsAppClick } from '@/utils/analytics';

export function FloatingMessengers() {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    window.open('https://wa.me/79841771588?text=Здравствуйте! Хочу узнать стоимость выкупа авто', '_blank');
  };

  const handleTelegramClick = () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'TELEGRAM_CLICK');
    }
    window.open('https://t.me/+79841771588', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="group relative bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={26} className="fill-white" />
        
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Написать в WhatsApp
        </span>
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
      </button>

      {/* Telegram Button */}
      <button
        onClick={handleTelegramClick}
        className="group relative bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Написать в Telegram"
      >
        <Icon name="Send" size={24} className="fill-white" />
        
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Написать в Telegram
        </span>
      </button>

      {/* Phone Button */}
      <a
        href="tel:+79841771588"
        className="group relative bg-primary hover:bg-primary/90 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Позвонить"
        onClick={() => {
          if (typeof window !== 'undefined' && (window as any).ym) {
            (window as any).ym(104279599, 'reachGoal', 'PHONE_CLICK');
          }
        }}
      >
        <Icon name="Phone" size={24} />
        
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Позвонить
        </span>
      </a>
    </div>
  );
}
