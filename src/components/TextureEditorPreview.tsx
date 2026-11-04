import React, { useState } from 'react';
import { Lump } from '../types/slade';
import { Layers, Plus, Eye, Move, Check, Download } from 'lucide-react';

interface Props {
  lump: Lump;
  onNotify: (msg: string) => void;
}

export const TextureEditorPreview: React.FC<Props> = ({ lump, onNotify }) => {
  const textureData = lump.textureData ?? {
    width: 128,
    height: 128,
    patches: [
      { name: 'W94_1', x: 0, y: 0, width: 64, height: 128, color: '#887b64' },
      { name: 'W94_2', x: 64, y: 0, width: 64, height: 128, color: '#6e6350' },
      { name: 'VENT1', x: 32, y: 32, width: 64, height: 64, color: '#383633' }
    ]
  };

  const [selectedPatch, setSelectedPatch] = useState<number>(0);

  return (
    <div className="flex flex-col h-full bg-neutral-900 select-none">
      {/* Top Bar info */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-950/80 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-rose-400" />
          <span className="font-mono font-semibold text-neutral-100">{lump.name}</span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-400 font-mono">{textureData.width}×{textureData.height} px</span>
        </div>
        <span className="text-neutral-400 text-[11px] font-mono">{textureData.patches.length} Parches</span>
      </div>

      {/* Main Texture Canvas Viewport */}
      <div className="flex-1 flex items-center justify-center p-6 bg-neutral-950/90 overflow-auto">
        <div className="flex flex-col items-center gap-3">
          {/* Composite Texture Canvas */}
          <div 
            className="relative border-2 border-neutral-700 shadow-2xl bg-black"
            style={{ 
              width: `${textureData.width * 1.5}px`, 
              height: `${textureData.height * 1.5}px` 
            }}
          >
            {textureData.patches.map((patch, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPatch(idx)}
                className={`absolute transition-all cursor-pointer ${
                  selectedPatch === idx ? 'ring-2 ring-rose-500 z-10' : 'hover:opacity-90'
                }`}
                style={{
                  left: `${patch.x * 1.5}px`,
                  top: `${patch.y * 1.5}px`,
                  width: `${patch.width * 1.5}px`,
                  height: `${patch.height * 1.5}px`,
                  backgroundColor: patch.color
                }}
              >
                <span className="absolute top-1 left-1 text-[9px] font-mono text-white/80 bg-black/50 px-1 rounded">
                  {patch.name}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-neutral-500 font-mono">
            Composición TEXTURE1/TEXTURE2 de Doom Engine
          </div>
        </div>
      </div>

      {/* Patch List / Layer Breakdown */}
      <div className="p-3 bg-neutral-950 border-t border-neutral-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-400 font-medium">Capas de Patches:</span>
          <button
            onClick={() => onNotify('Añadir nuevo parche a la composición')}
            className="text-rose-400 hover:text-rose-300 text-[11px] flex items-center gap-1 font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            Añadir Parche
          </button>
        </div>

        <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
          {textureData.patches.map((patch, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPatch(idx)}
              className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                selectedPatch === idx 
                  ? 'bg-rose-500/15 border border-rose-500/40 text-neutral-100' 
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:bg-neutral-850'
              }`}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-sm border border-neutral-600" 
                  style={{ backgroundColor: patch.color }}
                />
                <span className="font-mono font-medium">{patch.name}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500">
                <span>Pos: [{patch.x}, {patch.y}]</span>
                <span>·</span>
                <span>{patch.width}×{patch.height}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onNotify(`Textura ${lump.name} guardada en TEXTURE1 lump.`)}
            className="w-full py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-medium flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
            Guardar Composición en TEXTURE1
          </button>
        </div>
      </div>
    </div>
  );
};
