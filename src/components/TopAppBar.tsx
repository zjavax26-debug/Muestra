import React, { useState, useRef, useEffect } from 'react';
import { ArchiveFile, DeviceMode } from '../types/slade';
import { 
  Menu, MoreVertical, Save, Search, Smartphone, 
  Tablet, Monitor, ChevronRight, Folder, Edit3, 
  Eye, Sliders, Palette, Music, Cpu, HelpCircle,
  FilePlus, Download, RefreshCw, Layers
} from 'lucide-react';

interface Props {
  archive: ArchiveFile;
  onOpenDrawer: () => void;
  deviceMode: DeviceMode;
  onChangeDeviceMode: (mode: DeviceMode) => void;
  onSaveArchive: () => void;
  onOpenBaseResourceModal: () => void;
  onOpenPaletteModal: () => void;
  onOpenAboutModal: () => void;
  onNotify: (msg: string) => void;
}

export const TopAppBar: React.FC<Props> = ({
  archive,
  onOpenDrawer,
  deviceMode,
  onChangeDeviceMode,
  onSaveArchive,
  onOpenBaseResourceModal,
  onOpenPaletteModal,
  onOpenAboutModal,
  onNotify
}) => {
  const [showOverflowMenu, setShowOverflowMenu] = useState<boolean>(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowOverflowMenu(false);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative flex items-center justify-between h-13 px-3 bg-neutral-950 border-b border-neutral-800/90 select-none z-30">
      {/* Left: Navigation Drawer Hamburger & Archive Info */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onOpenDrawer}
          className="p-2 -ml-1 text-neutral-300 hover:text-white hover:bg-neutral-850 rounded-full active:scale-95 transition-transform"
          title="Menú de Navegación Lateral"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-neutral-100 truncate">
              {archive.name}
            </span>
            {archive.isIWAD && (
              <span className="text-[10px] font-mono text-rose-300 bg-rose-950/60 border border-rose-800/60 px-1.5 py-0.2 rounded font-medium">
                IWAD
              </span>
            )}
            {archive.isModified && (
              <span className="w-2 h-2 rounded-full bg-rose-500" title="Cambios sin guardar" />
            )}
          </div>
          <span className="text-[10px] text-neutral-500 font-mono truncate hidden sm:inline">
            {archive.sizeMb} MB · {archive.lumps.length} lumps
          </span>
        </div>
      </div>

      {/* Center/Right: Device Simulator Switcher & Actions */}
      <div className="flex items-center gap-1">
        {/* Device Mode Switcher (Allows testing phone vs tablet view!) */}
        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 mr-1 text-xs">
          <button
            onClick={() => onChangeDeviceMode('phone')}
            className={`p-1.5 rounded-md flex items-center gap-1 transition-colors ${
              deviceMode === 'phone'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Vista Móvil (Smartphone 20:9)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px] font-medium">Móvil</span>
          </button>
          <button
            onClick={() => onChangeDeviceMode('tablet')}
            className={`p-1.5 rounded-md flex items-center gap-1 transition-colors ${
              deviceMode === 'tablet'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Vista Tablet / Plegable (Doble panel)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px] font-medium">Tablet</span>
          </button>
          <button
            onClick={() => onChangeDeviceMode('fullscreen')}
            className={`p-1.5 rounded-md flex items-center gap-1 transition-colors ${
              deviceMode === 'fullscreen'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Pantalla Completa"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Save button */}
        <button
          onClick={onSaveArchive}
          className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850 rounded-full active:scale-95"
          title="Guardar archivo WAD"
        >
          <Save className="w-4 h-4" />
        </button>

        {/* Overflow 3-dots Menu Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowOverflowMenu(!showOverflowMenu)}
            className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850 rounded-full active:scale-95"
            title="Menús y Opciones de SLADE"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Android Dropdown Submenus */}
          {showOverflowMenu && (
            <div className="absolute right-0 top-full mt-1.5 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-1 text-xs text-neutral-200 z-50 animate-in fade-in zoom-in-95 duration-100">
              {/* File Submenu */}
              <div 
                className="px-3 py-2 hover:bg-neutral-800 flex items-center justify-between cursor-pointer"
                onClick={() => onNotify('Operación de Archivo seleccionada')}
              >
                <div className="flex items-center gap-2">
                  <Folder className="w-3.5 h-3.5 text-rose-400" />
                  <span>Archivo (File)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-neutral-500" />
              </div>

              {/* Edit Submenu */}
              <div 
                className="px-3 py-2 hover:bg-neutral-800 flex items-center justify-between cursor-pointer"
                onClick={() => onNotify('Menú de Edición: Deshacer, Rehacer, Seleccionar todo')}
              >
                <div className="flex items-center gap-2">
                  <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Edición (Edit)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-neutral-500" />
              </div>

              {/* Palette Submenu */}
              <div 
                className="px-3 py-2 hover:bg-neutral-800 flex items-center justify-between cursor-pointer"
                onClick={() => {
                  setShowOverflowMenu(false);
                  onOpenPaletteModal();
                }}
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>Paleta (Palette)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-neutral-500" />
              </div>

              {/* Base Resource Submenu */}
              <div 
                className="px-3 py-2 hover:bg-neutral-800 flex items-center justify-between cursor-pointer"
                onClick={() => {
                  setShowOverflowMenu(false);
                  onOpenBaseResourceModal();
                }}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>Recurso Base (IWAD)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-neutral-500" />
              </div>

              {/* Audio Submenu */}
              <div 
                className="px-3 py-2 hover:bg-neutral-800 flex items-center justify-between cursor-pointer"
                onClick={() => onNotify('Ajustes de Sonido: Timidity++, OPL3 FM y Soundfonts configurados.')}
              >
                <div className="flex items-center gap-2">
                  <Music className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audio & MIDI Synth</span>
                </div>
                <ChevronRight className="w-3 h-3 text-neutral-500" />
              </div>

              {/* Tools Submenu */}
              <div 
                className="px-3 py-2 hover:bg-neutral-800 flex items-center justify-between cursor-pointer"
                onClick={() => onNotify('Herramientas: Compilador de scripts ACC y visor de nodos')}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-teal-400" />
                  <span>Herramientas (Tools)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-neutral-500" />
              </div>

              <div className="h-[1px] bg-neutral-800 my-1" />

              {/* About modal trigger */}
              <div 
                className="px-3 py-2 hover:bg-neutral-800 flex items-center gap-2 cursor-pointer text-neutral-400 hover:text-neutral-100"
                onClick={() => {
                  setShowOverflowMenu(false);
                  onOpenAboutModal();
                }}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Acerca de SLADE 3 Mobile</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
