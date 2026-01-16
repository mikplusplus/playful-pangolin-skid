import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Phone, PhoneOff, Trophy, Coins, Zap, Star, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import {
  playButtonClick,
  playPhoneRing,
  playWinSound,
  playLoseSound,
  playProgressSound,
  playIvrSound,
  stopSound
} from '@/utils/sounds';

const Game = () => {
  const [gameState, setGameState] = useState<'idle' | 'connecting' | 'ivr' | 'playing' | 'result'>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ isWinner: boolean; amount?: number } | null>(null);
  const [isAudioSupported, setIsAudioSupported] = useState<boolean | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const phoneRingSoundRef = useRef<Howl | null>(null);

  // Controllo supporto audio
  useEffect(() => {
    try {
      const audio = new Audio();
      const supported = !!audio.canPlayType('audio/mpeg') || !!audio.canPlayType('audio/wav');
      setIsAudioSupported(supported);

      if (!supported) {
        toast({
          title: "Audio non supportato",
          description: "Il tuo browser non supporta la riproduzione audio",
          variant: "destructive",
        });
      }
    } catch (e) {
      setIsAudioSupported(false);
      toast({
        title: "Errore audio",
        description: "Impossibile verificare il supporto audio",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Clean up sounds on component unmount
  useEffect(() => {
    return () => {
      if (phoneRingSoundRef.current) {
        stopSound(phoneRingSoundRef.current);
      }
    };
  }, []);

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

      // Play phone ring sound
      phoneRingSoundRef.current = playPhoneRing();

      return () => {
        clearTimeout(timer);
        if (phoneRingSoundRef.current) {
          stopSound(phoneRingSoundRef.current);
        }
      };
    }

    if (gameState === 'ivr') {
      const timer = setTimeout(() => {
        setGameState('playing');
      }, 3000);

      // Play IVR sound
      playIvrSound();

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
            // Determine result - Increased win probability to 50%
            const isWinner = Math.random() < 0.5; // 50% chance to win (increased from 30%)
            let amount = 0;

            if (isWinner) {
              // 15% chance for jackpot (increased from 10%)
              const isJackpot = Math.random() < 0.15;
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
    playButtonClick();
    setGameState('connecting');
    setProgress(0);
    setResult(null);
  };

  const handlePlayAgain = () => {
    playButtonClick();
    setGameState('idle');
    setProgress(0);
    setResult(null);
  };

  const handleExit = () => {
    playButtonClick();
    navigate('/');
  };

  // Floating particles component for background effects
  const FloatingParticles = () => (
    <>
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-70"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -100, 0],
            x: [null, Math.random() * window.innerWidth],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingParticles />

        {/* Pulsing background circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-pink-500 opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <Card className="w-full max-w-lg relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader className="text-center relative">
          {/* Animated header decoration */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
              <Phone className="text-white h-8 w-8" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              MOB.LOTTO 4.0
            </CardTitle>
            <CardDescription className="text-white/80 mt-2">
              Simulazione del sistema di gioco telefonico
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="relative">
          {/* Audio status indicator */}
          {isAudioSupported !== null && (
            <div className="absolute top-4 right-4 z-20">
              {isAudioSupported ? (
                <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                  <Volume2 className="h-3 w-3" />
                  Audio attivo
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                  <VolumeX className="h-3 w-3" />
                  Audio disattivo
                </div>
              )}
            </div>
          )}

          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <motion.div
                    className="flex justify-center mb-6 relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      {/* Animated coin with floating effect */}
                      <motion.div
                        className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl"
                        animate={{
                          y: [0, -15, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Coins className="text-white h-16 w-16" />
                      </motion.div>

                      {/* Floating price tag */}
                      <motion.div
                        className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <span className="text-white text-sm font-bold">€1</span>
                      </motion.div>

                      {/* Sparkling effects */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{
                            top: `${20 + Math.random() * 60}%`,
                            left: `${20 + Math.random() * 60}%`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        >
                          <Star className="text-yellow-300 h-4 w-4" fill="currentColor" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.p
                    className="mb-6 text-white/90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Benvenuto nel sistema MOB.LOTTO 4.0. Premi il pulsante per simulare una chiamata.
                  </motion.p>

                  <motion.div
                    className="bg-white/10 backdrop-blur-sm p-4 rounded-xl mb-6 border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3 className="font-semibold mb-3 text-white flex items-center justify-center">
                      <Zap className="mr-2 h-5 w-5 text-yellow-300" />
                      Flusso di gioco:
                    </h3>
                    <ol className="text-sm space-y-2 list-decimal list-inside text-white/80">
                      <li>Connessione al sistema</li>
                      <li>Messaggio IVR di conferma</li>
                      <li>Estrazione casuale</li>
                      <li>Annuncio risultato</li>
                    </ol>
                  </motion.div>
                </div>

                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                    onClick={startGame}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Inizia a giocare
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExit}
                    className="border-white/30 text-white hover:bg-white/10"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Esci
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {gameState === 'connecting' && (
              <motion.div
                key="connecting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6 py-8"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                  className="mx-auto relative"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center shadow-xl">
                    <Phone className="text-white h-12 w-12" />
                  </div>

                  {/* Pulsing ring effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-cyan-400"
                    animate={{
                      scale: [1, 1.5, 2],
                      opacity: [0.7, 0.4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Connessione in corso...
                </motion.h3>

                <motion.p
                  className="text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Stiamo connettendo la tua chiamata al sistema MOB.LOTTO
                </motion.p>

                <div className="flex justify-center">
                  <div className="flex space-x-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-cyan-400 rounded-full"
                        animate={{
                          opacity: [0.4, 1, 0.4],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Animated connection lines */}
                <div className="relative h-16">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-0.5 bg-cyan-400 rounded-full"
                      style={{ width: "50px", top: `${i * 30}%`, left: "25%" }}
                      animate={{
                        x: [-20, 200],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {gameState === 'ivr' && (
              <motion.div
                key="ivr"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6 py-4"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="mx-auto relative"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-xl">
                    <Phone className="text-white h-12 w-12" />
                  </div>

                  {/* Floating sound waves */}
                  <motion.div
                    className="absolute -inset-4 rounded-full border-2 border-purple-400"
                    animate={{
                      scale: [1, 1.3, 1.6],
                      opacity: [0.7, 0.4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Messaggio IVR
                </motion.h3>

                <motion.div
                  className="bg-white/10 backdrop-blur-sm p-5 rounded-xl text-left border border-white/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.p className="mb-3 text-white">
                    <motion.strong
                      className="text-yellow-300"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Benvenuto a MOB.LOTTO 4.0
                    </motion.strong>
                  </motion.p>
                  <motion.p className="mb-3 text-white/90">
                    Il costo di questa chiamata è di <span className="text-green-400 font-bold">1 euro</span>.
                  </motion.p>
                  <motion.p className="text-white/90">
                    Per confermare di avere almeno 18 anni e partecipare, premi <span className="text-yellow-300 font-bold">3</span>.
                  </motion.p>
                </motion.div>

                <motion.p
                  className="text-white/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Simulazione del messaggio IVR...
                </motion.p>

                {/* Animated voice waves */}
                <div className="flex justify-center space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-purple-400 rounded-full"
                      style={{ height: `${Math.random() * 20 + 10}px` }}
                      animate={{
                        height: [null, Math.random() * 30 + 10, null],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6 py-4"
              >
                <motion.h3
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Estrazione in corso
                </motion.h3>

                <div className="relative flex justify-center">
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl relative overflow-hidden"
                  >
                    <Zap className="text-white h-16 w-16" />
                    {/* Inner rotating ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-white/30"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>

                  {/* Orbiting particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-yellow-300 rounded-full"
                      style={{
                        transform: `rotate(${i * 45}deg)`,
                        transformOrigin: "0 120px",
                      }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>

                <div className="relative">
                  <Progress value={progress} className="w-full h-4 bg-white/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-sm font-bold text-white"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {progress}%
                    </motion.span>
                  </div>
                </div>

                <motion.p
                  className="text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Determinazione del risultato...
                </motion.p>

                {/* Animated sparkles */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-300"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Star className="h-3 w-3" fill="currentColor" />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {gameState === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6 py-4 relative"
              >
                {result.isWinner ? (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                      className="mx-auto relative"
                    >
                      <div className="w-40 h-40 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl mx-auto relative overflow-hidden">
                        <Trophy className="text-white h-20 w-20" />
                        {/* Glowing effect */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-yellow-400 opacity-30"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      </div>

                      {/* Animated confetti */}
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
                            top: "20%",
                            left: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, window.innerHeight],
                            x: [0, (Math.random() - 0.5) * 100],
                            rotate: [0, 360],
                            opacity: [1, 0],
                          }}
                          transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}

                      {/* Animated star */}
                      <motion.div
                        className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 15, -15, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      >
                        <Star className="text-white h-6 w-6" fill="currentColor" />
                      </motion.div>
                    </motion.div>

                    <div>
                      <motion.h3
                        className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10
                        }}
                      >
                        HAI VINTO!
                      </motion.h3>

                      <motion.p
                        className="text-4xl font-bold mt-4 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        €{result.amount?.toLocaleString('it-IT')}
                      </motion.p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 p-5 rounded-xl border border-green-400/30 backdrop-blur-sm"
                    >
                      <motion.p className="text-green-100 font-medium">
                        Complimenti! Sei un vincitore fortunato.
                      </motion.p>
                      <motion.p className="text-sm text-green-200 mt-2">
                        Un operatore ti contatterà per le procedure di riscossione.
                      </motion.p>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex gap-3"
                    >
                      <Button
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                        onClick={handlePlayAgain}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Gioca ancora
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleExit}
                        className="border-white/30 text-white hover:bg-white/10"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Esci
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                      className="mx-auto relative"
                    >
                      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-center shadow-xl mx-auto">
                        <PhoneOff className="text-white h-16 w-16" />
                      </div>
                      {/* Subtle pulse effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gray-500 opacity-20"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-3xl font-bold text-red-400">RITENTA!</h3>
                      <p className="mt-3 text-white/90">Non hai vinto questa volta. Riprova per tentare la fortuna!</p>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-3"
                    >
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
                        onClick={handlePlayAgain}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Gioca ancora
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleExit}
                        className="border-white/30 text-white hover:bg-white/10"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Esci
                      </Button>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default Game;