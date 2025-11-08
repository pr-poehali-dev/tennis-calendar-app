import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Player {
  rank: number;
  name: string;
  country: string;
  points: number;
  tournaments: number;
  age: number;
  change: number;
}

const topPlayers: Player[] = [
  { rank: 1, name: 'Новак Джокович', country: '🇷🇸', points: 11145, tournaments: 18, age: 36, change: 0 },
  { rank: 2, name: 'Карлос Алькарас', country: '🇪🇸', points: 9815, tournaments: 17, age: 20, change: 1 },
  { rank: 3, name: 'Даниил Медведев', country: '🇷🇺', points: 8765, tournaments: 20, age: 27, change: -1 },
  { rank: 4, name: 'Янник Синнер', country: '🇮🇹', points: 7980, tournaments: 19, age: 22, change: 2 },
  { rank: 5, name: 'Андрей Рублёв', country: '🇷🇺', points: 7450, tournaments: 21, age: 26, change: 0 },
  { rank: 6, name: 'Стефанос Циципас', country: '🇬🇷', points: 6915, tournaments: 19, age: 25, change: -2 },
  { rank: 7, name: 'Холгер Руне', country: '🇩🇰', points: 6325, tournaments: 18, age: 20, change: 3 },
  { rank: 8, name: 'Каспер Рууд', country: '🇳🇴', points: 6020, tournaments: 22, age: 24, change: -1 },
  { rank: 9, name: 'Александр Зверев', country: '🇩🇪', points: 5890, tournaments: 17, age: 26, change: 1 },
  { rank: 10, name: 'Тейлор Фриц', country: '🇺🇸', points: 5650, tournaments: 20, age: 26, change: -2 },
];

const PlayerRankings = () => {
  const maxPoints = topPlayers[0].points;

  const getChangeIcon = (change: number) => {
    if (change > 0) return <Icon name="TrendingUp" size={16} className="text-secondary" />;
    if (change < 0) return <Icon name="TrendingDown" size={16} className="text-destructive" />;
    return <Icon name="Minus" size={16} className="text-muted-foreground" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-secondary';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <div className="container mx-auto px-6 py-8 animate-fade-in">
      <div className="space-y-4">
        {topPlayers.map((player, idx) => (
          <Card
            key={player.rank}
            className={`p-6 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] animate-slide-up ${
              player.rank <= 3 ? 'border-primary/50' : 'border-primary/20'
            }`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className={`text-4xl font-bold ${
                  player.rank === 1 ? 'text-primary' :
                  player.rank === 2 ? 'text-secondary' :
                  player.rank === 3 ? 'text-accent' :
                  'text-muted-foreground'
                }`}>
                  {player.rank}
                </div>
                <div className="flex items-center gap-2">
                  {getChangeIcon(player.change)}
                  {player.change !== 0 && (
                    <span className={`text-sm font-medium ${getChangeColor(player.change)}`}>
                      {Math.abs(player.change)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{player.country}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{player.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {player.age} лет
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Trophy" size={14} />
                          {player.tournaments} турниров
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{player.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">очков</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Progress 
                    value={(player.points / maxPoints) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{((player.points / maxPoints) * 100).toFixed(1)}% от лидера</span>
                  </div>
                </div>
              </div>

              {player.rank <= 3 && (
                <Badge className={`px-4 py-2 text-lg ${
                  player.rank === 1 ? 'bg-primary text-primary-foreground' :
                  player.rank === 2 ? 'bg-secondary text-secondary-foreground' :
                  'bg-accent text-accent-foreground'
                }`}>
                  <Icon name="Crown" size={20} />
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-6 bg-card/30 backdrop-blur-sm border-primary/20">
        <h3 className="text-xl font-semibold text-primary mb-4">Статистика рейтинга</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Icon name="Globe" size={32} className="text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold text-foreground">137</div>
            <div className="text-sm text-muted-foreground">Стран в рейтинге</div>
          </div>
          <div className="text-center">
            <Icon name="Users" size={32} className="text-secondary mx-auto mb-2" />
            <div className="text-3xl font-bold text-foreground">2,000+</div>
            <div className="text-sm text-muted-foreground">Игроков в топ-2000</div>
          </div>
          <div className="text-center">
            <Icon name="TrendingUp" size={32} className="text-accent mx-auto mb-2" />
            <div className="text-3xl font-bold text-foreground">52</div>
            <div className="text-sm text-muted-foreground">Недели обновления</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlayerRankings;
