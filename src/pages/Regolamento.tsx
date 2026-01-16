import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, BookOpen, Users, Trophy, Phone, Zap, Star } from 'lucide-react';
import { playButtonClick } from '@/utils/sounds';

const Regolamento = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    playButtonClick();
    navigate('/game');
  };

  const handleDecline = () => {
    playButtonClick();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">Regolamento MOB.LOTTO 4.0</h1>
          <p className="text-xl text-muted-foreground">
            Leggi attentamente le condizioni di partecipazione
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Condizioni di partecipazione
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Requisiti di età</h4>
                    <p className="text-sm text-muted-foreground">
                      La partecipazione è consentita esclusivamente a persone maggiorenni (18+ anni).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Verifica obbligatoria</h4>
                    <p className="text-sm text-muted-foreground">
                      Ogni chiamata viene sottoposta a verifica IVR per confermare il requisito di età.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Costo della chiamata</h4>
                    <p className="text-sm text-muted-foreground">
                      Il costo fisso per ogni chiamata è di €1, indipendentemente dall'esito del gioco.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Modalità di gioco
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Estrazione casuale</h4>
                    <p className="text-sm text-muted-foreground">
                      Il risultato viene determinato tramite generatore di numeri casuali (RNG) equivalente ai sistemi slot-machine.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Vincite</h4>
                    <p className="text-sm text-muted-foreground">
                      Vincite standard: €5.000-€10.000. Jackpot una tantum: €100.000.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Tracciabilità</h4>
                    <p className="text-sm text-muted-foreground">
                      Tutti gli eventi di gioco vengono registrati per garantire trasparenza e sicurezza.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Garanzie e responsabilità
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Anonimizzazione</h4>
                    <p className="text-sm text-muted-foreground">
                      I dati personali vengono separati dall'ID tecnico per garantire la privacy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Audit trail</h4>
                    <p className="text-sm text-muted-foreground">
                      È garantita la tracciabilità completa delle estrazioni e dei risultati.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Riscossione vincite</h4>
                    <p className="text-sm text-muted-foreground">
                      Le procedure di riscossione sono gestite tramite sistema controllato.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Informazioni aggiuntive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Responsabilità</h4>
                    <p className="text-sm text-muted-foreground">
                      Il sistema declina ogni responsabilità per uso improprio o violazione delle condizioni.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Modifiche</h4>
                    <p className="text-sm text-muted-foreground">
                      Il regolamento può essere modificato in qualsiasi momento senza preavviso.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Assistenza</h4>
                    <p className="text-sm text-muted-foreground">
                      Per qualsiasi domanda, contattare il servizio clienti dedicato.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Accettazione delle condizioni
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg mb-6">
                <p className="text-sm text-muted-foreground">
                  Dichiaro di aver letto e compreso il regolamento e accetto tutte le condizioni di partecipazione.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                  onClick={handleAccept}
                >
                  Accetta e continua
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Rifiuta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Regolamento;