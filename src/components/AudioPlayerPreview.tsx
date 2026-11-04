import React, { useState, useEffect, useRef } from 'react';
import { Lump } from '../types/slade';
import { Play, Pause, Square, Repeat, Volume2, Music, Radio, Download, Settings2, Sliders } from 'lucide-react';
import { playDoomMusicRiff, playDoomSoundEffect, stopAudioPlayback } from '../utils/audioSynth';
import { SOUNDFONTS } from '../data/mockArchives';

interface Props {
  lump: Lump;
  onNotify: (msg: string) => void;
}

export const AudioPlayerPreview: React.FC<Props> = ({ lump, onNotify }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(85);
  const [activeSoundfont, setActiveSoundfont] = useState<string>('sc55');
  const [activeFreq, setActiveFreq] = useState<number>(0);
  const stopFnRef = useRef<(() => void) | null>(null);

  const audioData = lump.audioData ?? {
    duration: '0:0.65',
    sampleRate: 11025,
    channels: 'Mono 8-bit',
    format: 'DMX Sound' as const,
    soundfont: 'General MIDI'
  };

  const isMusic = lump.type === 'music';

  const handlePlayToggle = () => {
    if (isPlaying) {
      if (stopFnRef.current) stopFnRef.current();
      stopAudioPlayback();
      setIsPlaying(false);
      setActiveFreq(0);
    } else {
      setIsPlaying(true);
      if (isMusic) {
        const stop = playDoomMusicRiff(
          lump.name,
          (freq) => setActiveFreq(freq),
          () => {
            if (!isLooping) {
              setIsPlaying(false);
              setActiveFreq(0);
            }
          }
        );
        stopFnRef.current = stop;
      } else {
        // Sound effect (Pistol, Shotgun, Secret)
        playDoomSoundEffect(lump.name);
        setTimeout(() => {
          setIsPlaying(false);
        }, 800);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (stopFnRef.current) stopFnRef.current();
      stopAudioPlayback();
    };
  }, [lump.id]);

  return (
    <div className="flex flex-col h-full bg-neutral-900 select-none">
      {/* Top Bar info */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-950/80 text-xs">
        <div className="flex items-center gap-2">
          <Music className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono font-semibold text-neutral-100">{lump.name}</span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-400">{audioData.format}</span>
        </div>
        <span className="font-mono text-neutral-400 text-[11px]">{audioData.duration}</span>
      </div>

      {/* Main Waveform / Visualizer Deck */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-neutral-950 to-neutral-900">
        {/* Cassette / Audio Hub Graphic */}
        <div className="w-full max-w-sm bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-2xl flex flex-col items-center gap-4">
          <div className="w-full flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-mono tracking-wider text-[11px] uppercase">
                {isMusic ? 'MIDI SYNTH EMULATOR' : 'DMX 8-BIT SAMPLE'}
              </span>
            </div>
            <span className="font-mono text-neutral-500">{audioData.sampleRate} Hz</span>
          </div>

          {/* Dynamic Audio Visualizer Bars */}
          <div className="w-full h-24 bg-neutral-900/90 rounded-xl border border-neutral-800 flex items-end justify-between px-3 py-2 gap-1 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => {
              // Calculate animated height when playing
              const baseHeight = isPlaying 
                ? Math.min(95, Math.max(15, (Math.sin(i * 0.8 + (activeFreq || 100)) * 40 + 50) + (i % 3) * 10)) 
                : (i === 11 || i === 12 ? 8 : 4);

              return (
                <div
                  key={i}
                  className="w-full rounded-t transition-all duration-75"
                  style={{
                    height: `${baseHeight}%`,
                    backgroundColor: isPlaying
                      ? i > 18
                        ? '#ef4444'
                        : i > 12
                        ? '#f59e0b'
                        : '#10b981'
                      : '#3f3f46'
                  }}
                />
              );
            })}
          </div>

          {/* Time & progress bar */}
          <div className="w-full space-y-1">
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-rose-500 rounded-full transition-all duration-200 ${isPlaying ? 'w-2/3 animate-pulse' : 'w-0'}`} 
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-neutral-500">
              <span>{isPlaying ? '0:14' : '0:00'}</span>
              <span>{audioData.duration}</span>
            </div>
          </div>

          {/* Primary Playback Transport Controls */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-2 rounded-full transition-colors ${isLooping ? 'text-rose-400 bg-rose-500/10' : 'text-neutral-500 hover:text-neutral-300'}`}
              title="Alternar Bucle (Loop)"
            >
              <Repeat className="w-4 h-4" />
            </button>

            <button
              onClick={handlePlayToggle}
              className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-950/60 active:scale-95 transition-transform"
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={() => {
                if (stopFnRef.current) stopFnRef.current();
                stopAudioPlayback();
                setIsPlaying(false);
                setActiveFreq(0);
              }}
              className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 active:scale-95"
              title="Detener"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Soundfont / Synthesizer Config Bar */}
      <div className="p-3 bg-neutral-950 border-t border-neutral-800 space-y-2.5">
        {isMusic && (
          <div className="space-y-1">
            <label className="text-[11px] text-neutral-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-sky-400" />
                Sintetizador / Soundfont MIDI:
              </span>
              <span className="text-sky-400 font-mono text-[10px]">GZDoom Engine Ready</span>
            </label>
            <select
              value={activeSoundfont}
              onChange={(e) => {
                setActiveSoundfont(e.target.value);
                onNotify(`Sintetizador cambiado a: ${SOUNDFONTS.find(s => s.id === e.target.value)?.name}`);
              }}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-1.5 px-2.5 text-xs text-neutral-200 focus:outline-none focus:border-rose-500 font-medium"
            >
              {SOUNDFONTS.map(sf => (
                <option key={sf.id} value={sf.id}>
                  {sf.name} — {sf.type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Volume & Details */}
        <div className="flex items-center justify-between gap-3 bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/80 text-xs">
          <div className="flex items-center gap-2 flex-1">
            <Volume2 className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-rose-500 h-1.5 bg-neutral-800 rounded cursor-pointer"
            />
            <span className="font-mono text-[11px] text-neutral-400 min-w-[32px] text-right">{volume}%</span>
          </div>

          <div className="h-4 w-[1px] bg-neutral-800" />

          <button
            onClick={() => onNotify(`Exportando audio "${lump.name}.wav" a almacenamiento interno.`)}
            className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded flex items-center gap-1 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-rose-400" />
            Exportar WAV
          </button>
        </div>
      </div>
    </div>
  );
};
