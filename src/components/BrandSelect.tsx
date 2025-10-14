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

const carBrands = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", 
  "Cadillac", "Changan", "Chery", "Chevrolet", "Chrysler", "Citroen", "Dacia", "Daewoo",
  "Daihatsu", "Datsun", "Dodge", "FAW", "Ferrari", "Fiat", "Ford", "Foton", "Geely",
  "Genesis", "GMC", "Great Wall", "Haval", "Honda", "Hummer", "Hyundai", "Infiniti",
  "Isuzu", "Jaguar", "Jeep", "Kia", "Lada", "Lamborghini", "Lancia", "Land Rover",
  "Lexus", "Lifan", "Lincoln", "Lotus", "Maserati", "Maybach", "Mazda", "McLaren",
  "Mercedes-Benz", "MG", "Mini", "Mitsubishi", "Nissan", "Opel", "Peugeot", "Pontiac",
  "Porsche", "RAM", "Renault", "Rolls-Royce", "Saab", "Seat", "Skoda", "Smart",
  "SsangYong", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo", "УАЗ",
  "ГАЗ", "ЗАЗ", "Москвич", "Другая"
];

interface BrandSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function BrandSelect({ value, onValueChange }: BrandSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12"
        >
          {value || "Выберите марку"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Поиск марки..." />
          <CommandList>
            <CommandEmpty>Марка не найдена.</CommandEmpty>
            <CommandGroup>
              {carBrands.map((brand) => (
                <CommandItem
                  key={brand}
                  value={brand}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value === brand ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {brand}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
