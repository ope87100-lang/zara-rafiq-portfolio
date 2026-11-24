import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextValue {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isAvailable: boolean;
  errorMessage: string | null;
  levels: number[];
  trackTitle: string;
  togglePlay: () => Promise<void>;
  pause: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
}

const AudioPlayerContext = createContext<AudioContextValue | null>(null);

const STORAGE_VOLUME_KEY = 'zara_portfolio_audio_volume';
const STORAGE_MUTED_KEY = 'zara_portfolio_audio_muted';
const AUDIO_SRC = '/audio/ambient-piano.mp3';
const DEFAULT_LEVELS = [0.22, 0.35, 0.28, 0.4, 0.25];

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceConnectedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_MUTED_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [volume, setVolumeState] = useState<number>(() => {
    try {
      const saved = parseFloat(localStorage.getItem(STORAGE_VOLUME_KEY) || '0.45');
      return Number.isFinite(saved) ? Math.min(1, Math.max(0, saved)) : 0.45;
    } catch {
      return 0.45;
    }
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [levels, setLevels] = useState<number[]>(DEFAULT_LEVELS);

  // Initialize persistent HTMLAudioElement once
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = 'metadata';
    audio.volume = volume;
    audio.muted = isMuted;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsAvailable(true);
      setErrorMessage(null);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setIsAvailable(false);
      setIsPlaying(false);
      setErrorMessage('Background audio file is currently unavailable.');
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Sync mute & volume preferences
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
    try {
      localStorage.setItem(STORAGE_VOLUME_KEY, String(volume));
      localStorage.setItem(STORAGE_MUTED_KEY, String(isMuted));
    } catch {
      // Ignore storage failures in restricted browsing contexts
    }
  }, [volume, isMuted]);

  // Real Web Audio API analyser loop while playing
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setLevels(DEFAULT_LEVELS);
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) {
      return;
    }

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(dataArray);
      const bucketCount = 5;
      const step = Math.max(1, Math.floor(dataArray.length / (bucketCount * 2)));
      const next: number[] = [];
      for (let i = 0; i < bucketCount; i++) {
        const val = dataArray[i * step] ?? 0;
        next.push(Math.max(0.18, Math.min(1, val / 190)));
      }
      setLevels(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying]);

  const ensureAudioGraph = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!sourceConnectedRef.current && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          const ctx = new AudioCtx();
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          const source = ctx.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(ctx.destination);
          audioCtxRef.current = ctx;
          analyserRef.current = analyser;
          sourceConnectedRef.current = true;
        } catch {
          // Graceful fallback to direct HTMLAudioElement playback without analyser
        }
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      try {
        await audioCtxRef.current.resume();
      } catch {
        // Ignore resume rejection
      }
    }
  }, []);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !isAvailable) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      await ensureAudioGraph();
      await audio.play();
      setErrorMessage(null);
    } catch {
      setErrorMessage('Audio playback requires direct user interaction.');
      setIsPlaying(false);
    }
  }, [ensureAudioGraph, isAvailable, isPlaying]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.min(1, Math.max(0, vol));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentTime,
        duration,
        isAvailable,
        errorMessage,
        levels,
        trackTitle: 'Quiet Focus — Soft Piano',
        togglePlay,
        pause,
        toggleMute,
        setVolume,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error('useAudioPlayer must be used inside AudioProvider');
  }
  return ctx;
}
