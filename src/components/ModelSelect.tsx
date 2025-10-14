import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const carModels: Record<string, string[]> = {
  "Toyota": ["Camry", "Corolla", "RAV4", "Land Cruiser", "Prado", "Highlander", "Alphard", "Mark II", "Crown", "Vitz", "Yaris", "Aqua", "Prius", "C-HR", "Harrier", "Venza"],
  "Nissan": ["X-Trail", "Qashqai", "Murano", "Patrol", "Juke", "Teana", "Almera", "Tiida", "Note", "Pathfinder", "Navara", "Leaf", "GT-R", "350Z", "370Z"],
  "Mazda": ["3", "6", "CX-5", "CX-7", "CX-9", "Demio", "Atenza", "Axela", "MPV", "Premacy", "Tribute", "RX-7", "RX-8", "MX-5"],
  "Honda": ["CR-V", "Accord", "Civic", "Fit", "Jazz", "Odyssey", "Pilot", "HR-V", "Stepwgn", "Stream", "Freed", "Legend", "NSX"],
  "Subaru": ["Forester", "Outback", "Legacy", "Impreza", "XV", "Levorg", "WRX", "BRZ", "Tribeca"],
  "Mitsubishi": ["Outlander", "Pajero", "L200", "Lancer", "ASX", "Eclipse Cross", "Galant", "Montero", "Delica"],
  "Hyundai": ["Solaris", "Creta", "Tucson", "Santa Fe", "Elantra", "Sonata", "i30", "Accent", "ix35", "Palisade"],
  "Kia": ["Rio", "Sportage", "Sorento", "Optima", "Cerato", "Soul", "Picanto", "Seltos", "K5", "Carnival"],
  "BMW": ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X6", "X7", "1 Series", "2 Series", "4 Series", "6 Series", "8 Series", "Z4", "M3", "M5"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "A-Class", "B-Class", "CLA", "CLS", "GLA", "GLC", "GLE", "GLS", "G-Class", "ML", "GL", "GLK", "Vito", "Sprinter"],
  "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "RS3", "RS4", "RS5", "RS6"],
  "Volkswagen": ["Polo", "Jetta", "Passat", "Tiguan", "Touareg", "Golf", "Beetle", "Touran", "Transporter", "Amarok"],
  "Ford": ["Focus", "Mondeo", "Fiesta", "Kuga", "Explorer", "Edge", "EcoSport", "Fusion", "Mustang", "F-150", "Ranger"],
  "Chevrolet": ["Cruze", "Aveo", "Lacetti", "Captiva", "Tahoe", "Suburban", "Camaro", "Corvette", "Silverado", "Colorado"],
  "Lexus": ["RX", "NX", "LX", "GX", "ES", "IS", "GS", "LS", "UX", "CT"],
  "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan", "Boxster", "Cayman"],
  "Volvo": ["XC60", "XC90", "S60", "S90", "V60", "V90", "XC40"],
  "Land Rover": ["Discovery", "Range Rover", "Range Rover Sport", "Range Rover Evoque", "Defender", "Freelander"],
  "Jeep": ["Grand Cherokee", "Wrangler", "Cherokee", "Compass", "Renegade", "Patriot"],
  "Skoda": ["Octavia", "Rapid", "Superb", "Kodiaq", "Karoq", "Fabia", "Yeti"],
  "Renault": ["Duster", "Logan", "Sandero", "Kaptur", "Arkana", "Megane", "Koleos", "Fluence"],
  "Peugeot": ["308", "408", "508", "3008", "5008", "2008", "Partner", "Boxer"],
  "Citroen": ["C4", "C5", "C3", "C-Elysee", "Berlingo", "Jumper", "Grand C4 Picasso"],
  "Opel": ["Astra", "Insignia", "Corsa", "Mokka", "Zafira", "Vectra"],
  "УАЗ": ["Patriot", "Hunter", "Буханка", "Pickup"],
  "ГАЗ": ["Volga", "Sobol", "Gazel", "Next"],
  "Lada": ["Vesta", "Granta", "Kalina", "Priora", "Largus", "4x4", "Niva"],
  "default": ["Укажите в комментарии"]
};

interface ModelSelectProps {
  brand: string;
  value: string;
  onValueChange: (value: string) => void;
}

export function ModelSelect({ brand, value, onValueChange }: ModelSelectProps) {
  const [open, setOpen] = useState(false);
  
  const models = carModels[brand] || carModels["default"];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12"
          disabled={!brand}
        >
          {value || (brand ? "Выберите модель" : "Сначала выберите марку")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Поиск модели..." />
          <CommandList>
            <CommandEmpty>Модель не найдена.</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model}
                  value={model}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value === model ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {model}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
