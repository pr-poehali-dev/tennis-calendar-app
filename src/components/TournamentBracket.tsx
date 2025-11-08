import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Player {
  id: string;
  name: string;
  seed: number;
  country: string;
  rank: number;
}

interface Match {
  id: string;
  round: string;
  player1: Player;
  player2: Player;
  score?: string;
  winner?: string;
}

const players: Player[] = [
  { id: '1', name: 'Новак Джокович', seed: 1, country: '🇷🇸', rank: 1 },
  { id: '2', name: 'Карлос Алькарас', seed: 2, country: '🇪🇸', rank: 2 },
  { id: '3', name: 'Даниил Медведев', seed: 3, country: '🇷🇺', rank: 3 },
  { id: '4', name: 'Янник Синнер', seed: 4, country: '🇮🇹', rank: 4 },
  { id: '5', name: 'Андрей Рублёв', seed: 5, country: '🇷🇺', rank: 5 },
  { id: '6', name: 'Стефанос Циципас', seed: 6, country: '🇬🇷', rank: 6 },
  { id: '7', name: 'Холгер Руне', seed: 7, country: '🇩🇰', rank: 7 },
  { id: '8', name: 'Каспер Рууд', seed: 8, country: '🇳🇴', rank: 8 },
];

const TournamentBracket = ({ 
  tournament, 
  onPlayersSelected 
}: { 
  tournament: any; 
  onPlayersSelected: (players: string[]) => void;
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const matches: Match[] = [
    { id: 'm1', round: '1/4', player1: players[0], player2: players[7], score: '6-3, 6-4', winner: '1' },
    { id: 'm2', round: '1/4', player1: players[1], player2: players[6], score: '7-6, 6-2', winner: '2' },
    { id: 'm3', round: '1/4', player1: players[2], player2: players[5], score: '6-4, 3-6, 6-3', winner: '3' },
    { id: 'm4', round: '1/4', player1: players[3], player2: players[4], score: '6-2, 6-4', winner: '4' },
    { id: 'm5', round: '1/2', player1: players[0], player2: players[1], score: '', winner: '' },
    { id: 'm6', round: '1/2', player1: players[2], player2: players[3], score: '', winner: '' },
    { id: 'm7', round: 'Финал', player1: players[0], player2: players[2], score: '', winner: '' },
  ];

  const handlePlayerClick = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else if (selectedPlayers.length < 2) {
      const newSelected = [...selectedPlayers, playerId];
      setSelectedPlayers(newSelected);
      if (newSelected.length === 2) {
        setTimeout(() => onPlayersSelected(newSelected), 500);
      }
    }
  };

  const rounds = ['1/4 финала', '1/2 финала', 'Финал'];

  return (
    <div className="container mx-auto px-6 py-8 animate-fade-in">
      {selectedPlayers.length === 2 && (
        <div className="mb-6 flex justify-center animate-scale-in">
          <Button 
            onClick={() => onPlayersSelected(selectedPlayers)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
          >
            <Icon name="Swords" size={24} className="mr-3" />
            История встреч
          </Button>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-[800px] space-y-8">
          {rounds.map((roundName, roundIdx) => (
            <div key={roundName} className="animate-slide-up" style={{ animationDelay: `${roundIdx * 100}ms` }}>
              <h3 className="text-2xl font-bold text-primary mb-4">{roundName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches
                  .filter(m => {
                    if (roundName === '1/4 финала') return m.round === '1/4';
                    if (roundName === '1/2 финала') return m.round === '1/2';
                    return m.round === 'Финал';
                  })
                  .map(match => (
                    <Card 
                      key={match.id} 
                      className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all"
                    >
                      <div className="space-y-4">
                        <div 
                          className={`flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer ${
                            selectedPlayers.includes(match.player1.id) 
                              ? 'bg-primary/20 border-2 border-primary' 
                              : 'bg-muted/30 hover:bg-muted/50'
                          } ${match.winner === match.player1.id ? 'border-l-4 border-l-secondary' : ''}`}
                          onClick={() => handlePlayerClick(match.player1.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">{match.player1.seed}</Badge>
                            <span className="text-2xl">{match.player1.country}</span>
                            <div>
                              <p className="font-semibold text-foreground">{match.player1.name}</p>
                              <p className="text-xs text-muted-foreground">#{match.player1.rank} ATP</p>
                            </div>
                          </div>
                          {selectedPlayers.includes(match.player1.id) && (
                            <Icon name="CheckCircle2" size={24} className="text-primary" />
                          )}
                        </div>

                        <div 
                          className={`flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer ${
                            selectedPlayers.includes(match.player2.id) 
                              ? 'bg-primary/20 border-2 border-primary' 
                              : 'bg-muted/30 hover:bg-muted/50'
                          } ${match.winner === match.player2.id ? 'border-l-4 border-l-secondary' : ''}`}
                          onClick={() => handlePlayerClick(match.player2.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">{match.player2.seed}</Badge>
                            <span className="text-2xl">{match.player2.country}</span>
                            <div>
                              <p className="font-semibold text-foreground">{match.player2.name}</p>
                              <p className="text-xs text-muted-foreground">#{match.player2.rank} ATP</p>
                            </div>
                          </div>
                          {selectedPlayers.includes(match.player2.id) && (
                            <Icon name="CheckCircle2" size={24} className="text-primary" />
                          )}
                        </div>

                        {match.score && (
                          <div className="text-center pt-2 border-t border-border/50">
                            <p className="text-sm text-muted-foreground">Счёт</p>
                            <p className="text-foreground font-mono">{match.score}</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPlayers.length > 0 && (
        <div className="fixed bottom-6 right-6 animate-scale-in">
          <Badge className="bg-primary text-primary-foreground px-4 py-2 text-lg">
            Выбрано: {selectedPlayers.length}/2
          </Badge>
        </div>
      )}
    </div>
  );
};

export default TournamentBracket;
