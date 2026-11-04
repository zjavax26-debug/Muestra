import React from 'react';
import { PaletteName } from '../types/slade';
import { PALETTES } from '../data/mockArchives';
import { X, Check, Palette, Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activePalette: PaletteName;
  onSelectPalette: (palette: PaletteName) => void;
  onNotify: (msg: string) => void;
}

export const PaletteRemapModal: React.FC<Props> = ({
  isOpen,
  onClose,
  activePalette,
  onSelectPalette,
  onNotify
}) => {
  if (!isOpen) return null;

  // Generate 256 sample Doom palette swatches
  const dummyColors = [
    '#000000', '#1f170b', '#2b2317', '#372f1f', '#433b2b', '#4f4737', '#5b5343', '#675f4f',
    '#736b5b', '#7f7767', '#8b8373', '#978f7f', '#a39b8b', '#afa797', '#bbb3a3', '#c7bfaf',
    '#d3cbbb', '#dfd7c7', '#ebe3d3', '#f7efdf', '#fffbeb', '#bf251b', '#d93b30', '#f05a4f',
    '#38bdf8', '#0284c7', '#10b981', '#059669', '#eab308', '#ca8a04', '#a855f7', '#9333ea'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />

      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-10 select-none overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-sm font-bold text-neutral-100">Paleta Base de Renderizado</h3>
              <p className="text-[11px] text-neutral-400">Determina los 256 colores de sprites y texturas</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Palette list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {PALETTES.map((pal) => {
              const isSelected = pal.id === activePalette;
              return (
                <div
                  key={pal.id}
                  onClick={() => {
                    onSelectPalette(pal.id as PaletteName);
                    onNotify(`Paleta cambiada a: ${pal.name}`);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-rose-500/15 border-rose-500 text-neutral-100 shadow-sm'
                      : 'bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:bg-neutral-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3.5 h-3.5 rounded-full border border-neutral-700" 
                        style={{ backgroundColor: pal.colorHex }}
                      />
                      <span className="font-semibold text-xs text-neutral-200">{pal.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-rose-500" />}
                  </div>
                  <p className="text-[10px] text-neutral-500 leading-tight">{pal.desc}</p>
                </div>
              );
            })}
          </div>

          {/* 256 Color Swatch Visualizer */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-medium text-[11px]">Muestra de 256 Colores (PLAYPAL Lump):</span>
              <span className="text-[10px] font-mono text-neutral-500">256 Índices RGB</span>
            </div>
            <div className="grid grid-cols-16 gap-0.5 p-2 bg-neutral-950 rounded-xl border border-neutral-800">
              {Array.from({ length: 128 }).map((_, idx) => {
                const color = dummyColors[idx % dummyColors.length];
                return (
                  <div
                    key={idx}
                    className="w-full h-3 rounded-xs hover:scale-125 transition-transform cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={`Color #${idx}: ${color}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex justify-end gap-2">
          <button
            onClick={() => onNotify('Remapeado de paleta de jugador aplicado.')}
            className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-xl flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            Remapear Rangos (Translation)
          </button>
          <button
            onClick={onClose}
            className="py-2 px-5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-xl"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
