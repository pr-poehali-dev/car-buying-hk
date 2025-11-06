export interface CityData {
  id: string;
  name: string;
  nameGenitive: string;
  namePrepositional: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  workingHours: string;
}

export const cities: Record<string, CityData> = {
  khabarovsk: {
    id: 'khabarovsk',
    name: 'Хабаровск',
    nameGenitive: 'Хабаровска',
    namePrepositional: 'Хабаровске',
    region: 'Хабаровский край',
    coordinates: {
      lat: 48.4827,
      lng: 135.0838
    },
    phone: '+7 984 177-15-88',
    workingHours: 'Пн-Вс: 08:00 - 20:00'
  },
  komsomolsk: {
    id: 'komsomolsk',
    name: 'Комсомольск-на-Амуре',
    nameGenitive: 'Комсомольска-на-Амуре',
    namePrepositional: 'Комсомольске-на-Амуре',
    region: 'Хабаровский край',
    coordinates: {
      lat: 50.5500,
      lng: 137.0097
    },
    phone: '+7 984 177-15-88',
    workingHours: 'Пн-Вс: 08:00 - 20:00'
  },
  amursk: {
    id: 'amursk',
    name: 'Амурск',
    nameGenitive: 'Амурска',
    namePrepositional: 'Амурске',
    region: 'Хабаровский край',
    coordinates: {
      lat: 50.2167,
      lng: 136.9000
    },
    phone: '+7 984 177-15-88',
    workingHours: 'Пн-Вс: 08:00 - 20:00'
  },
  'sovetskaya-gavan': {
    id: 'sovetskaya-gavan',
    name: 'Советская Гавань',
    nameGenitive: 'Советской Гавани',
    namePrepositional: 'Советской Гавани',
    region: 'Хабаровский край',
    coordinates: {
      lat: 48.9667,
      lng: 140.2833
    },
    phone: '+7 984 177-15-88',
    workingHours: 'Пн-Вс: 08:00 - 20:00'
  },
  bikin: {
    id: 'bikin',
    name: 'Бикин',
    nameGenitive: 'Бикина',
    namePrepositional: 'Бикине',
    region: 'Хабаровский край',
    coordinates: {
      lat: 46.8167,
      lng: 134.2667
    },
    phone: '+7 984 177-15-88',
    workingHours: 'Пн-Вс: 08:00 - 20:00'
  },
  vyazemsky: {
    id: 'vyazemsky',
    name: 'Вяземский',
    nameGenitive: 'Вяземского',
    namePrepositional: 'Вяземском',
    region: 'Хабаровский край',
    coordinates: {
      lat: 47.5333,
      lng: 134.7500
    },
    phone: '+7 984 177-15-88',
    workingHours: 'Пн-Вс: 08:00 - 20:00'
  }
};

export const defaultCity = 'khabarovsk';

export function getCityById(cityId: string): CityData {
  return cities[cityId] || cities[defaultCity];
}

export function getCityFromUrl(): string {
  if (typeof window === 'undefined') return defaultCity;
  
  const path = window.location.pathname;
  const match = path.match(/^\/(khabarovsk|komsomolsk|amursk|sovetskaya-gavan|bikin|vyazemsky)/);
  
  return match ? match[1] : defaultCity;
}
