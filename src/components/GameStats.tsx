import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GameStatsProps {
  totalPlays: number;
  totalWins: number;
  jackpotWins: number;
  lastWinAmount?: number;
}

const GameStats = ({ 
  totalPlays, 
  totalWins, 
  jackpotWins,
  lastWinAmount
}: GameStatsProps) => {
  const winRate = totalPlays > 0 ? (totalWins / totalPlays) * 100 : 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiche di gioco</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold">{totalPlays}</p>
            <p className="text-sm text-muted-foreground">Giocate totali</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold">{totalWins}</p>
            <p className="text-sm text-muted-foreground">Vincite</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Tasso di vincita</span>
            <span className="text-sm font-medium">{winRate.toFixed(1)}%</span>
          </div>
          <Progress value={winRate} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-2xl font-bold">{jackpotWins}</p>
            <p className="text-sm text-yellow-700">Jackpot vinti</p>
          </div>
          {lastWinAmount && (
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-2xl font-bold">€{lastWinAmount.toLocaleString('it-IT')}</p>
              <p className="text-sm text-green-700">Ultima vincita</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStats;