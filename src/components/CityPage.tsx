import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { CityData } from '@/data/cities';
import Index from '@/pages/Index';

interface CityPageProps {
  city: CityData;
}

export function CityPage({ city }: CityPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [city.id]);

  const pageTitle = `Выкуп авто ${city.name} за 15 минут | Срочный выкуп автомобилей дорого 24/7 | ${city.phone}`;
  const pageDescription = `⚡ Срочный выкуп авто в ${city.namePrepositional} за 15 минут! Покупаем любые автомобили: битые, кредитные, без документов. Честная оценка, деньги сразу. Выезд по городу и району. ☎ ${city.phone}. Работаем 24/7!`;
  const pageKeywords = `выкуп авто ${city.name.toLowerCase()}, выкуп автомобилей ${city.name.toLowerCase()}, срочный выкуп авто ${city.name.toLowerCase()}, продать машину ${city.name.toLowerCase()}, выкуп машин ${city.name.toLowerCase()}, выкуп битых авто ${city.name.toLowerCase()}, выкуп кредитных авто ${city.name.toLowerCase()}, выкуп авто без документов ${city.name.toLowerCase()}, выкуп японских авто ${city.name.toLowerCase()}, срочно продать машину ${city.name.toLowerCase()}, выкуп авто дорого ${city.name.toLowerCase()}, автовыкуп ${city.name.toLowerCase()} 24/7, деньги за авто сразу ${city.name.toLowerCase()}, оценка автомобиля ${city.name.toLowerCase()}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `АвтоВыкуп27 - ${city.name}`,
    "description": `Профессиональный выкуп автомобилей в ${city.namePrepositional}. Быстрая оценка, выгодные цены, оформление за 15 минут.`,
    "url": `https://avtovikup27.ru/${city.id}`,
    "telephone": city.phone.replace(/[\s-]/g, ''),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": city.region,
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.coordinates.lat,
      "longitude": city.coordinates.lng
    },
    "openingHours": "Mo-Su 08:00-20:00",
    "priceRange": "₽₽",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": city.coordinates.lat,
        "longitude": city.coordinates.lng
      },
      "geoRadius": "50000"
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://avtovikup27.ru/${city.id}`} />
        
        <meta name="geo.placename" content={city.name} />
        <meta name="geo.position" content={`${city.coordinates.lat};${city.coordinates.lng}`} />
        <meta name="ICBM" content={`${city.coordinates.lat}, ${city.coordinates.lng}`} />
        
        <meta property="business:contact_data:street_address" content={city.name} />
        <meta property="business:contact_data:locality" content={city.name} />
        <meta property="business:contact_data:region" content={city.region} />
        
        <link rel="canonical" href={`https://avtovikup27.ru/${city.id}`} />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <Index city={city} />
    </>
  );
}
