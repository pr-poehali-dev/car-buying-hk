import { useState, useEffect } from 'react';
import { getCityFromUrl, defaultCity } from '@/data/cities';

export function useCityDetection() {
  const [currentCity, setCurrentCity] = useState<string>(defaultCity);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const detectCity = async () => {
      const urlCity = getCityFromUrl();
      
      if (urlCity !== defaultCity) {
        setCurrentCity(urlCity);
        setIsDetecting(false);
        return;
      }

      try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        
        if (!response.ok) {
          throw new Error('GeoJS API failed');
        }
        
        const data = await response.json();
        
        const cityMap: { [key: string]: string } = {
          'Khabarovsk': 'khabarovsk',
          'Хабаровск': 'khabarovsk',
          'Komsomolsk-on-Amur': 'komsomolsk',
          'Komsomolsk': 'komsomolsk',
          'Комсомольск-на-Амуре': 'komsomolsk',
          'Amursk': 'amursk',
          'Амурск': 'amursk',
          'Sovetskaya Gavan': 'sovetskaya-gavan',
          'Советская Гавань': 'sovetskaya-gavan',
          'Bikin': 'bikin',
          'Бикин': 'bikin',
          'Vyazemsky': 'vyazemsky',
          'Вяземский': 'vyazemsky'
        };

        const detectedCity = cityMap[data.city] || defaultCity;
        setCurrentCity(detectedCity);
        
        console.log('City detected:', data.city, '→', detectedCity);
      } catch (error) {
        console.log('City auto-detection unavailable, using default');
        setCurrentCity(defaultCity);
      } finally {
        setIsDetecting(false);
      }
    };

    detectCity();
  }, []);

  return { currentCity, isDetecting };
}
