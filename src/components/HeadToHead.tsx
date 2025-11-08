import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Player {
  id: string;
  name: string;
  country: string;
  rank: number;
}

interface Match {
  date: string;
  tournament: string;
  surface: string;
  round: string;
  score: string;
  winner: string;
}

const playerData: Record<string, Player> = {
  '1': { id: '1', name: 'Новак Джокович', country: '🇷🇸', rank: 1 },
  '2': { id: '2', name: 'Карлос Алькарас', country: '🇪🇸', rank: 2 },
  '3': { id: '3', name: 'Даниил Медведев', country: '🇷🇺', rank: 3 },
  '4': { id: '4', name: 'Янник Синнер', country: '🇮🇹', rank: 4 },
};

const matchHistory: Match[] = [
  { date: '23 сентября 2024', tournament: 'Shanghai Masters', surface: 'Хард', round: 'Финал', score: '7-6, 7-6', winner: '1' },
  { date: '14 июля 2024', tournament: 'Wimbledon', surface: 'Трава', round: 'Финал', score: '6-2, 6-2, 7-6', winner: '2' },
  { date: '9 июня 2024', tournament: 'Roland Garros', surface: 'Грунт', round: '1/2', score: '6-3, 5-7, 6-1, 6-1', winner: '1' },
  { date: '2 мая 2024', tournament: 'Madrid Open', surface: 'Грунт', round: '1/2', score: '7-5, 6-7, 7-6', winner: '2' },
  { date: '28 января 2024', tournament: 'Australian Open', surface: 'Хард', round: '1/4', score: '6-4, 6-4, 6-4', winner: '1' },
];

const HeadToHead = ({ players }: { players: string[] }) => {
  const player1 = playerData[players[0]];
  const player2 = playerData[players[1]];

  const player1Wins = matchHistory.filter(m => m.winner === players[0]).length;
  const player2Wins = matchHistory.filter(m => m.winner === players[1]).length;
  const totalMatches = matchHistory.length;

  const player1WinRate = (player1Wins / totalMatches) * 100;
  const player2WinRate = (player2Wins / totalMatches) * 100;

  const getSurfaceColor = (surface: string) => {
    switch (surface) {
      case 'Хард': return 'bg-[hsl(var(--accent))]';
      case 'Грунт': return 'bg-[hsl(var(--clay))]';
      case 'Трава': return 'bg-[hsl(var(--grass))]';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 animate-fade-in">
      <Card className="p-8 mb-8 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border-primary/30 animate-scale-in">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center space-y-3">
            <span className="text-6xl">{player1.country}</span>
            <h2 className="text-3xl font-bold text-primary">{player1.name}</h2>
            <Badge variant="outline" className="text-lg px-4 py-1">
              #{player1.rank} ATP
            </Badge>
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="text-5xl font-bold text-primary">{player1Wins}</div>
              <Icon name="Swords" size={40} className="text-muted-foreground" />
              <div className="text-5xl font-bold text-secondary">{player2Wins}</div>
            </div>
            <p className="text-lg text-muted-foreground">Всего встреч: {totalMatches}</p>
          </div>

          <div className="text-center space-y-3">
            <span className="text-6xl">{player2.country}</span>
            <h2 className="text-3xl font-bold text-secondary">{player2.name}</h2>
            <Badge variant="outline" className="text-lg px-4 py-1">
              #{player2.rank} ATP
            </Badge>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-primary w-32 text-right">{player1WinRate.toFixed(0)}%</span>
            <Progress value={player1WinRate} className="flex-1 h-3" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-secondary w-32 text-right">{player2WinRate.toFixed(0)}%</span>
            <Progress value={player2WinRate} className="flex-1 h-3" />
          </div>
        </div>
      </Card>

      <h3 className="text-2xl font-bold text-primary mb-6">История встреч</h3>

      <div className="space-y-4">
        {matchHistory.map((match, idx) => (
          <Card
            key={idx}
            className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all animate-slide-up"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-2">
                <div className="text-sm text-muted-foreground">{match.date}</div>
              </div>

              <div className="md:col-span-3">
                <div className="font-semibold text-foreground">{match.tournament}</div>
                <div className="text-sm text-muted-foreground">{match.round}</div>
              </div>

              <div className="md:col-span-2 flex justify-center">
                <Badge className={`${getSurfaceColor(match.surface)} text-background`}>
                  {match.surface}
                </Badge>
              </div>

              <div className="md:col-span-3">
                <div className="font-mono text-lg text-center text-foreground">{match.score}</div>
              </div>

              <div className="md:col-span-2 flex justify-center">
                {match.winner === players[0] ? (
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Icon name="Trophy" size={16} className="mr-2" />
                    {player1.name.split(' ')[1]}
                  </Badge>
                ) : (
                  <Badge className="bg-secondary text-secondary-foreground px-4 py-1">
                    <Icon name="Trophy" size={16} className="mr-2" />
                    {player2.name.split(' ')[1]}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-6 bg-card/30 backdrop-blur-sm border-primary/20">
        <h3 className="text-xl font-semibold text-primary mb-4">Статистика по покрытиям</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Icon name="Zap" size={32} className="text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">3-2</div>
            <div className="text-sm text-muted-foreground">На харде</div>
          </div>
          <div className="text-center">
            <Icon name="Mountain" size={32} className="text-[hsl(var(--clay))] mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">1-1</div>
            <div className="text-sm text-muted-foreground">На грунте</div>
          </div>
          <div className="text-center">
            <Icon name="Leaf" size={32} className="text-[hsl(var(--grass))] mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">1-2</div>
            <div className="text-sm text-muted-foreground">На траве</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HeadToHead;
