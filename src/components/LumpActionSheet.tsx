import React from 'react';
import { Lump } from '../types/slade';
import { 
  X, ExternalLink, Binary, RefreshCw, Move, 
  Download, Edit2, Trash2, Copy, FileText, Check
} from 'lucide-react';

interface Props {
  lump: Lump | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInNewTab: (lump: Lump) => void;
  onOpenHex: (lump: Lump) => void;
  onNotify: (msg: string) => void;
}

export const LumpActionSheet: React.FC<Props> = ({
  lump,
  isOpen,
  onClose,
  onOpenInNewTab,
  onOpenHex,
  onNotify
}) => {
  if (!isOpen || !lump) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Sheet Container (Android Bottom Sheet) */}
      <div className="relative w-full sm:max-w-md bg-neutral-900 border-t sm:border border-neutral-800 sm:rounded-2xl rounded-t-2xl shadow-2xl z-10 select-none overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Android drag handle indicator */}
        <div className="w-10 h-1 bg-neutral-700 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Header */}
        <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-neutral-100">{lump.name}</span>
              <span className="text-[10px] text-rose-400 font-mono bg-rose-950/60 border border-rose-800/40 px-1.5 py-0.5 rounded">
                {lump.format || lump.type}
              </span>
            </div>
            <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
              Tamaño: {lump.size} bytes · Offset: 0x{lump.offset.toString(16).toUpperCase()}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="p-2 space-y-1 text-xs">
          <button
            onClick={() => {
              onOpenInNewTab(lump);
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-200 hover:bg-neutral-800 text-left transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-rose-400" />
            <span>Abrir en Nueva Pestaña</span>
          </button>

          <button
            onClick={() => {
              onOpenHex(lump);
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-200 hover:bg-neutral-800 text-left transition-colors"
          >
            <Binary className="w-4 h-4 text-purple-400" />
            <span>Ver Estructura Hexadecimal (Raw Bytes)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNotify(`Formato de "${lump.name}" convertido a PNG/WAV.`);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-200 hover:bg-neutral-800 text-left transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span>Convertir Formato (PNG / WAV)</span>
          </button>

          {lump.type === 'sprite' && (
            <button
              onClick={() => {
                onClose();
                onNotify('Editor de Offsets activado');
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-200 hover:bg-neutral-800 text-left transition-colors"
            >
              <Move className="w-4 h-4 text-sky-400" />
              <span>Modificar Offsets X / Y</span>
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              onNotify(`Exportado "${lump.name}" a /sdcard/Download/`);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-200 hover:bg-neutral-800 text-left transition-colors"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Exportar Lump a Almacenamiento</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(lump.name);
              onClose();
              onNotify(`Nombre "${lump.name}" copiado.`);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-200 hover:bg-neutral-800 text-left transition-colors"
          >
            <Copy className="w-4 h-4 text-neutral-400" />
            <span>Copiar Nombre del Lump</span>
          </button>

          <div className="h-[1px] bg-neutral-800 my-1" />

          <button
            onClick={() => {
              onClose();
              onNotify(`Lump "${lump.name}" eliminado del WAD en memoria.`);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-950/40 text-left transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Eliminar Lump</span>
          </button>
        </div>
      </div>
    </div>
  );
};
