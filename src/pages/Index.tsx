import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Trophy, Shield, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GameStats from '@/components/GameStats';
import IVRFlow from '@/components/IVRFlow';

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePlay = () => {
    if (!phoneNumber) {
      toast({
        title: "Numero richiesto",
        description: "Inserisci il tuo numero di telefono per giocare",
        variant: "destructive",
      });
      return;
    }

    // Simulate starting a game
    toast({
      title: "Chiamata in corso",
      description: "Stiamo connettendo la tua chiamata...",
    });

    // Navigate to regolamento page after a short delay
    setTimeout(() => {
      navigate('/regolamento');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">MOB.LOTTO 4.0</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema di gioco telefonico a costo fisso con vincite fino a €100.000
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Gioca ora
                </CardTitle>
                <CardDescription>
                  Chiama il numero dedicato o simula una chiamata qui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numero di telefono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Es. 3331234567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Costo chiamata: €1
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Come giocare:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Chiama il numero dedicato o usa il simulatore</li>
                      <li>• Segui le istruzioni IVR</li>
                      <li>• Vinci fino a €100.000!</li>
                    </ul>
                  </div>

                  <Button className="w-full" onClick={handlePlay}>
                    Simula chiamata
                  </Button>
                </div>
              </CardContent>
            </Card>

            <IVRFlow />
          </div>

          <div className="space-y-6">
            <GameStats
              totalPlays={12450}
              totalWins={3750}
              jackpotWins={12}
              lastWinAmount={75000}
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Garanzie di sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Anonimizzazione</h4>
                    <p className="text-sm text-muted-foreground">
                      Separazione tra ID tecnico e dati personali
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Audit trail</h4>
                    <p className="text-sm text-muted-foreground">
                      Tracciabilità completa delle estrazioni
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Vincite sicure</h4>
                    <p className="text-sm text-muted-foreground">
                      Sistema di riscossione controllato
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informazioni sul gioco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Accesso al gioco</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Ammessi solo utenti 18+</li>
                  <li>• IVR iniziale con conferma obbligatoria</li>
                  <li>• Eventi di gioco sempre registrati</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Determinazione vincita</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• RNG equivalente a sistemi slot-machine</li>
                  <li>• Vincite standard: €5.000-€10.000</li>
                  <li>• Jackpot una tantum: €100.000</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Modalità di gioco</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Chiamata in ingresso</li>
                  <li>• Messaggio IVR con costo e conferma</li>
                  <li>• Estrazione casuale</li>
                  <li>• Annuncio risultato</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;