import React, { useState } from 'react';
import { X, Check, Layers, Plus, HardDrive } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

const AVAILABLE_IWADS = [
  { id: 'doom2', name: 'DOOM2.WAD', desc: 'Doom II: Hell on Earth (v1.9)', size: '14.6 MB', active: true },
  { id: 'doom', name: 'DOOM.WAD', desc: 'The Ultimate Doom (Thy Flesh Consumed)', size: '12.4 MB', active: false },
  { id: 'tnt', name: 'TNT.WAD', desc: 'Final Doom: TNT Evilution', size: '18.1 MB', active: false },
  { id: 'plutonia', name: 'PLUTONIA.WAD', desc: 'Final Doom: The Plutonia Experiment', size: '17.4 MB', active: false },
  { id: 'heretic', name: 'HERETIC.WAD', desc: 'Heretic: Shadow of the Serpent Riders', size: '14.1 MB', active: false },
  { id: 'hexen', name: 'HEXEN.WAD', desc: 'Hexen: Beyond Heretic (4 Episodes)', size: '20.1 MB', active: false },
  { id: 'gzdoom', name: 'gzdoom.pk3', desc: 'GZDoom Engine Core Definitions', size: '28.3 MB', active: true }
];

export const BaseResourceModal: React.FC<Props> = ({ isOpen, onClose, onNotify }) => {
  const [iwads, setIwads] = useState(AVAILABLE_IWADS);

  if (!isOpen) return null;

  const handleToggle = (id: string) => {
    setIwads(prev => prev.map(iw => iw.id === id ? { ...iw, active: !iw.active } : iw));
    const target = iwads.find(i => i.id === id);
    onNotify(`Recurso base ${target?.name} ${target?.active ? 'desactivado' : 'activado'}.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />

      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-10 select-none overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-rose-500" />
            <div>
              <h3 className="text-sm font-bold text-neutral-100">Recursos Base (IWADs)</h3>
              <p className="text-[11px] text-neutral-400">Proporciona paletas, texturas y definiciones de monstruos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 max-h-80 overflow-y-auto space-y-1.5 text-xs">
          {iwads.map(iwad => (
            <div
              key={iwad.id}
              onClick={() => handleToggle(iwad.id)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                iwad.active
                  ? 'bg-rose-500/10 border-rose-500/40 text-neutral-100'
                  : 'bg-neutral-950/40 border-neutral-800/80 text-neutral-400 hover:bg-neutral-850'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  iwad.active ? 'bg-rose-600 border-rose-500 text-white' : 'border-neutral-700 bg-neutral-800'
                }`}>
                  {iwad.active && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="font-mono font-bold text-xs">{iwad.name}</div>
                  <div className="text-[10px] text-neutral-500">{iwad.desc}</div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-neutral-500">{iwad.size}</span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2">
          <button
            onClick={() => onNotify('Abriendo explorador para cargar IWAD externo...')}
            className="flex-1 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Cargar IWAD desde SD
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-xl flex items-center justify-center"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
