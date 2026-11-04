/**
 * Retro Doom-style Web Audio synthesizer helper for SLADE 3 Mobile
 * Simulates OPL3 / Sound Canvas FM chiptune & sound effects for lumps
 */

let audioCtx: AudioContext | null = null;
let currentNotesTimer: number | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playDoomSoundEffect(effectName: string): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (effectName.includes('PISTOL')) {
      // Pistol gunshot: fast noise + square punch
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (effectName.includes('SHOTGN')) {
      // Shotgun blast: low boom + reload click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);

      // Reload click after 0.5s
      setTimeout(() => {
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'square';
        clickOsc.frequency.setValueAtTime(800, ctx.currentTime);
        clickGain.gain.setValueAtTime(0.2, ctx.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start();
        clickOsc.stop(ctx.currentTime + 0.1);
      }, 500);
    } else if (effectName.includes('SECRET')) {
      // Secret chord chime (D - F# - A - C#)
      const freqs = [587.33, 739.99, 880.00, 1108.73];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(0.25, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + 1.3);
      });
    } else {
      // Generic blip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    }
  } catch (err) {
    console.warn('Audio playback not permitted or unavailable:', err);
  }
}

export function playDoomMusicRiff(
  trackName: string, 
  onNoteTick?: (freq: number) => void,
  onStop?: () => void
): () => void {
  try {
    const ctx = getAudioContext();
    stopAudioPlayback();

    // Iconic Doom Riff (E1M1 / D_RUNNIN notes)
    // E2, E2, E3, E2, E2, D3, E2, E2, C3, E2, E2, Bb2, B2...
    const e1m1Notes = [
      82.41, 82.41, 164.81, 82.41, 82.41, 146.83, 82.41, 82.41, 
      130.81, 82.41, 82.41, 116.54, 123.47, 82.41, 82.41, 164.81
    ];
    
    // D_RUNNIN riff
    const runninNotes = [
      110.0, 130.81, 146.83, 164.81, 196.0, 164.81, 146.83, 130.81,
      110.0, 110.0, 220.0, 196.0, 164.81, 146.83, 130.81, 98.0
    ];

    const notes = trackName.includes('RUNNIN') ? runninNotes : e1m1Notes;
    let step = 0;

    const interval = window.setInterval(() => {
      const noteFreq = notes[step % notes.length];
      const now = ctx.currentTime;

      // FM Bass Oscillator pair (carrier + modulator for OPL-3 vibe)
      const carrier = ctx.createOscillator();
      const mod = ctx.createOscillator();
      const modGain = ctx.createGain();
      const masterGain = ctx.createGain();

      carrier.type = 'sawtooth';
      carrier.frequency.setValueAtTime(noteFreq, now);

      mod.type = 'sine';
      mod.frequency.setValueAtTime(noteFreq * 2, now);
      modGain.gain.setValueAtTime(80, now);
      modGain.gain.exponentialRampToValueAtTime(5, now + 0.12);

      mod.connect(modGain);
      modGain.connect(carrier.frequency);

      masterGain.gain.setValueAtTime(0.25, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      carrier.connect(masterGain);
      masterGain.connect(ctx.destination);

      mod.start(now);
      carrier.start(now);
      mod.stop(now + 0.18);
      carrier.stop(now + 0.18);

      if (onNoteTick) {
        onNoteTick(noteFreq);
      }

      step++;
      if (step >= 32) {
        stopAudioPlayback();
        if (onStop) onStop();
      }
    }, 175);

    currentNotesTimer = interval;

    return () => {
      clearInterval(interval);
      if (currentNotesTimer === interval) {
        currentNotesTimer = null;
      }
    };
  } catch {
    return () => {};
  }
}

export function stopAudioPlayback(): void {
  if (currentNotesTimer !== null) {
    clearInterval(currentNotesTimer);
    currentNotesTimer = null;
  }
}
