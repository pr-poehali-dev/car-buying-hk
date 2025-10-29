import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Helmet } from 'react-helmet';
import { getUTMParams, trackUTMInMetrika } from '@/utils/utm';

function VykupKreditnyhAvto() {
  const [evaluationForm, setEvaluationForm] = useState({
    brand: '',
    model: '',
    year: '',
    city: '',
    condition: 'кредитное',
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
      (window as any).ym(104279599, 'reachGoal', 'LANDING_KREDIT_SUBMIT');
    }
    
    const utmParams = getUTMParams();
    
    try {
      const response = await fetch('https://functions.poehali.dev/d96ee797-612a-46f2-b934-ed038b121758', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...evaluationForm, source: 'landing-kredit', ...utmParams })
      });

      if (!response.ok) throw new Error('Failed to send lead');
      alert('Ваша заявка отправлена! Дождитесь звонка от специалиста.');
      
      setEvaluationForm({
        brand: '',
        model: '',
        year: '',
        city: evaluationForm.city,
        condition: 'кредитное',
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
        <title>Выкуп кредитных авто в Хабаровске | Помощь с погашением кредита | +7 984 177-15-88</title>
        <meta name="description" content="⚡ Выкуп автомобилей в кредите в Хабаровске за 15 минут. Помогаем погасить кредит в банке и оформить сделку. Берём на себя все документы. Деньги сразу." />
        <link rel="canonical" href="https://avtovykupkhb27.ru/vykup-kreditnyh-avto" />
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

        <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Выкуп кредитных автомобилей
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Берём на себя погашение кредита в банке. Оформляем все документы. 
                  Разница между ценой авто и кредитом — вам сразу на руки.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle" className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Погашаем кредит</h3>
                      <p className="text-gray-600">Работаем со всеми банками края</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle" className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Берём все документы на себя</h3>
                      <p className="text-gray-600">Справка об остатке долга, снятие обременения</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle" className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Деньги сразу</h3>
                      <p className="text-gray-600">Разница — вам на руки в день сделки</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-gray-800 font-semibold">
                    💰 Помогаем избавиться от кредита быстро и выгодно
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Узнайте стоимость за 5 минут
                </h2>
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

                  <Button type="submit" className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                    Узнать стоимость
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
              Как проходит выкуп кредитного авто
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Оценка</h3>
                <p className="text-gray-600">Оцениваем авто и узнаём остаток долга</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Документы</h3>
                <p className="text-gray-600">Получаем справку из банка</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Сделка</h3>
                <p className="text-gray-600">Закрываем кредит в банке</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Деньги</h3>
                <p className="text-gray-600">Разница — вам на руки</p>
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

export default VykupKreditnyhAvto;