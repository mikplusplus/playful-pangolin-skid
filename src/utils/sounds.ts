import { Howl } from 'howler';

// Controllo se il browser supporta l'audio
const isAudioSupported = () => {
  try {
    const audio = new Audio();
    return !!audio.canPlayType('audio/mpeg') || !!audio.canPlayType('audio/wav');
  } catch (e) {
    console.error('Audio not supported:', e);
    return false;
  }
};

// Funzione per gestire gli errori audio
const handleAudioError = (error: any) => {
  console.error('Audio playback error:', error);
};

// Suoni pre-caricati
let buttonClickSound: Howl | null = null;
let phoneRingSound: Howl | null = null;
let winSound: Howl | null = null;
let loseSound: Howl | null = null;
let progressSound: Howl | null = null;
let ivrSound: Howl | null = null;

// Pre-caricamento dei suoni
const preloadSounds = () => {
  if (!isAudioSupported()) {
    console.warn('Audio not supported in this browser');
    return;
  }

  try {
    buttonClickSound = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'],
      volume: 0.5,
      onloaderror: handleAudioError
    });

    phoneRingSound = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-classic-phone-ring-904.mp3'],
      volume: 0.7,
      loop: true,
      onloaderror: handleAudioError
    });

    winSound = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'],
      volume: 0.8,
      onloaderror: handleAudioError
    });

    loseSound = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-losing-bleeps-2026.mp3'],
      volume: 0.6,
      onloaderror: handleAudioError
    });

    progressSound = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-electronic-retro-block-hit-2185.mp3'],
      volume: 0.3,
      onloaderror: handleAudioError
    });

    ivrSound = new Howl({
      src: ['https://assets.mixkit.co/sfx/preview/mixkit-phone-message-alert-900.mp3'],
      volume: 0.6,
      onloaderror: handleAudioError
    });

    console.log('All sounds preloaded successfully');
  } catch (error) {
    console.error('Error preloading sounds:', error);
  }
};

// Pre-carica i suoni all'avvio
preloadSounds();

export const playButtonClick = () => {
  if (!isAudioSupported() || !buttonClickSound) return;
  try {
    buttonClickSound.stop();
    buttonClickSound.play();
  } catch (error) {
    handleAudioError(error);
  }
};

export const playPhoneRing = () => {
  if (!isAudioSupported() || !phoneRingSound) return null;
  try {
    phoneRingSound.stop();
    phoneRingSound.play();
    return phoneRingSound;
  } catch (error) {
    handleAudioError(error);
    return null;
  }
};

export const playWinSound = () => {
  if (!isAudioSupported() || !winSound) return;
  try {
    winSound.stop();
    winSound.play();
  } catch (error) {
    handleAudioError(error);
  }
};

export const playLoseSound = () => {
  if (!isAudioSupported() || !loseSound) return;
  try {
    loseSound.stop();
    loseSound.play();
  } catch (error) {
    handleAudioError(error);
  }
};

export const playProgressSound = () => {
  if (!isAudioSupported() || !progressSound) return;
  try {
    progressSound.stop();
    progressSound.play();
  } catch (error) {
    handleAudioError(error);
  }
};

export const playIvrSound = () => {
  if (!isAudioSupported() || !ivrSound) return;
  try {
    ivrSound.stop();
    ivrSound.play();
  } catch (error) {
    handleAudioError(error);
  }
};

export const stopSound = (sound: Howl | null) => {
  if (sound) {
    try {
      sound.stop();
    } catch (error) {
      handleAudioError(error);
    }
  }
};