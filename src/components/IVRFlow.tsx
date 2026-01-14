import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, UserCheck, Play, Trophy, User } from "lucide-react";

const IVRFlow = () => {
  const steps = [
    {
      id: 1,
      title: "Chiamata in ingresso",
      description: "L'utente chiama il numero dedicato",
      icon: <Phone className="h-4 w-4" />,
      status: "completed"
    },
    {
      id: 2,
      title: "Verifica maggiore età",
      description: "Messaggio IVR obbligatorio",
      icon: <UserCheck className="h-4 w-4" />,
      status: "completed"
    },
    {
      id: 3,
      title: "Conferma partecipazione",
      description: "Premere 3 per confermare",
      icon: <Play className="h-4 w-4" />,
      status: "current"
    },
    {
      id: 4,
      title: "Estrazione casuale",
      description: "Determinazione vincita",
      icon: <Trophy className="h-4 w-4" />,
      status: "pending"
    },
    {
      id: 5,
      title: "Annuncio risultato",
      description: "Comunicazione vincita/perdita",
      icon: <User className="h-4 w-4" />,
      status: "pending"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flusso IVR</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-3">
              <div className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full ${
                step.status === 'completed' ? 'bg-green-500' : 
                step.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{step.title}</h4>
                  <Badge variant={
                    step.status === 'completed' ? 'default' : 
                    step.status === 'current' ? 'secondary' : 'outline'
                  }>
                    {step.status === 'completed' ? 'Completato' : 
                     step.status === 'current' ? 'In corso' : 'In attesa'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IVRFlow;