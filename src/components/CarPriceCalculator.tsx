import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CalculatorData {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
}

const carBrands = [
  { value: 'toyota', label: 'Toyota', avgPrice: 1200000 },
  { value: 'nissan', label: 'Nissan', avgPrice: 900000 },
  { value: 'mazda', label: 'Mazda', avgPrice: 850000 },
  { value: 'honda', label: 'Honda', avgPrice: 1000000 },
  { value: 'subaru', label: 'Subaru', avgPrice: 950000 },
  { value: 'mitsubishi', label: 'Mitsubishi', avgPrice: 800000 },
  { value: 'hyundai', label: 'Hyundai', avgPrice: 750000 },
  { value: 'kia', label: 'Kia', avgPrice: 700000 },
  { value: 'lexus', label: 'Lexus', avgPrice: 2000000 },
  { value: 'other', label: 'Другая', avgPrice: 600000 }
];

const conditions = [
  { value: 'excellent', label: 'Отличное', multiplier: 1.2 },
  { value: 'good', label: 'Хорошее', multiplier: 1.0 },
  { value: 'fair', label: 'Удовлетворительное', multiplier: 0.8 },
  { value: 'poor', label: 'Требует ремонта', multiplier: 0.6 }
];

function CarPriceCalculator() {
  const [data, setData] = useState<CalculatorData>({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    condition: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState<{min: number, max: number} | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const calculatePrice = () => {
    if (!data.brand || !data.year || !data.condition) {
      return;
    }

    setIsCalculating(true);
    setShowResult(false);

    setTimeout(() => {
      const brand = carBrands.find(b => b.value === data.brand);
      const condition = conditions.find(c => c.value === data.condition);
      
      if (!brand || !condition) return;

      let basePrice = brand.avgPrice;

      const currentYear = 2024;
      const carAge = currentYear - parseInt(data.year);
      const yearDepreciation = Math.pow(0.9, carAge);
      basePrice *= yearDepreciation;

      if (data.mileage) {
        const mileageNum = parseInt(data.mileage.replace(/\D/g, ''));
        if (mileageNum > 150000) {
          basePrice *= 0.85;
        } else if (mileageNum > 100000) {
          basePrice *= 0.9;
        } else if (mileageNum > 50000) {
          basePrice *= 0.95;
        }
      }

      basePrice *= condition.multiplier;

      const minPrice = Math.round(basePrice * 0.9 / 10000) * 10000;
      const maxPrice = Math.round(basePrice * 1.1 / 10000) * 10000;

      setEstimatedPrice({ min: minPrice, max: maxPrice });
      setIsCalculating(false);
      setShowResult(true);
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU');
  };

  const scrollToEvaluationForm = () => {
    document.getElementById('evaluation')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (data.brand && data.year && data.condition) {
      calculatePrice();
    }
  }, [data.brand, data.year, data.mileage, data.condition]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Марка автомобиля *
          </label>
          <Select onValueChange={(value) => setData({...data, brand: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Выберите марку" />
            </SelectTrigger>
            <SelectContent>
              {carBrands.map(brand => (
                <SelectItem key={brand.value} value={brand.value}>
                  {brand.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Модель
          </label>
          <Input 
            placeholder="Например: Camry"
            className="h-12"
            value={data.model}
            onChange={(e) => setData({...data, model: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Год выпуска *
          </label>
          <Select onValueChange={(value) => setData({...data, year: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Выберите год" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
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
            className="h-12"
            value={data.mileage}
            onChange={(e) => setData({...data, mileage: e.target.value})}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Состояние *
          </label>
          <Select onValueChange={(value) => setData({...data, condition: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Выберите состояние" />
            </SelectTrigger>
            <SelectContent>
              {conditions.map(cond => (
                <SelectItem key={cond.value} value={cond.value}>
                  {cond.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isCalculating && (
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-lg font-medium text-gray-700">Рассчитываем стоимость...</p>
          </div>
        </Card>
      )}

      {showResult && estimatedPrice && (
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 animate-in fade-in duration-500">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">Примерная стоимость вашего автомобиля:</p>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-1">
                {formatPrice(estimatedPrice.min)} - {formatPrice(estimatedPrice.max)} ₽
              </div>
              <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                <Icon name="Info" className="w-4 h-4" />
                Окончательная цена определяется после осмотра автомобиля нашим экспертом
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <Icon name="Shield" className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Честная оценка</p>
                <p className="text-xs text-gray-500">Без скрытых комиссий</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Icon name="Clock" className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">За 15 минут</p>
                <p className="text-xs text-gray-500">Быстрая оценка</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Icon name="DollarSign" className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Деньги сразу</p>
                <p className="text-xs text-gray-500">В день обращения</p>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6"
                onClick={scrollToEvaluationForm}
              >
                <Icon name="Phone" className="w-5 h-5 mr-2" />
                Получить точную оценку от эксперта
              </Button>
            </div>
          </div>
        </Card>
      )}

      {!showResult && !isCalculating && (
        <div className="text-center text-gray-500">
          <Icon name="Calculator" className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Заполните основные поля для расчёта примерной стоимости</p>
        </div>
      )}
    </div>
  );
}

export default CarPriceCalculator;
