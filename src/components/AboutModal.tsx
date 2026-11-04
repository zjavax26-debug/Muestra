import React from 'react';
import { X, ExternalLink, Heart, ShieldCheck, Cpu } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />

      <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-10 select-none overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold font-mono text-sm shadow-md">
              S3
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-100">SLADE 3 Mobile</h3>
              <p className="text-[10px] text-neutral-400 font-mono">Concepto de Interfaz Android</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 text-xs text-neutral-300">
          <p>
            Esta aplicación es una <strong>demostración interactiva y visual</strong> que traslada el legendario editor de recursos de PC <strong>SLADE 3</strong> (creado originalmente por Simon Judd / Sir Juddington) a la ergonomía táctil de <strong>Android</strong>.
          </p>

          <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800/80 space-y-1.5">
            <div className="text-[11px] font-semibold text-rose-400">Características simuladas:</div>
            <ul className="text-[11px] text-neutral-400 space-y-1 list-disc list-inside">
              <li>Pestañas múltiples de documentos y lumps</li>
              <li>Explorador de Lumps con filtrado y jerarquía</li>
              <li>Inspector de Sprites con paletas Doom y offsets</li>
              <li>Sintetizador OPL3 / Roland SC-55 Web Audio</li>
              <li>Editor ZDoom Script (DECORATE / ZScript)</li>
              <li>Editor de texturas compuestas TEXTURE1</li>
              <li>Menús completos de archivo, paleta y herramientas</li>
            </ul>
          </div>

          <div className="text-[10px] text-neutral-500 pt-1 text-center">
            Doom es una marca registrada de id Software / Bethesda Softworks. SLADE es software libre desarrollado por la comunidad de Doomworld.
          </div>
        </div>

        <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-xl"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
