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
  "Toyota": ["4Runner", "Alphard", "Aqua", "Auris", "Avalon", "Avensis", "bB", "C-HR", "Caldina", "Camry", "Carina", "Celica", "Corolla", "Corona", "Crown", "Estima", "FJ Cruiser", "Fielder", "Fortuner", "Funcargo", "Harrier", "Highlander", "Hiace", "Hilux", "iQ", "Ipsum", "ist", "Land Cruiser", "Land Cruiser Prado", "Mark II", "Mark X", "Noah", "Passo", "Picnic", "Platz", "Previa", "Prius", "Probox", "RAV4", "Rush", "Sequoia", "Sienna", "Spacio", "Sprinter", "Succeed", "Supra", "Tacoma", "Tundra", "Vanguard", "Vellfire", "Venza", "Verso", "Vios", "Vista", "Vitz", "Voxy", "Wish", "Yaris"],
  "Nissan": ["350Z", "370Z", "Almera", "Altima", "Armada", "Avenir", "Bassara", "Bluebird", "Caravan", "Cefiro", "Cube", "Elgrand", "Fuga", "GT-R", "Juke", "Kicks", "Lafesta", "Largo", "Laurel", "Leaf", "Liberty", "March", "Maxima", "Micra", "Murano", "Navara", "Note", "NP300", "NV200", "Pathfinder", "Patrol", "Presage", "Primera", "Pulsar", "Qashqai", "Quest", "R'nessa", "Rogue", "Safari", "Sentra", "Serena", "Skyline", "Sunny", "Sylphy", "Teana", "Terrano", "Tiida", "Titan", "Vanette", "Versa", "Wingroad", "X-Trail", "Xterra"],
  "Mazda": ["2", "3", "5", "6", "323", "626", "929", "Atenza", "Axela", "Biante", "Bongo", "BT-50", "Capella", "Carol", "Cronos", "CX-3", "CX-30", "CX-4", "CX-5", "CX-7", "CX-8", "CX-9", "CX-60", "CX-90", "Demio", "Efini", "Familia", "Flair", "Lantis", "Laputa", "Levante", "MPV", "MX-5", "MX-6", "MX-30", "Premacy", "Proceed", "Protege", "RX-7", "RX-8", "Scrum", "Sentia", "Tribute", "Verisa"],
  "Honda": ["Accord", "Acty", "Airwave", "Avancier", "Civic", "Concerto", "CR-V", "CR-Z", "Crossroad", "Domani", "Edix", "Element", "Elysion", "Fit", "FR-V", "Freed", "HR-V", "Insight", "Inspire", "Integra", "Jazz", "Lagreat", "Legend", "Life", "Logo", "MDX", "Mobilio", "N-Box", "N-One", "N-Van", "N-WGN", "NSX", "Odyssey", "Orthia", "Partner", "Passport", "Pilot", "Prelude", "Rafaga", "Ridgeline", "S-MX", "S2000", "Saber", "Shuttle", "Step WGN", "Stepwgn", "Stream", "That's", "Torneo", "Vamos", "Vezel", "Vigor", "Zest"],
  "Subaru": ["Alcyone", "Ascent", "B9 Tribeca", "Baja", "BRZ", "Crosstrek", "Dex", "Dias", "Domingo", "Exiga", "Forester", "Impreza", "Justy", "Legacy", "Leone", "Levorg", "Libero", "Lucra", "Outback", "Pleo", "Rex", "Sambar", "Stella", "Streega", "SVX", "Traviq", "Tribeca", "Vivio", "WRX", "XV"],
  "Mitsubishi": ["3000GT", "ASX", "Aspire", "Attrage", "Carisma", "Challenger", "Chariot", "Colt", "Debonair", "Delica", "Diamante", "Dingo", "Eclipse", "Eclipse Cross", "eK", "Emeraude", "Endeavor", "Expo", "FTO", "Galant", "Grandis", "GTO", "i", "i-MiEV", "L200", "L300", "L400", "Lancer", "Legnum", "Libero", "Magna", "Minica", "Mirage", "Montero", "Montero Sport", "Outlander", "Pajero", "Pajero iO", "Pajero Mini", "Pajero Pinin", "Pajero Sport", "Pistachio", "Proudia", "Raider", "RVR", "Sapporo", "Sigma", "Space Gear", "Space Runner", "Space Star", "Space Wagon", "Starion", "Toppo", "Town Box", "Triton"],
  "Hyundai": ["Accent", "Atos", "Avante", "Azera", "Centennial", "Creta", "Elantra", "Entourage", "Equus", "Excel", "Galloper", "Genesis", "Getz", "Grace", "Grand Starex", "Grandeur", "H-1", "H100", "i10", "i20", "i30", "i40", "Ioniq", "ix20", "ix35", "ix55", "Kona", "Lantra", "Lavita", "Matrix", "Palisade", "Pony", "Porter", "Santa Fe", "Santamo", "Solaris", "Sonata", "Starex", "Stellar", "Terracan", "Tiburon", "Trajet", "Tucson", "Veloster", "Venue", "Veracruz", "Verna", "XG"],
  "Kia": ["Avella", "Besta", "Bongo", "Cadenza", "Капур", "Carens", "Carnival", "Ceed", "Cerato", "Clarus", "Concord", "Credos", "EV6", "EV9", "Forte", "K5", "K7", "K8", "K9", "Magentis", "Mohave", "Niro", "Opirus", "Optima", "Picanto", "Potentia", "Pregio", "Pride", "ProCeed", "Quoris", "Retona", "Rio", "Sedona", "Seltos", "Sephia", "Shuma", "Sorento", "Soul", "Spectra", "Sportage", "Stinger", "Stonic", "Telluride", "Venga", "XCeed"],
  "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "i3", "i4", "i7", "i8", "iX", "iX1", "iX3", "M2", "M3", "M4", "M5", "M6", "M8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "XM", "Z3", "Z4", "Z8"],
  "Mercedes-Benz": ["A-Class", "B-Class", "C-Class", "CLA", "CLC", "CLK", "CLS", "E-Class", "EQA", "EQB", "EQC", "EQE", "EQS", "G-Class", "GL", "GLA", "GLB", "GLC", "GLE", "GLK", "GLS", "M-Class", "Maybach", "ML", "R-Class", "S-Class", "SL", "SLC", "SLK", "SLR", "SLS", "Sprinter", "V-Class", "Vaneo", "Viano", "Vito"],
  "Audi": ["100", "80", "90", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "e-tron", "Q2", "Q3", "Q4", "Q5", "Q7", "Q8", "R8", "RS3", "RS4", "RS5", "RS6", "RS7", "RSQ8", "S3", "S4", "S5", "S6", "S7", "S8", "SQ5", "SQ7", "SQ8", "TT", "TTS"],
  "Volkswagen": ["Amarok", "Arteon", "Atlas", "Beetle", "Bora", "Caddy", "California", "Caravelle", "CC", "Crafter", "Eos", "Fox", "Golf", "Golf Plus", "ID.3", "ID.4", "ID.5", "ID.Buzz", "Jetta", "Lupo", "Multivan", "New Beetle", "Passat", "Passat CC", "Phaeton", "Pointer", "Polo", "Routan", "Scirocco", "Sharan", "T-Cross", "T-Roc", "Taos", "Tiguan", "Touareg", "Touran", "Transporter", "Up", "Vento"],
  "Ford": ["Aerostar", "Bronco", "C-Max", "Contour", "Courier", "Crown Victoria", "EcoSport", "Edge", "Escape", "Escort", "Excursion", "Expedition", "Explorer", "F-150", "F-250", "F-350", "Fiesta", "Five Hundred", "Flex", "Focus", "Freestar", "Freestyle", "Fusion", "Galaxy", "Granada", "Grand C-Max", "Ka", "Kuga", "Maverick", "Mondeo", "Mustang", "Puma", "Ranger", "S-Max", "Scorpio", "Sierra", "Taurus", "Thunderbird", "Tourneo", "Transit", "Windstar"],
  "Chevrolet": ["Alero", "Astro", "Avalanche", "Aveo", "Blazer", "Camaro", "Caprice", "Captiva", "Cavalier", "Cobalt", "Colorado", "Corsica", "Corvette", "Cruze", "Epica", "Equinox", "Express", "HHR", "Impala", "Lacetti", "Lanos", "Lumina", "Malibu", "Metro", "Monte Carlo", "Niva", "Nubira", "Orlando", "Rezzo", "S-10", "Silverado", "Sonic", "Spark", "SS", "Suburban", "Tacuma", "Tahoe", "TrailBlazer", "Traverse", "Trax", "Uplander", "Venture", "Volt"],
  "Lexus": ["CT", "ES", "GS", "GX", "HS", "IS", "LC", "LFA", "LS", "LX", "NX", "RC", "RX", "RZ", "SC", "UX"],
  "Porsche": ["911", "918", "924", "928", "944", "968", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera", "Taycan"],
  "Volvo": ["240", "340", "440", "460", "480", "740", "760", "850", "940", "960", "C30", "C40", "C70", "S40", "S60", "S70", "S80", "S90", "V40", "V50", "V60", "V70", "V90", "XC40", "XC60", "XC70", "XC90"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  "Jeep": ["Cherokee", "Comanche", "Commander", "Compass", "Gladiator", "Grand Cherokee", "Grand Wagoneer", "Liberty", "Patriot", "Renegade", "Wagoneer", "Wrangler"],
  "Skoda": ["Citigo", "Enyaq", "Fabia", "Favorit", "Felicia", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Rapid", "Roomster", "Scala", "Superb", "Yeti"],
  "Renault": ["Arkana", "Captur", "Clio", "Duster", "Espace", "Fluence", "Kadjar", "Kangoo", "Kaptur", "Koleos", "Laguna", "Latitude", "Logan", "Master", "Megane", "Modus", "Sandero", "Scenic", "Symbol", "Talisman", "Thalia", "Trafic", "Twingo", "Vel Satis", "Zoe"],
  "Peugeot": ["106", "107", "206", "207", "208", "2008", "301", "307", "308", "3008", "406", "407", "408", "4007", "4008", "5008", "508", "607", "806", "807", "Bipper", "Boxer", "Expert", "iOn", "Partner", "Ranch", "Rifter", "Traveller"],
  "Citroen": ["Berlingo", "C-Crosser", "C-Elysee", "C1", "C2", "C3", "C3 Aircross", "C3 Picasso", "C4", "C4 Aircross", "C4 Cactus", "C4 Picasso", "C5", "C5 Aircross", "C6", "C8", "DS3", "DS4", "DS5", "Evasion", "Grand C4 Picasso", "Grand C4 SpaceTourer", "Jumper", "Jumpy", "Nemo", "Saxo", "SpaceTourer", "Xantia", "Xsara", "Xsara Picasso"],
  "Opel": ["Adam", "Agila", "Antara", "Astra", "Calibra", "Cascada", "Combo", "Corsa", "Crossland", "Frontera", "Grandland", "Insignia", "Kadett", "Karl", "Meriva", "Mokka", "Monterey", "Movano", "Omega", "Signum", "Sintra", "Tigra", "Vectra", "Vivaro", "Zafira"],
  "УАЗ": ["3151", "3153", "3159", "3160", "3162", "3303", "3741", "452", "469", "Буханка", "Барс", "Вагон", "Патриот", "Patriot", "Пикап", "Pickup", "Профи", "Profi", "Симбир", "Хантер", "Hunter"],
  "ГАЗ": ["2217", "2705", "2752", "3102", "31029", "3110", "31105", "3111", "Волга", "Volga", "ГАЗель", "Gazel", "ГАЗель Next", "Next", "Соболь", "Sobol", "Валдай"],
  "Lada": ["110", "111", "112", "2101", "2102", "2103", "2104", "2105", "2106", "2107", "2108", "2109", "21099", "2110", "2111", "2112", "2113", "2114", "2115", "2121", "2131", "4x4", "Granta", "Гранта", "Kalina", "Калина", "Largus", "Ларгус", "Niva", "Нива", "Priora", "Приора", "Vesta", "Веста", "XRAY"],
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