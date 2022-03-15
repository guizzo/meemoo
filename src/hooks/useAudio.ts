import { useState } from 'react';

interface HookProps {
  touched: boolean;
  effectIsPlaying: boolean;
  startPlayMusic: () => void;
  stopPlayMusic: () => void;
  startWowEffect: () => void;
  startGoodEffect: () => void;
  startPoorEffect: () => void;
}

const useAudio = (): HookProps => {

  const [ touched, setTouched ] = useState<boolean>(false);
  const [ playMusic, setPlayMusic ] = useState<HTMLAudioElement | null>(null);
  const [ effectIsPlaying, setEffectIsPlaying ] = useState<boolean>(false);

  const startPlayMusic = (): void => {
    if (touched && !playMusic) {
      const audio = new Audio('/sounds/playing.mp3');
      audio.loop = true;
      audio.play().then(() => setPlayMusic(audio));
    }
  };

  const stopPlayMusic = (): void => {
    if (playMusic) {
      playMusic.pause();
    }
  };

  const startWowEffect = (): void => {
    const audio = new Audio('/sounds/wow.mp3');
    audio.play().then(() => setEffectIsPlaying(true));
  };

  const startGoodEffect = (): void => {
    const audio = new Audio('/sounds/good.mp3');
    audio.play().then(() => setEffectIsPlaying(true));
  };

  const startPoorEffect = (): void => {
    const audio = new Audio('/sounds/poor.mp3');
    audio.play().then(() => setEffectIsPlaying(true));
  };

  window.document.addEventListener('click', () => setTouched(true));

  return {
    touched,
    effectIsPlaying,
    startPlayMusic,
    stopPlayMusic,
    startWowEffect,
    startGoodEffect,
    startPoorEffect
  };

};

export default useAudio;
