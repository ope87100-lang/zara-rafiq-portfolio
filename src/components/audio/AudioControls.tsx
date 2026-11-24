import { useEffect, useRef, useState } from 'react';
import { Music, Pause, Play, Volume2, VolumeX, SlidersHorizontal } from 'lucide-react';
import { useAudioPlayer } from '../../providers/AudioProvider';

/**
 * Header-integrated audio player with real Play/Pause, live Web Audio visualizer bars,
 * and a clean anchored popover for volume, mute, and playback progress — zero content overlap.
 */
export function HeaderAudioButton() {
  const {
    isPlaying,
    isMuted,
    volume,
    isAvailable,
    errorMessage,
    levels,
    trackTitle,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    setVolume,
  } = useAudioPlayer();

  const [panelOpen, setPanelOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPanelOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div ref={containerRef} className="relative flex items-center gap-1">
      <button
        type="button"
        onClick={() => void togglePlay()}
        disabled={!isAvailable}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Pause quiet background piano' : 'Play quiet background piano'}
        className={`inline-flex items-center gap-2 min-h-[44px] min-w-[44px] px-3 rounded-full border transition-colors text-xs font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          isPlaying
            ? 'border-[#F7D928]/65 bg-[#F7D928]/15 text-[#F7D928]'
            : 'border-white/15 bg-white/5 text-neutral-300 hover:border-white/35 hover:text-white'
        }`}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Music className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        )}
        <span className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
          {levels.slice(0, 4).map((lvl, idx) => (
            <span
              key={idx}
              className={`w-[2.5px] rounded-full transition-all duration-150 ${
                isPlaying ? 'bg-[#F7D928]' : 'bg-neutral-400'
              }`}
              style={{
                height: isPlaying ? `${Math.round(lvl * 14)}px` : '4px',
              }}
            />
          ))}
        </span>
        <span className="hidden xl:inline">{isPlaying ? 'Playing' : 'Music'}</span>
      </button>

      <button
        type="button"
        onClick={() => setPanelOpen((prev) => !prev)}
        aria-expanded={panelOpen}
        aria-label="Audio settings and volume"
        className="w-10 h-11 rounded-full border border-white/15 bg-white/5 text-neutral-300 hover:text-white hover:border-white/35 hidden sm:flex items-center justify-center transition-colors cursor-pointer"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
      </button>

      {panelOpen && (
        <div
          role="region"
          aria-label="Background music controls"
          className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 rounded-2xl bg-[#141412] border border-white/15 shadow-2xl p-4 text-[#F5F5F4] space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{trackTitle}</p>
              <p className="text-[11px] text-neutral-400">
                {!isAvailable ? 'Audio unavailable' : isPlaying ? 'Soft instrumental loop' : 'Paused'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void togglePlay()}
              disabled={!isAvailable}
              aria-label={isPlaying ? 'Pause track' : 'Play track'}
              className="w-9 h-9 rounded-full bg-[#F7D928] text-[#111111] flex items-center justify-center shrink-0 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>

          {errorMessage && (
            <p className="text-[11px] text-amber-300">{errorMessage}</p>
          )}

          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
            <div
              className="h-full bg-[#F7D928] transition-all duration-200"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
              className="w-9 h-9 rounded-lg border border-white/15 hover:border-white/30 flex items-center justify-center text-neutral-200 cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Volume2 className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
            <label className="sr-only" htmlFor="header-volume-slider">
              Background music volume
            </label>
            <input
              id="header-volume-slider"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-[#F7D928] cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/** Compact audio block for inside the Mobile Menu Drawer */
export function DrawerAudioControls() {
  const {
    isPlaying,
    isMuted,
    volume,
    isAvailable,
    trackTitle,
    togglePlay,
    toggleMute,
    setVolume,
  } = useAudioPlayer();

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">{trackTitle}</p>
          <p className="text-[11px] text-neutral-400">
            {!isAvailable ? 'Unavailable' : isPlaying ? 'Playing ambient piano' : 'Music off'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void togglePlay()}
          disabled={!isAvailable}
          aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
          className="w-10 h-10 rounded-full bg-[#F7D928] text-[#111111] flex items-center justify-center shrink-0 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-neutral-300 cursor-pointer"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Volume2 className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
        <input
          type="range"
          aria-label="Mobile background music volume"
          min={0}
          max={1}
          step={0.05}
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-[#F7D928] cursor-pointer"
        />
      </div>
    </div>
  );
}
