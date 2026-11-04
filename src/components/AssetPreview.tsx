import React, { useState } from 'react';
import { Lump, PaletteName } from '../types/slade';
import { SpriteInspector } from './SpriteInspector';
import { AudioPlayerPreview } from './AudioPlayerPreview';
import { ScriptEditorPreview } from './ScriptEditorPreview';
import { TextureEditorPreview } from './TextureEditorPreview';
import { HexViewerPreview } from './HexViewerPreview';
import { Eye, FileCode, Music, Image, Binary, Layers, MapPin, Sparkles } from 'lucide-react';

interface Props {
  lump?: Lump;
  activePalette: PaletteName;
  onSelectPalette: (palette: PaletteName) => void;
  onOpenPaletteModal: () => void;
  onNotify: (msg: string) => void;
}

export const AssetPreview: React.FC<Props> = ({
  lump,
  activePalette,
  onSelectPalette,
  onOpenPaletteModal,
  onNotify
}) => {
  const [viewMode, setViewMode] = useState<'standard' | 'hex'>('standard');

  if (!lump) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-neutral-900/50 text-neutral-500">
        <Eye className="w-12 h-12 stroke-[1.5] mb-3 opacity-30 text-rose-500" />
        <h3 className="text-sm font-semibold text-neutral-300">Ningún lump seleccionado</h3>
        <p className="text-xs max-w-xs mt-1 text-neutral-500">
          Selecciona un sprite, sonido, script o textura en el explorador de archivos WAD para previsualizarlo.
        </p>
      </div>
    );
  }

  // If user forced hex view for any lump
  if (viewMode === 'hex') {
    return (
      <div className="flex-1 flex flex-col h-full">
        <div className="flex justify-end p-1.5 bg-neutral-950 border-b border-neutral-800">
          <button
            onClick={() => setViewMode('standard')}
            className="text-[11px] text-rose-400 hover:text-rose-300 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800"
          >
            ← Volver a Vista de Recurso
          </button>
        </div>
        <HexViewerPreview lump={lump} onNotify={onNotify} />
      </div>
    );
  }

  // Type-based dispatcher
  if (lump.type === 'sprite' || lump.type === 'flat' || lump.type === 'graphic') {
    return (
      <SpriteInspector
        lump={lump}
        activePalette={activePalette}
        onSelectPalette={onSelectPalette}
        onOpenPaletteModal={onOpenPaletteModal}
        onNotify={onNotify}
      />
    );
  }

  if (lump.type === 'sound' || lump.type === 'music') {
    return <AudioPlayerPreview lump={lump} onNotify={onNotify} />;
  }

  if (lump.type === 'text') {
    return <ScriptEditorPreview lump={lump} onNotify={onNotify} />;
  }

  if (lump.type === 'texture_def') {
    return <TextureEditorPreview lump={lump} onNotify={onNotify} />;
  }

  if (lump.type === 'map_header' || lump.type === 'map_data') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-neutral-950 text-neutral-400">
        <MapPin className="w-12 h-12 text-rose-500/80 mb-3" />
        <h3 className="text-base font-semibold text-neutral-200">{lump.name} (Cabecera de Mapa Doom)</h3>
        <p className="text-xs text-neutral-400 max-w-sm mt-1">
          Lump de geometría binaria de mapa (Things, Linedefs, Sidedefs, Sectors).
        </p>
        <div className="mt-4 p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-left font-mono text-xs text-neutral-300 max-w-xs space-y-1">
          <div>Tipo: Formato Doom Map (BSP)</div>
          <div>Tamaño: {lump.size > 0 ? `${lump.size} Bytes` : 'Marcador Cabecera'}</div>
          <div>Offset: 0x{lump.offset.toString(16).toUpperCase()}</div>
        </div>
        <button
          onClick={() => setViewMode('hex')}
          className="mt-4 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-lg flex items-center gap-1.5 active:scale-95"
        >
          <Binary className="w-3.5 h-3.5 text-rose-400" />
          Ver Estructura Hexadecimal
        </button>
      </div>
    );
  }

  // Default to Hex viewer for raw/unknown lumps
  return <HexViewerPreview lump={lump} onNotify={onNotify} />;
};
