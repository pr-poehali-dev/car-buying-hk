import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  conditions: string[];
  brand: string;
  year: number;
  hasPhotos: boolean;
  photoFiles: File[];
  location: string;
  contactMethod: string;
  phone: string;
}

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    conditions: [],
    brand: '',
    year: 2010,
    hasPhotos: false,
    photoFiles: [],
    location: '',
    contactMethod: '',
    phone: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 5;

  const conditions = [
    'С автомобилем все в порядке, проблем нет',
    'Без документов',
    'В кредите / В залоге / В лизинге',
    'Не на учете',
    'Под разбор / На запчасти',
    'После аварии / ДТП',
    'После пожара',
    'Списанный',
    'Старый',
    'С запретами/ Под арестом',
    'С тех. проблемой / не на ходу',
    'С юридическими проблемами',
    'Утопленный',
    'Другое'
  ];

  const locations = [
    'г. Хабаровск',
    'г. Комсомольск-на-Амуре',
    'Хабаровский край'
  ];

  const contactMethods = [
    { value: 'phone', label: 'Телефон' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'viber', label: 'Viber' },
    { value: 'telegram', label: 'Telegram' }
  ];

  const handleConditionToggle = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photoFiles: Array.from(e.target.files || [])
      }));
    }
  };

  const handleNext = () => {
    if (step === 1 && formData.conditions.length === 0) {
      toast({
        title: 'Выберите хотя бы один вариант',
        variant: 'destructive'
      });
      return;
    }
    if (step === 2 && (!formData.brand || formData.brand.trim() === '')) {
      toast({
        title: 'Введите марку автомобиля',
        variant: 'destructive'
      });
      return;
    }
    if (step === 4 && !formData.location) {
      toast({
        title: 'Выберите локацию',
        variant: 'destructive'
      });
      return;
    }
    if (step === 5) {
      if (!formData.contactMethod) {
        toast({
          title: 'Выберите способ связи',
          variant: 'destructive'
        });
        return;
      }
      if (!formData.phone || formData.phone.length < 10) {
        toast({
          title: 'Введите корректный номер телефона',
          variant: 'destructive'
        });
        return;
      }
      handleSubmit();
      return;
    }
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    const leadData = {
      name: 'Заявка с калькулятора',
      phone: formData.phone,
      message: `Состояние: ${formData.conditions.join(', ')}\nМарка: ${formData.brand}\nГод: ${formData.year}\nЛокация: ${formData.location}\nСпособ связи: ${formData.contactMethod}`,
      source: 'calculator'
    };

    try {
      const response = await fetch('https://functions.poehali.dev/fd8b5a7f-5b99-4a66-b87d-9e29a8b68fd4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });

      if (response.ok) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время'
        });
        navigate('/');
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: 'Ошибка отправки заявки',
        description: 'Попробуйте позже или позвоните нам',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Расчет стоимости выкупа автомобиля</h1>
              <div className="bg-black text-white px-3 py-1 rounded-md text-sm font-medium">
                {step} / {totalSteps}
              </div>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 min-h-[400px]">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-6">
                  В каком состоянии Ваш автомобиль?<br />
                  <span className="text-sm text-gray-500 font-normal">(можно несколько вариантов)</span>
                </h2>
                <div className="space-y-3">
                  {conditions.map(condition => (
                    <div key={condition} className="flex items-center space-x-3">
                      <Checkbox
                        id={condition}
                        checked={formData.conditions.includes(condition)}
                        onCheckedChange={() => handleConditionToggle(condition)}
                      />
                      <label
                        htmlFor={condition}
                        className="text-sm cursor-pointer select-none"
                      >
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Какая марка и год выпуска?</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="brand">Введите марку автомобиля *</Label>
                  <Input
                    id="brand"
                    type="text"
                    placeholder="Например: Toyota, BMW, Lada"
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    className="text-base"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Год выпуска</Label>
                  <input
                    type="range"
                    min="1992"
                    max="2024"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>1992</span>
                    <span className="font-bold text-black text-lg">{formData.year}</span>
                    <span>2024</span>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Есть фотографии автомобиля?</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-black transition-colors">
                  <input
                    type="file"
                    id="photos"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="photos" className="cursor-pointer">
                    <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="text-sm font-medium mb-2">Выберите файлы</p>
                    <p className="text-xs text-gray-500">
                      {formData.photoFiles.length > 0 
                        ? `Выбрано файлов: ${formData.photoFiles.length}`
                        : 'или перетащите их сюда'}
                    </p>
                  </label>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="no-photos"
                      checked={formData.hasPhotos === false && formData.photoFiles.length === 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({ ...prev, hasPhotos: false, photoFiles: [] }));
                        }
                      }}
                    />
                    <label htmlFor="no-photos" className="text-sm cursor-pointer">
                      Фото нет
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="photos-later"
                      checked={formData.hasPhotos === false && formData.photoFiles.length === 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({ ...prev, hasPhotos: false, photoFiles: [] }));
                        }
                      }}
                    />
                    <label htmlFor="photos-later" className="text-sm cursor-pointer">
                      Фото могу отправить позже
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Где находится автомобиль?</h2>
                
                <RadioGroup value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                  {locations.map(location => (
                    <div key={location} className="flex items-center space-x-3">
                      <RadioGroupItem value={location} id={location} />
                      <label htmlFor={location} className="cursor-pointer">
                        {location}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Нам подходит Ваш автомобиль. Как сообщить Вам сумму выкупа?
                </h2>
                
                <RadioGroup value={formData.contactMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, contactMethod: value }))}>
                  {contactMethods.map(method => (
                    <div key={method.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={method.value} id={method.value} />
                      <label htmlFor={method.value} className="cursor-pointer">
                        {method.label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="space-y-2">
                  <Label htmlFor="phone">Номер *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="text-base"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
            </Button>

            <Button
              onClick={handleNext}
              className="bg-black hover:bg-gray-800 text-white px-8"
            >
              {step === totalSteps ? 'Отправить' : 'Далее'}
            </Button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            или нажмите Enter
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
