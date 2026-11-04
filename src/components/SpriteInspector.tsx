import React, { useState } from 'react';
import { Lump, PaletteName } from '../types/slade';
import { ZoomIn, ZoomOut, Maximize2, Move, Grid, Check, Download, RefreshCw, Crosshair, Sparkles } from 'lucide-react';

interface Props {
  lump: Lump;
  activePalette: PaletteName;
  onSelectPalette: (palette: PaletteName) => void;
  onOpenPaletteModal: () => void;
  onNotify: (msg: string) => void;
}

export const SpriteInspector: React.FC<Props> = ({
  lump,
  activePalette,
  onSelectPalette,
  onOpenPaletteModal,
  onNotify
}) => {
  const [zoom, setZoom] = useState<number>(3);
  const [showCrosshair, setShowCrosshair] = useState<boolean>(true);
  const [bgPattern, setBgPattern] = useState<'checker-dark' | 'checker-light' | 'black' | 'slate'>('checker-dark');
  const [offsetX, setOffsetX] = useState<number>(lump.spriteData?.offsetX ?? 28);
  const [offsetY, setOffsetY] = useState<number>(lump.spriteData?.offsetY ?? 62);
  const [mirrored, setMirrored] = useState<boolean>(false);

  const spriteData = lump.spriteData ?? {
    width: 64,
    height: 64,
    offsetX: 32,
    offsetY: 60,
    colorCount: 64,
    svgPreviewType: 'shotgunner' as const
  };

  // Palette color filters
  const getFilterStyle = (): React.CSSProperties => {
    switch (activePalette) {
      case 'greyscale':
        return { filter: 'grayscale(100%) contrast(1.15)' };
      case 'red_tint':
        return { filter: 'sepia(100%) hue-rotate(320deg) saturate(350%) brightness(0.95)' };
      case 'nightvision':
        return { filter: 'sepia(100%) hue-rotate(80deg) saturate(400%) brightness(1.2)' };
      case 'radsuit':
        return { filter: 'sepia(90%) hue-rotate(25deg) saturate(300%)' };
      case 'heretic':
        return { filter: 'hue-rotate(210deg) saturate(120%)' };
      case 'hexen':
        return { filter: 'hue-rotate(260deg) saturate(90%) contrast(1.1)' };
      case 'strife':
        return { filter: 'sepia(50%) hue-rotate(15deg) contrast(1.2)' };
      default:
        return {};
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900 select-none">
      {/* Top Inspector Sub-toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-950/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-rose-400">{lump.name}</span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-400 font-mono">{spriteData.width}×{spriteData.height} px</span>
          <span className="hidden sm:inline text-neutral-500">·</span>
          <span className="hidden sm:inline text-neutral-400">Offset: [{offsetX}, {offsetY}]</span>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom(prev => Math.max(1, prev - 1))}
            className="p-1.5 hover:bg-neutral-800 rounded text-neutral-300 active:scale-95 transition-transform"
            title="Reducir Zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-neutral-300 px-1">{zoom}x</span>
          <button
            onClick={() => setZoom(prev => Math.min(8, prev + 1))}
            className="p-1.5 hover:bg-neutral-800 rounded text-neutral-300 active:scale-95 transition-transform"
            title="Aumentar Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="h-4 w-[1px] bg-neutral-800 mx-1" />

          <button
            onClick={() => setShowCrosshair(!showCrosshair)}
            className={`p-1.5 rounded transition-colors ${showCrosshair ? 'bg-rose-500/20 text-rose-400' : 'text-neutral-400 hover:bg-neutral-800'}`}
            title="Mostrar Cruz de Offset y Suelo"
          >
            <Crosshair className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const bgs: Array<'checker-dark' | 'checker-light' | 'black' | 'slate'> = ['checker-dark', 'checker-light', 'black', 'slate'];
              const nextIdx = (bgs.indexOf(bgPattern) + 1) % bgs.length;
              setBgPattern(bgs[nextIdx]);
            }}
            className="p-1.5 hover:bg-neutral-800 rounded text-neutral-400 active:scale-95 transition-transform"
            title="Alternar fondo (Tablero / Negro / Claro)"
          >
            <Grid className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMirrored(!mirrored)}
            className={`p-1.5 rounded transition-colors ${mirrored ? 'bg-sky-500/20 text-sky-400' : 'text-neutral-400 hover:bg-neutral-800'}`}
            title="Reflejar Horizontalmente"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Pixel Canvas Viewport */}
      <div 
        className={`relative flex-1 flex items-center justify-center overflow-auto p-6 ${
          bgPattern === 'checker-dark' 
            ? 'bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] bg-neutral-950'
            : bgPattern === 'checker-light'
            ? 'bg-neutral-300 [background-image:linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] [background-size:20px_20px] [background-position:0_0,0_10px,10px_-10px,-10px_0px]'
            : bgPattern === 'black'
            ? 'bg-black'
            : 'bg-neutral-800'
        }`}
      >
        <div 
          className="relative transition-transform duration-100 flex items-center justify-center"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Sprite SVG Art */}
          <div 
            className="pixelated drop-shadow-md select-none transition-transform"
            style={{ 
              ...getFilterStyle(),
              transform: mirrored ? 'scaleX(-1)' : 'none'
            }}
          >
            {renderSpriteArt(spriteData.svgPreviewType, spriteData.width, spriteData.height)}
          </div>

          {/* Crosshair & Monster Ground Alignment Marker */}
          {showCrosshair && (
            <div 
              className="absolute pointer-events-none"
              style={{
                left: `${offsetX}px`,
                top: `${offsetY}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Center point */}
              <div className="w-2.5 h-2.5 border border-rose-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
              {/* Horizontal crosshair */}
              <div className="absolute top-0 left-[-20px] right-[-20px] h-[1px] bg-rose-500/70" />
              {/* Vertical crosshair */}
              <div className="absolute top-[-20px] bottom-[-20px] left-0 w-[1px] bg-rose-500/70" />
              {/* Floor baseline badge */}
              <div className="absolute top-1 left-2 whitespace-nowrap bg-neutral-900/90 text-[7px] text-rose-300 font-mono px-1 rounded border border-rose-500/30">
                Línea de Suelo [{offsetX}, {offsetY}]
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sub-Panels: Sprite Offsets & Palette Selector Bar */}
      <div className="p-3 bg-neutral-950 border-t border-neutral-800 space-y-2.5">
        {/* Quick Palette Strip */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <span className="font-medium text-neutral-300">Paleta base:</span>
            <span className="text-rose-400 font-mono capitalize">{activePalette.replace('_', ' ')}</span>
          </div>
          <button 
            onClick={onOpenPaletteModal}
            className="text-neutral-400 hover:text-white flex items-center gap-1 text-[11px] underline underline-offset-2"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            Cambiar Paleta...
          </button>
        </div>

        {/* Offset adjustment bar (Crucial SLADE feature for Doom modders) */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-900/80 p-2 rounded-lg border border-neutral-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400 font-mono text-[11px]">X:</span>
              <button 
                onClick={() => setOffsetX(prev => prev - 1)}
                className="w-6 h-6 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200 active:scale-95"
              >
                -
              </button>
              <span className="font-mono text-neutral-100 min-w-[28px] text-center">{offsetX}</span>
              <button 
                onClick={() => setOffsetX(prev => prev + 1)}
                className="w-6 h-6 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200 active:scale-95"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400 font-mono text-[11px]">Y:</span>
              <button 
                onClick={() => setOffsetY(prev => prev - 1)}
                className="w-6 h-6 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200 active:scale-95"
              >
                -
              </button>
              <span className="font-mono text-neutral-100 min-w-[28px] text-center">{offsetY}</span>
              <button 
                onClick={() => setOffsetY(prev => prev + 1)}
                className="w-6 h-6 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200 active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setOffsetX(Math.round(spriteData.width / 2));
                setOffsetY(spriteData.height);
                onNotify('Offset auto-alineado: Monstruo (Pies en suelo)');
              }}
              className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] rounded"
            >
              Pies de Monstruo
            </button>
            <button
              onClick={() => {
                setOffsetX(Math.round(spriteData.width / 2));
                setOffsetY(Math.round(spriteData.height / 2));
                onNotify('Offset auto-alineado: Centro (Proyectil/Ítem)');
              }}
              className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] rounded"
            >
              Centrar
            </button>
          </div>
        </div>

        {/* Mobile quick actions */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={() => onNotify(`Lump "${lump.name}" convertido a PNG (32-bit RGBA)`)}
            className="flex-1 py-1.5 px-3 bg-neutral-800 hover:bg-neutral-700 rounded text-xs font-medium text-neutral-200 flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
            Convertir a PNG
          </button>

          <button
            onClick={() => onNotify(`Exportando ${lump.name}.png a /sdcard/Download/`)}
            className="flex-1 py-1.5 px-3 bg-rose-600 hover:bg-rose-500 rounded text-xs font-medium text-white flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar Lump
          </button>
        </div>
      </div>
    </div>
  );
};

// Render pixel-art SVG sprites authentic to Doom's aesthetics
function renderSpriteArt(type: string, width: number, height: number) {
  if (type === 'cacodemon') {
    // Iconic Red Flying Cacodemon with one big blue eye
    return (
      <svg width={width} height={height} viewBox="0 0 72 74" className="overflow-visible">
        {/* Body sphere */}
        <circle cx="36" cy="37" r="32" fill="#bf251b" stroke="#7a140d" strokeWidth="2" />
        <circle cx="36" cy="37" r="28" fill="#d93b30" />
        <ellipse cx="28" cy="24" rx="14" ry="10" fill="#f05a4f" opacity="0.6" />
        {/* Horns */}
        <path d="M 12 18 L 8 4 L 20 12 Z" fill="#8c7853" stroke="#4a3e28" strokeWidth="1" />
        <path d="M 60 18 L 64 4 L 52 12 Z" fill="#8c7853" stroke="#4a3e28" strokeWidth="1" />
        <path d="M 28 8 L 30 0 L 36 6 Z" fill="#bfa77a" />
        <path d="M 44 8 L 42 0 L 36 6 Z" fill="#bfa77a" />
        {/* Eye */}
        <ellipse cx="36" cy="30" rx="13" ry="11" fill="#1e3a8a" stroke="#000" strokeWidth="2" />
        <ellipse cx="36" cy="30" rx="9" ry="7" fill="#38bdf8" />
        <circle cx="36" cy="30" r="4" fill="#0369a1" />
        <circle cx="38" cy="28" r="2" fill="#ffffff" />
        {/* Grinning mouth with teeth */}
        <path d="M 18 48 Q 36 66 54 48 Q 36 54 18 48 Z" fill="#171717" />
        {/* Top teeth */}
        <polygon points="22,48 24,53 26,48" fill="#e5e5e5" />
        <polygon points="28,49 31,55 33,49" fill="#e5e5e5" />
        <polygon points="35,50 38,56 40,50" fill="#e5e5e5" />
        <polygon points="42,49 45,54 47,49" fill="#e5e5e5" />
        <polygon points="49,48 51,52 53,48" fill="#e5e5e5" />
        {/* Blue electrical plasma sparks */}
        <circle cx="16" cy="38" r="3" fill="#38bdf8" opacity="0.8" />
        <circle cx="56" cy="38" r="3" fill="#38bdf8" opacity="0.8" />
      </svg>
    );
  }

  if (type === 'doomguy') {
    // Doom Marine Helmet & Armor
    return (
      <svg width={width} height={height} viewBox="0 0 48 60">
        {/* Helmet */}
        <ellipse cx="24" cy="18" rx="14" ry="12" fill="#4d533c" stroke="#25291b" strokeWidth="1.5" />
        <rect x="14" y="14" width="20" height="9" rx="2" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
        {/* Visor */}
        <path d="M 16 16 L 32 16 L 30 21 L 18 21 Z" fill="#38bdf8" />
        <rect x="20" y="17" width="5" height="2" fill="#ffffff" opacity="0.8" />
        {/* Torso & Green Armor */}
        <rect x="13" y="27" width="22" height="18" rx="3" fill="#4d533c" stroke="#25291b" strokeWidth="1.5" />
        <rect x="18" y="29" width="12" height="12" fill="#656e4f" />
        {/* Arms & Hands */}
        <rect x="8" y="28" width="5" height="16" fill="#8c7853" />
        <rect x="35" y="28" width="5" height="16" fill="#8c7853" />
        {/* Belt & Ammo */}
        <rect x="13" y="44" width="22" height="4" fill="#2d2a24" />
        {/* Legs */}
        <rect x="15" y="48" width="7" height="11" fill="#736652" stroke="#332a1f" strokeWidth="1" />
        <rect x="26" y="48" width="7" height="11" fill="#736652" stroke="#332a1f" strokeWidth="1" />
      </svg>
    );
  }

  // Default: Shotgunner (SPOSF1 frame)
  return (
    <svg width={width} height={height} viewBox="0 0 58 64">
      {/* Helmet / Head */}
      <circle cx="28" cy="14" r="8" fill="#848e70" stroke="#373d2d" strokeWidth="1.5" />
      <rect x="22" y="12" width="12" height="4" fill="#1c1917" />
      {/* Red eye goggles */}
      <circle cx="26" cy="13" r="1.5" fill="#ef4444" />
      <circle cx="31" cy="13" r="1.5" fill="#ef4444" />
      {/* Body / Vest */}
      <rect x="19" y="22" width="18" height="20" rx="2" fill="#585c49" stroke="#2c3024" strokeWidth="1.5" />
      <rect x="22" y="24" width="12" height="15" fill="#70765c" />
      {/* Shotgun in hands firing */}
      <rect x="14" y="32" width="30" height="4" fill="#262626" stroke="#0a0a0a" strokeWidth="1" />
      <rect x="12" y="31" width="8" height="7" fill="#694e2e" />
      {/* Muzzle flash glow on frame F1 */}
      <polygon points="44,34 56,27 52,34 57,41" fill="#facc15" />
      <circle cx="48" cy="34" r="4" fill="#fb923c" />
      <circle cx="46" cy="34" r="2" fill="#ffffff" />
      {/* Legs & Combat boots */}
      <rect x="18" y="42" width="7" height="18" fill="#4d443a" stroke="#241e17" strokeWidth="1" />
      <rect x="31" y="42" width="7" height="18" fill="#4d443a" stroke="#241e17" strokeWidth="1" />
      <rect x="16" y="58" width="10" height="5" fill="#171717" />
      <rect x="31" y="58" width="10" height="5" fill="#171717" />
    </svg>
  );
}
