import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import TournamentCalendar from '@/components/TournamentCalendar';
import TournamentBracket from '@/components/TournamentBracket';
import PlayerRankings from '@/components/PlayerRankings';
import HeadToHead from '@/components/HeadToHead';

type View = 'home' | 'calendar' | 'bracket' | 'rankings' | 'h2h';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const handleTournamentClick = (tournament: any) => {
    setSelectedTournament(tournament);
    setCurrentView('bracket');
  };

  const handlePlayersSelected = (players: string[]) => {
    setSelectedPlayers(players);
    if (players.length === 2) {
      setCurrentView('h2h');
    }
  };

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="inline-block">
              <Icon name="Trophy" size={64} className="text-primary mb-4" />
            </div>
            <h1 className="text-6xl font-bold text-primary mb-2">ATP Tour</h1>
            <p className="text-xl text-muted-foreground">Премиальный теннисный календарь</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card 
              className="p-8 hover:scale-105 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 group"
              onClick={() => setCurrentView('calendar')}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon name="Calendar" size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-primary">Календарь турниров</h3>
                <p className="text-muted-foreground">Все турниры ATP с фильтрами по покрытию и категории</p>
              </div>
            </Card>

            <Card 
              className="p-8 hover:scale-105 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur-sm border-secondary/20 hover:border-secondary/50 group"
              onClick={() => setCurrentView('rankings')}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <Icon name="TrendingUp" size={40} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-semibold text-secondary">Рейтинг ATP</h3>
                <p className="text-muted-foreground">Топ-100 теннисистов с живой статистикой</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'calendar') {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border/50 backdrop-blur-sm bg-card/30 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('home')}
              className="text-primary hover:text-primary/80"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            <h2 className="text-2xl font-bold text-primary">Календарь ATP</h2>
            <div className="w-24"></div>
          </div>
        </div>
        <TournamentCalendar onTournamentClick={handleTournamentClick} />
      </div>
    );
  }

  if (currentView === 'bracket' && selectedTournament) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border/50 backdrop-blur-sm bg-card/30 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('calendar')}
              className="text-primary hover:text-primary/80"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              К календарю
            </Button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary">{selectedTournament.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedTournament.dates}</p>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
        <TournamentBracket 
          tournament={selectedTournament} 
          onPlayersSelected={handlePlayersSelected}
        />
      </div>
    );
  }

  if (currentView === 'rankings') {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border/50 backdrop-blur-sm bg-card/30 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('home')}
              className="text-primary hover:text-primary/80"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            <h2 className="text-2xl font-bold text-primary">Рейтинг ATP</h2>
            <div className="w-24"></div>
          </div>
        </div>
        <PlayerRankings />
      </div>
    );
  }

  if (currentView === 'h2h' && selectedPlayers.length === 2) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border/50 backdrop-blur-sm bg-card/30 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => {
                setSelectedPlayers([]);
                setCurrentView('bracket');
              }}
              className="text-primary hover:text-primary/80"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              К сетке
            </Button>
            <h2 className="text-2xl font-bold text-primary">История встреч</h2>
            <div className="w-24"></div>
          </div>
        </div>
        <HeadToHead players={selectedPlayers} />
      </div>
    );
  }

  return null;
};

export default Index;
