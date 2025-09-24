import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CMSData {
  hero: {
    title: string;
    subtitle: string;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  advantages: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  contacts: {
    phone: string;
    whatsapp: string;
    telegram: string;
  };
}

const defaultData: CMSData = {
  hero: {
    title: "Срочный выкуп авто в Хабаровске за 15 минут",
    subtitle: "Честная оценка, быстрая сделка, моментальная выплата. Выкупаем авто любого года и состояния по всему Хабаровскому краю."
  },
  services: [
    {
      id: "1",
      title: "Выкуп легковых авто",
      description: "Покупаем легковые автомобили любых марок и годов выпуска. Быстрая оценка и выплата.",
      icon: "Car"
    },
    {
      id: "2", 
      title: "Выкуп грузовиков",
      description: "Выкуп коммерческого транспорта: грузовики, фургоны, автобусы в любом состоянии.",
      icon: "Truck"
    },
    {
      id: "3",
      title: "Выкуп битых авто",
      description: "Покупаем автомобили после ДТП. Оценка повреждений и справедливая цена.",
      icon: "AlertTriangle"
    },
    {
      id: "4",
      title: "Выкуп без документов",
      description: "Поможем оформить сделку даже при отсутствии части документов на автомобиль.",
      icon: "FileX"
    },
    {
      id: "5",
      title: "Выкуп кредитных авто",
      description: "Выкупаем автомобили в кредите. Поможем с погашением и переоформлением.",
      icon: "CreditCard"
    },
    {
      id: "6",
      title: "Срочный выкуп",
      description: "Нужны деньги срочно? Выкупим ваш автомобиль в течение дня с моментальной оплатой.",
      icon: "Clock"
    }
  ],
  advantages: [
    {
      id: "1",
      title: "Честная оценка",
      description: "Справедливая рыночная цена без скрытых комиссий и доплат"
    },
    {
      id: "2",
      title: "Быстро",
      description: "Оценка за 15 минут, сделка в день обращения"
    },
    {
      id: "3", 
      title: "По всему краю",
      description: "Выезжаем в любую точку Хабаровского края бесплатно"
    },
    {
      id: "4",
      title: "Все документы",
      description: "Берем на себя все вопросы по переоформлению документов"
    },
    {
      id: "5",
      title: "Лучшая цена",
      description: "Предлагаем максимальную стоимость за ваш автомобиль"
    },
    {
      id: "6",
      title: "Опыт 9+ лет",
      description: "Работаем на рынке автовыкупа с 2015 года"
    }
  ],
  contacts: {
    phone: "+7 984 177 15 88",
    whatsapp: "+79841771588", 
    telegram: "@Avtovykupkhb27"
  }
};

function Admin() {
  const [data, setData] = useState<CMSData>(defaultData);
  const [activeTab, setActiveTab] = useState('hero');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('cmsData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const saveData = () => {
    localStorage.setItem('cmsData', JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateHero = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateService = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    }));
  };

  const updateAdvantage = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      advantages: prev.advantages.map(advantage => 
        advantage.id === id ? { ...advantage, [field]: value } : advantage
      )
    }));
  };

  const updateContacts = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      contacts: { ...prev.contacts, [field]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CMS Админ-панель</h1>
            <p className="text-gray-600">Управление контентом сайта АвтоВыкуп</p>
          </div>
          <div className="flex items-center gap-4">
            {saved && <Badge className="bg-green-100 text-green-800">✓ Сохранено</Badge>}
            <Button onClick={saveData} className="bg-primary hover:bg-primary/90">
              <Icon name="Save" className="w-4 h-4 mr-2" />
              Сохранить изменения
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {[
            { id: 'hero', name: 'Главная секция', icon: 'Home' },
            { id: 'services', name: 'Услуги', icon: 'Settings' },
            { id: 'advantages', name: 'Преимущества', icon: 'Star' },
            { id: 'contacts', name: 'Контакты', icon: 'Phone' }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <Icon name={tab.icon} className="w-4 h-4" />
              {tab.name}
            </Button>
          ))}
        </div>

        {/* Hero Section */}
        {activeTab === 'hero' && (
          <Card>
            <CardHeader>
              <CardTitle>Главная секция сайта</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Заголовок H1</label>
                <Input
                  value={data.hero.title}
                  onChange={(e) => updateHero('title', e.target.value)}
                  placeholder="Основной заголовок"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Подзаголовок</label>
                <Textarea
                  value={data.hero.subtitle}
                  onChange={(e) => updateHero('subtitle', e.target.value)}
                  placeholder="Описание услуг"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Services Section */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Услуги компании</h2>
              <Badge>Всего: {data.services.length}</Badge>
            </div>
            
            <div className="grid gap-4">
              {data.services.map(service => (
                <Card key={service.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name={service.icon} className="w-5 h-5" />
                      Услуга #{service.id}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Название услуги</label>
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(service.id, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Описание</label>
                      <Textarea
                        value={service.description}
                        onChange={(e) => updateService(service.id, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Иконка</label>
                      <Input
                        value={service.icon}
                        onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                        placeholder="Car, Truck, Clock..."
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Advantages Section */}
        {activeTab === 'advantages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Преимущества компании</h2>
              <Badge>Всего: {data.advantages.length}</Badge>
            </div>
            
            <div className="grid gap-4">
              {data.advantages.map(advantage => (
                <Card key={advantage.id}>
                  <CardHeader>
                    <CardTitle>Преимущество #{advantage.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Заголовок</label>
                      <Input
                        value={advantage.title}
                        onChange={(e) => updateAdvantage(advantage.id, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Описание</label>
                      <Textarea
                        value={advantage.description}
                        onChange={(e) => updateAdvantage(advantage.id, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contacts Section */}
        {activeTab === 'contacts' && (
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <Input
                  value={data.contacts.phone}
                  onChange={(e) => updateContacts('phone', e.target.value)}
                  placeholder="+7 984 177 15 88"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp (номер)</label>
                <Input
                  value={data.contacts.whatsapp}
                  onChange={(e) => updateContacts('whatsapp', e.target.value)}
                  placeholder="+79841771588"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telegram</label>
                <Input
                  value={data.contacts.telegram}
                  onChange={(e) => updateContacts('telegram', e.target.value)}
                  placeholder="@Avtovykupkhb27"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" className="w-5 h-5" />
              Инструкция по использованию CMS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• <strong>Редактирование:</strong> Измените нужные поля и нажмите "Сохранить изменения"</p>
              <p>• <strong>Иконки:</strong> Используйте названия из Lucide React (Car, Phone, Star, Clock и т.д.)</p>
              <p>• <strong>Сохранение:</strong> Данные сохраняются в браузере, обновления видны сразу</p>
              <p>• <strong>Резервная копия:</strong> Скопируйте данные из localStorage для бэкапа</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Admin;