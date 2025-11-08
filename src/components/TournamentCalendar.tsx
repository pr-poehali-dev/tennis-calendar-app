import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Surface = 'Все' | 'Хард' | 'Грунт' | 'Трава';
type Category = 'Все' | 'ATP 250' | 'ATP 500' | 'ATP 1000' | 'Большой шлем';

interface Tournament {
  id: string;
  name: string;
  dates: string;
  location: string;
  surface: Surface;
  category: Category;
  prize: string;
}

const tournaments: Tournament[] = [
  { id: '1', name: 'Australian Open', dates: '14-27 января', location: 'Мельбурн', surface: 'Хард', category: 'Большой шлем', prize: '$86.5M' },
  { id: '2', name: 'Indian Wells Masters', dates: '6-19 марта', location: 'Индиан-Уэллс', surface: 'Хард', category: 'ATP 1000', prize: '$9.8M' },
  { id: '3', name: 'Miami Open', dates: '19 марта - 1 апреля', location: 'Майами', surface: 'Хард', category: 'ATP 1000', prize: '$8.8M' },
  { id: '4', name: 'Monte-Carlo Masters', dates: '7-14 апреля', location: 'Монте-Карло', surface: 'Грунт', category: 'ATP 1000', prize: '$6.1M' },
  { id: '5', name: 'Madrid Open', dates: '26 апреля - 5 мая', location: 'Мадрид', surface: 'Грунт', category: 'ATP 1000', prize: '$8.8M' },
  { id: '6', name: 'Italian Open', dates: '10-19 мая', location: 'Рим', surface: 'Грунт', category: 'ATP 1000', prize: '$8.0M' },
  { id: '7', name: 'Roland Garros', dates: '26 мая - 9 июня', location: 'Париж', surface: 'Грунт', category: 'Большой шлем', prize: '$53.5M' },
  { id: '8', name: 'Wimbledon', dates: '30 июня - 13 июля', location: 'Лондон', surface: 'Трава', category: 'Большой шлем', prize: '$50M' },
  { id: '9', name: 'Canadian Open', dates: '5-11 августа', location: 'Торонто/Монреаль', surface: 'Хард', category: 'ATP 1000', prize: '$6.8M' },
  { id: '10', name: 'Cincinnati Masters', dates: '12-18 августа', location: 'Цинциннати', surface: 'Хард', category: 'ATP 1000', prize: '$6.8M' },
  { id: '11', name: 'US Open', dates: '26 августа - 8 сентября', location: 'Нью-Йорк', surface: 'Хард', category: 'Большой шлем', prize: '$65M' },
  { id: '12', name: 'Shanghai Masters', dates: '2-13 октября', location: 'Шанхай', surface: 'Хард', category: 'ATP 1000', prize: '$9.0M' },
];

const TournamentCalendar = ({ onTournamentClick }: { onTournamentClick: (tournament: Tournament) => void }) => {
  const [selectedSurface, setSelectedSurface] = useState<Surface>('Все');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Все');

  const surfaces: Surface[] = ['Все', 'Хард', 'Грунт', 'Трава'];
  const categories: Category[] = ['Все', 'ATP 250', 'ATP 500', 'ATP 1000', 'Большой шлем'];

  const filteredTournaments = tournaments.filter(t => {
    const surfaceMatch = selectedSurface === 'Все' || t.surface === selectedSurface;
    const categoryMatch = selectedCategory === 'Все' || t.category === selectedCategory;
    return surfaceMatch && categoryMatch;
  });

  const getSurfaceColor = (surface: string) => {
    switch (surface) {
      case 'Хард': return 'bg-[hsl(var(--accent))]';
      case 'Грунт': return 'bg-[hsl(var(--clay))]';
      case 'Трава': return 'bg-[hsl(var(--grass))]';
      default: return 'bg-muted';
    }
  };

  const getSurfaceIcon = (surface: string) => {
    switch (surface) {
      case 'Хард': return 'Zap';
      case 'Грунт': return 'Mountain';
      case 'Трава': return 'Leaf';
      default: return 'Circle';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 animate-fade-in">
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Покрытие</h3>
            <div className="flex flex-wrap gap-2">
              {surfaces.map(surface => (
                <Button
                  key={surface}
                  variant={selectedSurface === surface ? 'default' : 'outline'}
                  onClick={() => setSelectedSurface(surface)}
                  className={selectedSurface === surface ? 'bg-primary text-primary-foreground' : ''}
                >
                  {surface}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Категория</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-secondary text-secondary-foreground' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {filteredTournaments.map((tournament, idx) => (
            <Card
              key={tournament.id}
              className="p-6 cursor-pointer hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 group animate-slide-up"
              style={{ animationDelay: `${idx * 50}ms` }}
              onClick={() => onTournamentClick(tournament)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors">
                      {tournament.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{tournament.location}</p>
                  </div>
                  <Icon name={getSurfaceIcon(tournament.surface)} size={24} className="text-primary" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    {tournament.dates}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="DollarSign" size={16} className="mr-2" />
                    {tournament.prize}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={`${getSurfaceColor(tournament.surface)} text-background`}>
                    {tournament.surface}
                  </Badge>
                  <Badge variant="outline" className="border-primary/50">
                    {tournament.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Турниров не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentCalendar;
