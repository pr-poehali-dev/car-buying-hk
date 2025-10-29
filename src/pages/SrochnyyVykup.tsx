import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Helmet } from 'react-helmet';
import { getUTMParams, trackUTMInMetrika } from '@/utils/utm';

function SrochnyyVykup() {
  const [evaluationForm, setEvaluationForm] = useState({
    brand: '',
    model: '',
    year: '',
    city: '',
    condition: '',
    phone: ''
  });

  useEffect(() => {
    trackUTMInMetrika();
    
    const detectCity = async () => {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!response.ok) throw new Error('GeoJS API failed');
        const data = await response.json();
        
        const cityMap: { [key: string]: string } = {
          'Khabarovsk': 'khabarovsk',
          'Хабаровск': 'khabarovsk',
          'Komsomolsk-on-Amur': 'komsomolsk',
          'Komsomolsk': 'komsomolsk',
          'Комсомольск-на-Амуре': 'komsomolsk'
        };

        const detectedCity = cityMap[data.city] || '';
        if (detectedCity) {
          setEvaluationForm(prev => ({ ...prev, city: detectedCity }));
        }
      } catch (error) {
        console.log('City auto-detection unavailable');
      }
    };
    detectCity();
  }, []);

  const sendLeadToTelegram = async () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'LANDING_SROCHNO_SUBMIT');
    }
    
    const utmParams = getUTMParams();
    
    try {
      const response = await fetch('https://functions.poehali.dev/d96ee797-612a-46f2-b934-ed038b121758', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...evaluationForm, source: 'landing-srochno', ...utmParams })
      });

      if (!response.ok) throw new Error('Failed to send lead');
      alert('Ваша заявка отправлена! Дождитесь звонка от специалиста.');
      
      setEvaluationForm({
        brand: '',
        model: '',
        year: '',
        city: evaluationForm.city,
        condition: '',
        phone: ''
      });
    } catch (error) {
      alert('Произошла ошибка. Позвоните нам: +7 984 177-15-88');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = evaluationForm.phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 11) {
      alert('Пожалуйста, введите полный номер телефона');
      return;
    }
    sendLeadToTelegram();
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 1) return `+7 ${cleaned}`;
    if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)})`;
    if (cleaned.length <= 7) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
    if (cleaned.length <= 9) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  };

  return (
    <>
      <Helmet>
        <title>Срочный выкуп авто в Хабаровске за 15 минут | Деньги сразу | +7 984 177-15-88</title>
        <meta name="description" content="⚡ Срочный выкуп авто в Хабаровске! Оценка за 5 минут, сделка за 15 минут. Покупаем любые автомобили - битые, целые, кредитные. Деньги сразу наличными или переводом." />
        <link rel="canonical" href="https://avtovykupkhb27.ru/srochnyy-vykup-avto" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a href="/" className="flex items-center space-x-3">
                <img 
                  src="/img/4d19976a-c708-4ad1-bca6-33a1ebd3ad51.jpg" 
                  alt="АвтоВыкуп Хабаровск" 
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                  <h1 className="font-roboto font-bold text-xl text-gray-900">АвтоВыкуп27</h1>
                  <p className="text-xs text-gray-600">Хабаровский край</p>
                </div>
              </a>
              <a 
                href="tel:+79841771588" 
                className="text-primary hover:text-primary/80 font-bold text-lg transition-colors flex items-center gap-2"
              >
                <Icon name="Phone" className="w-5 h-5" />
                +7 984 177-15-88
              </a>
            </div>
          </div>
        </nav>

        <section className="py-12 md:py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold mb-4">
                  ⚡ СРОЧНО
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Выкуп авто за 15 минут
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Нужны деньги сегодня? Оценим автомобиль за 5 минут, оформим сделку за 15 минут. 
                  Деньги сразу наличными или переводом на карту.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Icon name="Zap" className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Оценка за 5 минут</h3>
                      <p className="text-gray-600">По фото или при осмотре</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Сделка за 15 минут</h3>
                      <p className="text-gray-600">Минимум документов и бюрократии</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Banknote" className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Деньги сразу</h3>
                      <p className="text-gray-600">Наличными или переводом в момент сделки</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                  <p className="text-gray-800 font-semibold">
                    🔥 Работаем круглосуточно! Звоните в любое время.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-orange-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Узнайте стоимость за 5 минут
                </h2>
                <p className="text-orange-600 font-semibold mb-6">Деньги получите сегодня!</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Марка автомобиля
                    </label>
                    <Input
                      required
                      placeholder="Например: Toyota"
                      value={evaluationForm.brand}
                      onChange={(e) => setEvaluationForm({...evaluationForm, brand: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Модель
                    </label>
                    <Input
                      required
                      placeholder="Например: Camry"
                      value={evaluationForm.model}
                      onChange={(e) => setEvaluationForm({...evaluationForm, model: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Год выпуска
                    </label>
                    <Input
                      required
                      type="number"
                      placeholder="2015"
                      value={evaluationForm.year}
                      onChange={(e) => setEvaluationForm({...evaluationForm, year: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Город
                    </label>
                    <Select 
                      required
                      value={evaluationForm.city} 
                      onValueChange={(value) => setEvaluationForm({...evaluationForm, city: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите город" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="khabarovsk">Хабаровск</SelectItem>
                        <SelectItem value="komsomolsk">Комсомольск-на-Амуре</SelectItem>
                        <SelectItem value="amursk">Амурск</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={evaluationForm.phone}
                      onChange={(e) => setEvaluationForm({...evaluationForm, phone: formatPhoneNumber(e.target.value)})}
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 text-lg bg-orange-600 hover:bg-orange-700">
                    Получить деньги сегодня
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Почему выбирают нас для срочного выкупа
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock3" className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">Работаем 24/7</h3>
                <p className="text-gray-600">Звоните в любое время дня и ночи</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">Выезд по краю</h3>
                <p className="text-gray-600">Приедем в любой район Хабаровского края</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ShieldCheck" className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">Честная цена</h3>
                <p className="text-gray-600">Реальная рыночная стоимость без торга</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="mb-4">© 2024 АвтоВыкуп27. Все права защищены.</p>
            <a href="/" className="text-primary hover:underline">Вернуться на главную</a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default SrochnyyVykup;