import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: number;
  phone: string;
  city: string;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  form_type: string;
  created_at: string;
}

interface Statistics {
  total: number;
  today: number;
  period_days: number;
  by_source: Record<string, number>;
  by_day: Array<{ date: string; count: number }>;
}

interface LeadsData {
  leads: Lead[];
  statistics: Statistics;
}

function LeadsAdmin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<LeadsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('7');
  const { toast } = useToast();

  const fetchLeads = async (pwd: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/e621e5a9-5629-452b-a27d-7ad5786a3d7b?period=${period}`,
        {
          headers: {
            'X-Admin-Password': pwd
          }
        }
      );

      if (response.status === 401) {
        toast({
          title: 'Неверный пароль',
          description: 'Проверьте правильность пароля',
          variant: 'destructive'
        });
        setIsAuthenticated(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
      setIsAuthenticated(true);
      
      // Save password to session
      sessionStorage.setItem('adminPassword', pwd);
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить данные',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads(password);
  };

  const handleRefresh = () => {
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      fetchLeads(savedPassword);
    }
  };

  useEffect(() => {
    // Try to restore session
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      fetchLeads(savedPassword);
    }
  }, [period]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Icon name="Lock" className="w-6 h-6" />
              Админ-панель статистики
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Пароль</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Проверка...' : 'Войти'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Статистика заявок</h1>
            <p className="text-gray-600">АвтоВыкуп Хабаровск</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="1">За сегодня</option>
              <option value="7">За неделю</option>
              <option value="30">За месяц</option>
              <option value="90">За 3 месяца</option>
            </select>
            <Button onClick={handleRefresh} variant="outline">
              <Icon name="RefreshCw" className="w-4 h-4 mr-2" />
              Обновить
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Всего заявок</p>
                      <p className="text-3xl font-bold text-primary">{data.statistics.total}</p>
                    </div>
                    <Icon name="Users" className="w-12 h-12 text-primary opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Сегодня</p>
                      <p className="text-3xl font-bold text-green-600">{data.statistics.today}</p>
                    </div>
                    <Icon name="TrendingUp" className="w-12 h-12 text-green-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Период</p>
                      <p className="text-3xl font-bold text-blue-600">{data.statistics.period_days} дн</p>
                    </div>
                    <Icon name="Calendar" className="w-12 h-12 text-blue-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sources Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>По источникам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(data.statistics.by_source).map(([source, count]) => (
                      <div key={source} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{source}</span>
                        <Badge>{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>По дням</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {data.statistics.by_day.map((day) => (
                      <div key={day.date} className="flex items-center justify-between text-sm">
                        <span>{new Date(day.date).toLocaleDateString('ru-RU')}</span>
                        <Badge variant="outline">{day.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leads Table */}
            <Card>
              <CardHeader>
                <CardTitle>Все заявки ({data.leads.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Дата</th>
                        <th className="text-left py-3 px-4">Телефон</th>
                        <th className="text-left py-3 px-4">Город</th>
                        <th className="text-left py-3 px-4">Источник</th>
                        <th className="text-left py-3 px-4">Тип формы</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.leads.map((lead) => (
                        <tr key={lead.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{formatDate(lead.created_at)}</td>
                          <td className="py-3 px-4 font-medium">{lead.phone}</td>
                          <td className="py-3 px-4 text-sm">{lead.city}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="text-xs">
                              {lead.source}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm capitalize">{lead.form_type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

export default LeadsAdmin;
