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

const popularBrands = [
  "Toyota", "Nissan", "Honda", "Mazda", "Subaru", "Mitsubishi",
  "Hyundai", "Kia", "BMW", "Mercedes-Benz", "Audi", "Volkswagen",
  "Lexus", "Ford", "Chevrolet", "Renault", "Skoda", "Lada"
];

const otherBrands = [
  "Acura", "Alfa Romeo", "Aston Martin", "Bentley", "Bugatti", "Buick",
  "Cadillac", "Changan", "Chery", "Chrysler", "Citroen", "Dacia", "Daewoo",
  "Daihatsu", "Datsun", "Dodge", "FAW", "Ferrari", "Fiat", "Foton", "Geely",
  "Genesis", "GMC", "Great Wall", "Haval", "Hummer", "Infiniti",
  "Isuzu", "Jaguar", "Jeep", "Lamborghini", "Lancia", "Land Rover",
  "Lifan", "Lincoln", "Lotus", "Maserati", "Maybach", "McLaren",
  "MG", "Mini", "Opel", "Peugeot", "Pontiac",
  "Porsche", "RAM", "Rolls-Royce", "Saab", "Seat", "Smart",
  "SsangYong", "Suzuki", "Tesla", "Volvo", "УАЗ",
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
            <CommandGroup heading="Популярные марки">
              {popularBrands.map((brand) => (
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
            <CommandGroup heading="Другие марки">
              {otherBrands.map((brand) => (
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