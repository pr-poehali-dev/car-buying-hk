import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { BrandSelect } from '@/components/BrandSelect';
import { ModelSelect } from '@/components/ModelSelect';
import { YearSelect } from '@/components/YearSelect';

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [evaluationForm, setEvaluationForm] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    phone: ''
  });

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleEvaluationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!evaluationForm.phone) {
      alert('Пожалуйста, введите номер телефона');
      return;
    }

    // Yandex Metrika goal tracking - Form submission
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'FORM_SUBMIT');
    }
    
    try {
      // Send lead to backend (Telegram bot notification)
      const response = await fetch('https://functions.poehali.dev/d96ee797-612a-46f2-b934-ed038b121758', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluationForm)
      });

      if (!response.ok) {
        throw new Error('Failed to send lead');
      }

      // Show success message
      alert('Ваша заявка отправлена! Дождитесь звонка от специалиста. Мы свяжемся с вами в течение 15 минут.');
      
      // Reset form
      setEvaluationForm({
        brand: '',
        model: '',
        year: '',
        mileage: '',
        condition: '',
        phone: ''
      });
    } catch (error) {
      alert('Произошла ошибка при отправке заявки. Пожалуйста, позвоните нам: +7 984 177 15 88');
      console.error('Error sending lead:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background font-open-sans">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/img/4d19976a-c708-4ad1-bca6-33a1ebd3ad51.jpg" 
                alt="АвтоВыкуп Хабаровск" 
                className="h-10 w-10 rounded-lg object-cover"
              />
              <div>
                <h1 className="font-roboto font-bold text-xl text-gray-900">АвтоВыкуп27</h1>
                <p className="text-xs text-gray-600">Хабаровский край</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Услуги</a>
              <a href="#evaluation" className="text-gray-700 hover:text-primary transition-colors">Оценка</a>
              <a href="#process" className="text-gray-700 hover:text-primary transition-colors">Процесс</a>
              <a href="#advantages" className="text-gray-700 hover:text-primary transition-colors">Преимущества</a>
              <a href="#contacts" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
              <a href="tel:+79841771588" onClick={() => {
                if (typeof window !== 'undefined' && (window as any).ym) {
                  (window as any).ym(104279599, 'reachGoal', 'PHONE_CLICK');
                }
              }}>
                <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
                  <Icon name="Phone" className="w-4 h-4" />
                  Заказать звонок
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
            >
              <Icon name="Menu" className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-primary">Услуги</a>
                <a href="#evaluation" className="block px-3 py-2 text-gray-700 hover:text-primary">Оценка</a>
                <a href="#process" className="block px-3 py-2 text-gray-700 hover:text-primary">Процесс</a>
                <a href="#advantages" className="block px-3 py-2 text-gray-700 hover:text-primary">Преимущества</a>
                <a href="#contacts" className="block px-3 py-2 text-gray-700 hover:text-primary">Контакты</a>
                <div className="px-3 py-2">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).ym) {
                        (window as any).ym(104279599, 'reachGoal', 'PHONE_CLICK');
                      }
                      window.location.href = 'tel:+79841771588';
                    }}
                  >
                    +7 984-177-15-88
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-white to-secondary/5 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjNmNGY2IiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KPHN2Zz4=')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-secondary text-white">Работаем с 2015 года</Badge>
                <h1 className="font-roboto font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
                  Срочный выкуп авто по 
                  <span className="text-primary"> всему Хабаровскому краю</span> за 15 минут
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Честная оценка, быстрая сделка, моментальная выплата. 
                  Работаем в Хабаровске, Комсомольске-на-Амуре, Амурске, Советской Гавани, Бикине, Вяземском и во всех населённых пунктах края. Выезжаем в любой район!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15 мин</div>
                  <div className="text-sm text-gray-600">Оценка авто</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2000+</div>
                  <div className="text-sm text-gray-600">Выкупленных авто</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-gray-600">Честных сделок</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8" onClick={() => document.getElementById('evaluation')?.scrollIntoView({behavior: 'smooth'})}>
                  <Icon name="Calculator" className="w-5 h-5 mr-2" />
                  Оценить автомобиль
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => document.getElementById('contacts')?.scrollIntoView({behavior: 'smooth'})}>
                  <Icon name="Phone" className="w-5 h-5 mr-2" />
                  Связаться с нами
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/img/16066aa0-c88b-44a4-b8e8-ddbed0412266.jpg" 
                  alt="Профессиональная оценка автомобилей" 
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover mx-0"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Evaluation Form */}
      <section id="evaluation" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-roboto font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Бесплатная онлайн оценка авто в Хабаровске
            </h2>
            <p className="text-lg text-gray-600">
              Получите предварительную оценку за 2 минуты. Окончательная цена после осмотра.
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <CardContent className="p-0">
              <form onSubmit={handleEvaluationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Марка автомобиля
                    </label>
                    <BrandSelect 
                      value={evaluationForm.brand}
                      onValueChange={(value) => setEvaluationForm({...evaluationForm, brand: value, model: ''})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Модель
                    </label>
                    <ModelSelect 
                      brand={evaluationForm.brand}
                      value={evaluationForm.model}
                      onValueChange={(value) => setEvaluationForm({...evaluationForm, model: value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Год выпуска
                    </label>
                    <YearSelect 
                      value={evaluationForm.year}
                      onValueChange={(value) => setEvaluationForm({...evaluationForm, year: value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Пробег (км) <span className="text-gray-400 text-xs">(необязательно)</span>
                    </label>
                    <Input 
                      placeholder="Например: 120000" 
                      value={evaluationForm.mileage}
                      onChange={(e) => setEvaluationForm({...evaluationForm, mileage: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Состояние
                    </label>
                    <Select onValueChange={(value) => setEvaluationForm({...evaluationForm, condition: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите состояние" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Отличное</SelectItem>
                        <SelectItem value="good">Хорошее</SelectItem>
                        <SelectItem value="fair">Удовлетворительное</SelectItem>
                        <SelectItem value="poor">Требует ремонта</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <Input 
                      placeholder="+7 (XXX) XXX-XX-XX" 
                      value={evaluationForm.phone}
                      onChange={(e) => setEvaluationForm({...evaluationForm, phone: e.target.value})}
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                  <Icon name="Calculator" className="w-5 h-5 mr-2" />
                  Получить оценку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-roboto font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Наши услуги
            </h2>
            <p className="text-lg text-gray-600">
              Полный спектр услуг по выкупу автомобилей в Хабаровском крае
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "Car",
                title: "Выкуп легковых авто",
                description: "Покупаем легковые автомобили любых марок и годов выпуска"
              },
              {
                icon: "Truck", 
                title: "Выкуп грузовиков",
                description: "Выкуп коммерческого транспорта и грузовых автомобилей"
              },
              {
                icon: "Wrench",
                title: "Выкуп битых авто",
                description: "Покупаем автомобили после ДТП в любом состоянии"
              },
              {
                icon: "FileText",
                title: "Выкуп без документов",
                description: "Помогаем с оформлением документов и выкупаем авто"
              },
              {
                icon: "CreditCard",
                title: "Выкуп кредитных авто",
                description: "Выкупаем автомобили находящиеся в залоге у банка"
              },
              {
                icon: "Clock",
                title: "Срочный выкуп",
                description: "Быстрая оценка и выплата в течение одного дня"
              }
            ].map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={service.icon as any} className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-roboto font-semibold text-xl text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-roboto font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Как происходит выкуп
            </h2>
            <p className="text-lg text-gray-600">
              Простой и понятный процесс от звонка до получения денег
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Звонок или заявка",
                description: "Оставьте заявку на сайте или позвоните нам"
              },
              {
                step: "02", 
                title: "Осмотр автомобиля",
                description: "Наш эксперт приезжает для оценки вашего авто"
              },
              {
                step: "03",
                title: "Предложение цены",
                description: "Озвучиваем окончательную стоимость"
              },
              {
                step: "04",
                title: "Оформление сделки",
                description: "Подписываем договор и выплачиваем деньги"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gray-300 transform -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="font-roboto font-semibold text-xl text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-roboto font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              География работы
            </h2>
            <p className="text-lg text-gray-600">
              Выкупаем автомобили по всему Хабаровскому краю. Выезжаем в любой район!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Cities List */}
            <div className="space-y-6">
              <h3 className="font-roboto font-semibold text-2xl text-gray-900 mb-6">
                Основные города и районы
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Хабаровск", status: "Работаем" },
                  { name: "Комсомольск-на-Амуре", status: "Работаем" },
                  { name: "Амурск", status: "Работаем" },
                  { name: "Советская Гавань", status: "Работаем" },
                  { name: "Бикин", status: "Работаем" },
                  { name: "Вяземский", status: "Работаем" },
                  { name: "Николаевск-на-Амуре", status: "Работаем" },
                  { name: "Ванино", status: "Работаем" },
                  { name: "Переяславка", status: "Работаем" },
                  { name: "Хабаровский район", status: "Работаем" },
                  { name: "Комсомольский район", status: "Работаем" },
                  { name: "Все населённые пункты края", status: "Выезжаем" }
                ].map((city, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon name="MapPin" className="w-5 h-5 text-primary" />
                        <span className="font-medium text-gray-900">{city.name}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <Icon name="Check" className="w-3 h-3 mr-1" />
                        {city.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Car" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-roboto font-semibold text-xl text-gray-900 mb-2">
                        Бесплатный выезд эксперта
                      </h4>
                      <p className="text-gray-600">
                        Наш специалист приедет к вам в любую точку Хабаровского края для оценки автомобиля. Выезд абсолютно бесплатный!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-roboto font-semibold text-xl text-gray-900 mb-2">
                        Работаем по всему краю
                      </h4>
                      <p className="text-gray-600">
                        От Хабаровска до самых отдалённых посёлков и сёл. Выкупаем автомобили в любом районе края без дополнительных комиссий.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-roboto font-semibold text-xl text-gray-900 mb-2">
                        Быстрый выезд
                      </h4>
                      <p className="text-gray-600">
                        Выезжаем в день обращения. В крупные города края — в течение 2-4 часов, в отдалённые районы — согласуем время удобное для вас.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-primary/20">
                    <p className="text-center text-gray-700 font-medium mb-4">
                      Нет вашего города в списке? Звоните!
                    </p>
                    <a href="tel:+79841771588">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6">
                        <Icon name="Phone" className="w-5 h-5 mr-2" />
                        +7 984 177-15-88
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-roboto font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Наши преимущества
            </h2>
            <p className="text-lg text-gray-600">
              Почему более 2000 клиентов выбрали именно нас
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "Shield",
                title: "Честная оценка",
                description: "Рыночная стоимость без скрытых комиссий и доплат"
              },
              {
                icon: "Zap",
                title: "Быстро",
                description: "Оценка за 15 минут, выплата в день обращения"
              },
              {
                icon: "MapPin", 
                title: "По всему краю",
                description: "Работаем во всех районах Хабаровского края"
              },
              {
                icon: "FileCheck",
                title: "Все документы",
                description: "Берём на себя оформление всех документов"
              },
              {
                icon: "DollarSign",
                title: "Лучшая цена",
                description: "Предлагаем максимальную стоимость на рынке"
              },
              {
                icon: "Users",
                title: "Опыт 9+ лет",
                description: "Работаем на рынке с 2015 года, знаем все нюансы"
              }
            ].map((advantage, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name={advantage.icon as any} className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-roboto font-semibold text-xl text-gray-900">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-roboto font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Отзывы наших клиентов
            </h2>
            <p className="text-lg text-gray-600">
              Более 2000 довольных клиентов по всему Хабаровскому краю
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Сергей Михайлов",
                city: "Хабаровск",
                rating: 5,
                date: "2 недели назад",
                text: "Продал свою Toyota Camry 2015 года. Оценили честно, приехали в день обращения. Деньги получил сразу на карту. Очень доволен, рекомендую!",
                car: "Toyota Camry 2015"
              },
              {
                name: "Анна Соколова",
                city: "Комсомольск-на-Амуре",
                rating: 5,
                date: "1 месяц назад",
                text: "Битую машину после ДТП никто не хотел брать. Эти ребята приехали, осмотрели и сразу предложили адекватную цену. Спасибо за помощь!",
                car: "Nissan X-Trail 2018"
              },
              {
                name: "Дмитрий Петров",
                city: "Амурск",
                rating: 5,
                date: "3 недели назад",
                text: "Нужно было срочно продать авто для переезда. Позвонил утром, к обеду уже приехал оценщик. Вечером деньги были на руках. Очень быстро!",
                car: "Mazda 6 2017"
              },
              {
                name: "Елена Иванова",
                city: "Советская Гавань",
                rating: 5,
                date: "2 месяца назад",
                text: "Живу в Советской Гавани, думала никто не приедет так далеко. Приехали без проблем! Выкупили мою Honda за хорошую цену. Молодцы!",
                car: "Honda CR-V 2016"
              },
              {
                name: "Александр Ким",
                city: "Бикин",
                rating: 5,
                date: "1 месяц назад",
                text: "Кредитный автомобиль выкупили без проблем. Помогли со всеми документами и расчётом с банком. Профессионалы своего дела!",
                car: "Hyundai Solaris 2019"
              },
              {
                name: "Владимир Сидоров",
                city: "Хабаровск",
                rating: 5,
                date: "3 недели назад",
                text: "Сравнивал предложения от разных компаний. Здесь дали самую высокую цену и без всяких комиссий. Сделка прошла быстро и честно.",
                car: "Subaru Outback 2014"
              }
            ].map((review, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-roboto font-semibold text-lg text-gray-900">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Icon name="MapPin" className="w-3 h-3" />
                        {review.city}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    "{review.text}"
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Icon name="Car" className="w-4 h-4 text-primary" />
                      <span>{review.car}</span>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-0">
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">4.9</div>
                    <div className="flex gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name="Star" className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="h-16 w-px bg-gray-300"></div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">2000+</div>
                    <div className="text-sm text-gray-600">Довольных клиентов</div>
                  </div>
                  <div className="h-16 w-px bg-gray-300"></div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">9 лет</div>
                    <div className="text-sm text-gray-600">На рынке</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-roboto font-bold text-3xl lg:text-4xl mb-4">
              Контакты
            </h2>
            <p className="text-lg text-gray-300">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-roboto font-semibold text-2xl mb-6">Свяжитесь с нами</h3>
                <div className="space-y-6">
                  <a href="tel:+79841771588" className="flex items-center gap-4 group hover:transform hover:translate-x-2 transition-all duration-200" onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).ym) {
                      (window as any).ym(104279599, 'reachGoal', 'PHONE_CLICK');
                    }
                  }}>
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/90">
                      <Icon name="Phone" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Телефон</div>
                      <div className="text-xl font-semibold text-primary group-hover:text-primary/80">+7 984 177 15 88</div>
                    </div>
                  </a>

                  <a href="https://wa.me/79841771588" target="_blank" className="flex items-center gap-4 group hover:transform hover:translate-x-2 transition-all duration-200" onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).ym) {
                      (window as any).ym(104279599, 'reachGoal', 'WHATSAPP_CLICK');
                    }
                  }}>
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600">
                      <Icon name="MessageCircle" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">WhatsApp</div>
                      <div className="text-lg group-hover:text-primary">+7 984 177 15 88</div>
                    </div>
                  </a>

                  <a href="https://t.me/Avtovykupkhb27" target="_blank" className="flex items-center gap-4 group hover:transform hover:translate-x-2 transition-all duration-200" onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).ym) {
                      (window as any).ym(104279599, 'reachGoal', 'TELEGRAM_CLICK');
                    }
                  }}>
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600">
                      <Icon name="Send" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Telegram</div>
                      <div className="text-lg group-hover:text-primary">@Avtovykupkhb27</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name="MapPin" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Адрес</div>
                      <div className="text-lg">Хабаровск и Хабаровский край</div>
                      <div className="text-sm text-gray-400">Выезжаем во все районы</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Режим работы</div>
                      <div className="text-lg">Пн-Вс: 08:00 - 20:00</div>
                      <div className="text-sm text-gray-400">Звонки принимаем круглосуточно</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="font-roboto font-semibold text-2xl mb-6">Мы на карте</h3>
              <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=135.083800%2C48.482700&z=11&l=map&pt=135.083800,48.482700,pm2rdm"
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: 'relative' }}
                  title="Карта Хабаровска"
                ></iframe>
              </div>
              <p className="text-sm text-gray-400 mt-4 text-center">
                <Icon name="MapPin" className="w-4 h-4 inline mr-1" />
                Работаем по всему Хабаровску и области — выезжаем к вам!
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2025 АвтоВыкуп Хабаровск. Все права защищены.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;