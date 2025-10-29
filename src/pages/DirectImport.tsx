import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Alert, AlertDescription } from '@/components/ui/alert';

function DirectImport() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const campaigns = [
    {
      id: 'bitye',
      title: 'Выкуп битых авто',
      description: 'Кампания для запросов про битые авто после ДТП',
      icon: 'Car',
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 'kredit',
      title: 'Выкуп кредитных авто',
      description: 'Кампания для запросов про кредитные автомобили',
      icon: 'CreditCard',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'srochno',
      title: 'Срочный выкуп',
      description: 'Кампания для срочных запросов',
      icon: 'Zap',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  const createCampaign = async (campaignType: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('YOUR_FUNCTION_URL_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campaignType })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.message || 'Ошибка создания кампании');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Импорт объявлений в Яндекс.Директ
          </h1>
          <p className="text-gray-600">
            Автоматическое создание рекламных кампаний на основе готовых шаблонов
          </p>
        </div>

        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <Icon name="AlertCircle" className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Icon name="CheckCircle" className="w-5 h-5" />
                Кампания создана успешно!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">ID кампании:</p>
                <p className="font-mono font-bold text-lg">{result.campaignId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Название:</p>
                <p className="font-semibold">{result.campaignName}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Заголовки для объявлений:</h3>
                <ul className="space-y-1 text-sm">
                  {result.headlines?.map((headline: string, idx: number) => (
                    <li key={idx} className="text-gray-700">• {headline}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Тексты объявлений:</h3>
                {result.texts?.map((text: string, idx: number) => (
                  <p key={idx} className="text-sm text-gray-700 mb-2">{text}</p>
                ))}
              </div>
              <Alert>
                <Icon name="Info" className="h-4 w-4" />
                <AlertDescription>
                  Кампания создана в Яндекс.Директ. Теперь зайдите в интерфейс Директа и добавьте объявления вручную, используя заголовки и тексты выше.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className={`${campaign.color} border-2`}>
              <CardHeader>
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                  <Icon name={campaign.icon as any} className="w-6 h-6 text-gray-700" />
                </div>
                <CardTitle>{campaign.title}</CardTitle>
                <CardDescription>{campaign.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => createCampaign(campaign.id)}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Создание...
                    </>
                  ) : (
                    <>
                      <Icon name="Plus" className="w-4 h-4 mr-2" />
                      Создать кампанию
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Инструкция по использованию</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Добавьте токен Яндекс.Директ</h3>
                <p className="text-sm text-gray-600">
                  Если ещё не добавили — получите токен на oauth.yandex.ru и добавьте в секреты проекта
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Нажмите "Создать кампанию"</h3>
                <p className="text-sm text-gray-600">
                  Выберите тип кампании и система автоматически создаст её в вашем аккаунте Директа
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Добавьте объявления</h3>
                <p className="text-sm text-gray-600">
                  Зайдите в интерфейс Яндекс.Директ и добавьте объявления в созданную кампанию, используя готовые заголовки и тексты
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <a href="/" className="text-primary hover:underline">
            ← Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
}

export default DirectImport;
