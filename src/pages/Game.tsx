import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Phone, PhoneOff, Trophy, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [gameState, setGameState] = useState<'idle' | 'connecting' | 'ivr' | 'playing' | 'result' | 'winner'>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ isWinner: boolean; amount?: number } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Simulate IVR flow
  useEffect(() => {
    if (gameState === 'connecting') {
      const timer = setTimeout(() => {
        setGameState('ivr');
        toast({
          title: "Connessione stabilita",
          description: "Benvenuto a MOB.LOTTO 4.0",
        });
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    if (gameState === 'ivr') {
      const timer = setTimeout(() => {
        setGameState('playing');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState, toast]);

  // Simulate game progress
  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            // Determine result
            const isWinner = Math.random() < 0.3; // 30% chance to win
            let amount = 0;
            
            if (isWinner) {
              // 10% chance for jackpot
              const isJackpot = Math.random() < 0.1;
              amount = isJackpot ? 100000 : Math.floor(Math.random() * 5000) + 5000;
            }
            
            setResult({ isWinner, amount });
            setGameState('result');
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      
      return () => clearInterval(timer);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('connecting');
    setProgress(0);
    setResult(null);
  };

  const handlePlayAgain = () => {
    setGameState('idle');
    setProgress(0);
    setResult(null);
  };

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <Phone className="text-white h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">MOB.LOTTO 4.0</CardTitle>
          <CardDescription>Simulazione del sistema di gioco telefonico</CardDescription>
        </CardHeader>
        <CardContent>
          {gameState === 'idle' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="mb-4">
                  Benvenuto nel sistema MOB.LOTTO 4.0. Premi il pulsante per simulare una chiamata.
                </p>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">Flusso di gioco:</h3>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Connessione al sistema</li>
                    <li>Messaggio IVR di conferma</li>
                    <li>Estrazione casuale</li>
                    <li>Annuncio risultato</li>
                  </ol>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1" onClick={startGame}>
                  Inizia a giocare
                </Button>
                <Button variant="outline" onClick={handleExit}>
                  Esci
                </Button>
              </div>
            </div>
          )}
          
          {gameState === 'connecting' && (
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <Phone className="mx-auto h-12 w-12 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Connessione in corso...</h3>
              <p>Stiamo connettendo la tua chiamata al sistema MOB.LOTTO</p>
            </div>
          )}
          
          {gameState === 'ivr' && (
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <Phone className="mx-auto h-12 w-12 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Messaggio IVR</h3>
              <div className="bg-muted p-4 rounded-lg text-left">
                <p className="mb-2">
                  <strong>Benvenuto a MOB.LOTTO 4.0</strong>
                </p>
                <p className="mb-2">
                  Il costo di questa chiamata è di 1 euro.
                </p>
                <p>
                  Per confermare di avere almeno 18 anni e partecipare, premi 3.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Simulazione del messaggio IVR...
              </p>
            </div>
          )}
          
          {gameState === 'playing' && (
            <div className="text-center space-y-6">
              <h3 className="text-lg font-semibold">Estrazione in corso</h3>
              <div className="relative">
                <Progress value={progress} className="w-full h-4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">
                    {progress}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Determinazione del risultato...
              </p>
            </div>
          )}
          
          {gameState === 'result' && result && (
            <div className="text-center space-y-6">
              {result.isWinner ? (
                <>
                  <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                    <Trophy className="text-green-600 h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-600">HAI VINTO!</h3>
                    <p className="text-3xl font-bold mt-2">
                      €{result.amount?.toLocaleString('it-IT')}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800">
                      Complimenti! Sei un vincitore fortunato.
                    </p>
                    <p className="text-sm text-green-700 mt-2">
                      Un operatore ti contatterà per le procedure di riscossione.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mx-auto bg-red-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                    <PhoneOff className="text-red-600 h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-600">RITENTA!</h3>
                  <p>Non hai vinto questa volta. Riprova per tentare la fortuna!</p>
                </>
              )}
              
              <div className="flex gap-3">
                <Button className="flex-1" onClick={handlePlayAgain}>
                  Gioca ancora
                </Button>
                <Button variant="outline" onClick={handleExit}>
                  Esci
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Game;