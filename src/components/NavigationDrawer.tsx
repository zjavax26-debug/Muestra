import React from 'react';
import { ArchiveFile } from '../types/slade';
import { 
  FolderArchive, FilePlus, Save, Download, 
  Layers, Palette, Cpu, Settings, X, 
  HelpCircle, HardDrive, Music, Check, Sparkles
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  archives: ArchiveFile[];
  activeArchiveId: string;
  onSelectArchive: (archiveId: string) => void;
  onOpenBaseResourceModal: () => void;
  onOpenPaletteModal: () => void;
  onOpenAboutModal: () => void;
  onNotify: (msg: string) => void;
}

export const NavigationDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  archives,
  activeArchiveId,
  onSelectArchive,
  onOpenBaseResourceModal,
  onOpenPaletteModal,
  onOpenAboutModal,
  onNotify
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer surface (Android Material 3 Navigation Drawer) */}
      <div className="relative w-72 max-w-[85vw] h-full bg-neutral-900 border-r border-neutral-800 shadow-2xl flex flex-col z-10 select-none animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-b from-neutral-950 to-neutral-900 border-b border-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold font-mono text-sm shadow-md shadow-rose-950">
                S3
              </div>
              <div>
                <h2 className="text-sm font-bold text-neutral-100 tracking-tight">SLADE 3 Mobile</h2>
                <p className="text-[10px] text-neutral-400 font-mono">v3.2.4-android (ARM64)</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active IWAD Status Card */}
          <div 
            onClick={() => {
              onClose();
              onOpenBaseResourceModal();
            }}
            className="p-2.5 bg-neutral-950/90 rounded-xl border border-neutral-800/80 cursor-pointer hover:border-rose-500/50 transition-colors"
          >
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-neutral-400 font-medium">Recurso Base (IWAD):</span>
              <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                <Check className="w-3 h-3" /> Cargado
              </span>
            </div>
            <div className="font-mono text-xs text-rose-300 font-bold truncate">
              DOOM2.WAD (Doom II)
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Toca para cambiar IWAD base</div>
          </div>
        </div>

        {/* Scrollable Drawer Sections */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Archives in Memory */}
          <div>
            <div className="px-2 mb-1.5 text-[10px] font-semibold text-neutral-400 tracking-wider uppercase">
              Archivos Abiertos
            </div>
            <div className="space-y-0.5">
              {archives.map((arc) => {
                const isActive = arc.id === activeArchiveId;
                return (
                  <button
                    key={arc.id}
                    onClick={() => {
                      onSelectArchive(arc.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-rose-600/20 text-rose-300 font-medium border border-rose-500/30'
                        : 'text-neutral-300 hover:bg-neutral-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FolderArchive className="w-4 h-4 shrink-0 text-rose-400" />
                      <span className="font-mono text-xs truncate">{arc.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                      {arc.sizeMb}MB
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* File Operations */}
          <div>
            <div className="px-2 mb-1.5 text-[10px] font-semibold text-neutral-400 tracking-wider uppercase">
              Operaciones de Archivo
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  onClose();
                  onNotify('Abriendo selector de archivos de almacenamiento Android (SAF)...');
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-neutral-300 hover:bg-neutral-800 text-left"
              >
                <HardDrive className="w-4 h-4 text-sky-400" />
                <span>Abrir archivo (WAD / PK3 / ZIP)</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNotify('Creando nuevo archivo WAD vacío...');
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-neutral-300 hover:bg-neutral-800 text-left"
              >
                <FilePlus className="w-4 h-4 text-emerald-400" />
                <span>Nuevo archivo WAD</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNotify('WAD guardado correctamente en almacenamiento local.');
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-neutral-300 hover:bg-neutral-800 text-left"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Guardar archivo actual</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNotify('Exportando todos los lumps en archivo ZIP...');
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-neutral-300 hover:bg-neutral-800 text-left"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Exportar todos los Lumps</span>
              </button>
            </div>
          </div>

          {/* Doom Editors & Tools */}
          <div>
            <div className="px-2 mb-1.5 text-[10px] font-semibold text-neutral-400 tracking-wider uppercase">
              Herramientas & Editores
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenPaletteModal();
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-neutral-300 hover:bg-neutral-800 text-left"
              >
                <Palette className="w-4 h-4 text-rose-400" />
                <span>Gestor de Paletas y PLAYPAL</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNotify('Abriendo Editor de Texturas Compuestas TEXTURE1...');
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-neutral-300 hover:bg-neutral-800 text-left"
              >
                <Layers className="w-4 h-4 text-fuchsia-400" />
                <span>Editor de Texturas TEXTUREx</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNotify('Iniciando compilador ACS / ZDoom ACC script...');
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-neutral-300 hover:bg-neutral-800 text-left"
              >
                <Cpu className="w-4 h-4 text-teal-400" />
                <span>Compilador de Scripts ACS</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNotify('Optimizador de WAD: Eliminando lumps no utilizados y purgando copias...');
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg text-neutral-300 hover:bg-neutral-800 text-left"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Limpiar y Optimizar WAD</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 space-y-1">
          <button
            onClick={() => {
              onClose();
              onOpenAboutModal();
            }}
            className="w-full flex items-center gap-2.5 p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 text-xs text-left"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Acerca de SLADE 3 Mobile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
