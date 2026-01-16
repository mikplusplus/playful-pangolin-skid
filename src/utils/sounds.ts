import { Howl } from 'howler';

export const playButtonClick = () => {
  const sound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'],
    volume: 0.5,
  });
  sound.play();
};

export const playPhoneRing = () => {
  const sound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-classic-phone-ring-904.mp3'],
    volume: 0.7,
    loop: true,
  });
  sound.play();
  return sound;
};

export const playWinSound = () => {
  const sound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'],
    volume: 0.8,
  });
  sound.play();
};

export const playLoseSound = () => {
  const sound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-losing-bleeps-2026.mp3'],
    volume: 0.6,
  });
  sound.play();
};

export const playProgressSound = () => {
  const sound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-electronic-retro-block-hit-2185.mp3'],
    volume: 0.3,
  });
  sound.play();
};

export const playIvrSound = () => {
  const sound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-phone-message-alert-900.mp3'],
    volume: 0.6,
  });
  sound.play();
};

export const stopSound = (sound: Howl) => {
  if (sound) {
    sound.stop();
  }
};