import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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
    
    // Format message for WhatsApp
    const message = `🚗 ЗАЯВКА НА ОЦЕНКУ АВТОМОБИЛЯ

📋 Детали:
• Марка: ${evaluationForm.brand || 'Не указана'}
• Модель: ${evaluationForm.model || 'Не указана'}
• Год: ${evaluationForm.year || 'Не указан'}
• Пробег: ${evaluationForm.mileage || 'Не указан'} км
• Состояние: ${evaluationForm.condition || 'Не указано'}

📞 Телефон клиента: ${evaluationForm.phone}`;
    
    // Send via WhatsApp
    const whatsappUrl = `https://wa.me/79841771588?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Yandex Metrika goal tracking - WhatsApp click
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(104279599, 'reachGoal', 'WHATSAPP_CLICK');
    }
    
    // Show success message
    alert('Спасибо! Ваша заявка отправлена через WhatsApp. Мы свяжемся с вами в течение 15 минут для уточнения деталей и предложения цены.');
    
    // Reset form
    setEvaluationForm({
      brand: '',
      model: '',
      year: '',
      mileage: '',
      condition: '',
      phone: ''
    });
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
                <h1 className="font-roboto font-bold text-xl text-gray-900">АвтоВыкуп</h1>
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
                  Срочный выкуп авто в 
                  <span className="text-primary"> Хабаровске</span> за 15 минут
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Честная оценка, быстрая сделка, моментальная выплата. 
                  Выкупаем авто любого года и состояния по всему Хабаровскому краю.
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
                    <Select onValueChange={(value) => setEvaluationForm({...evaluationForm, brand: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите марку" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="nissan">Nissan</SelectItem>
                        <SelectItem value="mazda">Mazda</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="subaru">Subaru</SelectItem>
                        <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                        <SelectItem value="other">Другая</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Модель
                    </label>
                    <Input 
                      placeholder="Например: Camry" 
                      value={evaluationForm.model}
                      onChange={(e) => setEvaluationForm({...evaluationForm, model: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Год выпуска
                    </label>
                    <Select onValueChange={(value) => setEvaluationForm({...evaluationForm, year: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите год" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Пробег (км)
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

      {/* Advantages Section */}
      <section id="advantages" className="py-20">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="tel:+79841771588" className="text-center block group hover:transform hover:scale-105 transition-all duration-200" onClick={() => {
              if (typeof window !== 'undefined' && (window as any).ym) {
                (window as any).ym(104279599, 'reachGoal', 'PHONE_CLICK');
              }
            }}>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/90">
                <Icon name="Phone" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-roboto font-semibold text-xl mb-4 group-hover:text-primary transition-colors">Телефон</h3>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">+7 984 177 15 88</div>
                <div className="text-gray-300">Круглосуточно</div>
              </div>
            </a>

            <a href="https://wa.me/79841771588" target="_blank" className="text-center block group hover:transform hover:scale-105 transition-all duration-200" onClick={() => {
              if (typeof window !== 'undefined' && (window as any).ym) {
                (window as any).ym(104279599, 'reachGoal', 'WHATSAPP_CLICK');
              }
            }}>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/90">
                <Icon name="MessageCircle" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-roboto font-semibold text-xl mb-4 group-hover:text-primary transition-colors">WhatsApp</h3>
              <div className="space-y-2">
                <div className="text-lg group-hover:text-primary transition-colors">+7 984 177 15 88</div>
                <div className="text-gray-300">Быстрая связь и консультация</div>
              </div>
            </a>

            <a href="https://t.me/Avtovykupkhb27" target="_blank" className="text-center block group hover:transform hover:scale-105 transition-all duration-200" onClick={() => {
              if (typeof window !== 'undefined' && (window as any).ym) {
                (window as any).ym(104279599, 'reachGoal', 'TELEGRAM_CLICK');
              }
            }}>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/90">
                <Icon name="MessageCircle" className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-roboto font-semibold text-xl mb-4 group-hover:text-primary transition-colors">Telegram</h3>
              <div className="space-y-2">
                <div className="text-lg group-hover:text-primary transition-colors">@Avtovykupkhb27</div>
                <div className="text-gray-300">Ответим моментально</div>
              </div>
            </a>
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