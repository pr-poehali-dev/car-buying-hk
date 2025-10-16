import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface ExitIntentPopupProps {
  onSubmit: (phone: string) => void;
}

export function ExitIntentPopup({ onSubmit }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [hasShown, setHasShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setIsSubmitting(true);
    await onSubmit(phone);
    setIsSubmitting(false);
    setIsOpen(false);
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 1) return `+7 ${cleaned}`;
    if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)})`;
    if (cleaned.length <= 7) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
    if (cleaned.length <= 9) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Icon name="PhoneCall" className="text-primary" size={28} />
            Подождите!
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Не уходите! Оставьте номер телефона — <span className="font-semibold text-primary">перезвоним за 60 секунд</span> и оценим ваше авто
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={18}
              className="text-lg h-12"
              required
            />
          </div>

          <div className="flex gap-3">
            <Button 
              type="submit" 
              className="flex-1 h-12 text-base"
              disabled={isSubmitting || phone.length < 18}
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" className="animate-spin mr-2" size={18} />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Phone" className="mr-2" size={18} />
                  Перезвоните мне
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="h-12"
            >
              <Icon name="X" size={18} />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={14} className="text-green-600" />
            <span>Ваши данные защищены и не передаются третьим лицам</span>
          </div>
        </form>

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-green-600">
              <Icon name="Clock" size={16} />
              <span className="font-semibold">Ответим за 60 секунд</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Icon name="TrendingUp" size={16} />
              <span className="font-semibold">Честная оценка</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
