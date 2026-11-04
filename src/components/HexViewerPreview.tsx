import React from 'react';
import { Lump } from '../types/slade';
import { Binary, Copy, Download } from 'lucide-react';

interface Props {
  lump: Lump;
  onNotify: (msg: string) => void;
}

export const HexViewerPreview: React.FC<Props> = ({ lump, onNotify }) => {
  const hexSample = lump.hexSample ?? [
    '00 1F 2A 3C 4E 5F 60 71 82 93 A4 B5 C6 D7 E8 F9',
    '10 20 30 40 50 60 70 80 90 A0 B0 C0 D0 E0 F0 00',
    '01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F 10',
    'AA BB CC DD EE FF 00 11 22 33 44 55 66 77 88 99',
    '50 4C 41 59 50 41 4C 20 44 4F 4F 4D 20 32 20 21'
  ];

  return (
    <div className="flex flex-col h-full bg-neutral-950 select-none font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-900/90">
        <div className="flex items-center gap-2">
          <Binary className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-semibold text-neutral-100">{lump.name}</span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-400">{lump.size} Bytes</span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-400">Offset: 0x{lump.offset.toString(16).toUpperCase().padStart(8, '0')}</span>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(hexSample.join('\n'));
            onNotify('Bytes hexadecimales copiados');
          }}
          className="p-1 hover:bg-neutral-800 rounded text-neutral-300"
          title="Copiar Hex"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Hex Grid Column Header */}
      <div className="flex px-3 py-1.5 bg-neutral-900/40 border-b border-neutral-800/80 text-[10px] text-neutral-500 select-none">
        <div className="w-20">OFFSET</div>
        <div className="flex-1 tracking-wider">00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</div>
        <div className="w-24 text-right">ASCII</div>
      </div>

      {/* Hex Stream View */}
      <div className="flex-1 p-3 overflow-auto space-y-1.5 leading-relaxed">
        {hexSample.map((line, idx) => {
          const rowOffset = (lump.offset + idx * 16).toString(16).toUpperCase().padStart(8, '0');
          // Dummy ASCII string from hex
          const asciiPart = line
            .split(' ')
            .map(h => {
              const code = parseInt(h, 16);
              return code >= 32 && code <= 126 ? String.fromCharCode(code) : '.';
            })
            .join('');

          return (
            <div key={idx} className="flex items-center text-neutral-300 hover:bg-neutral-900/60 rounded px-1">
              <div className="w-20 text-neutral-500">{rowOffset}</div>
              <div className="flex-1 text-rose-300/90 tracking-wider">
                {line}
              </div>
              <div className="w-24 text-right text-emerald-400/90 font-mono">
                {asciiPart}
              </div>
            </div>
          );
        })}

        <div className="pt-4 text-center text-neutral-600 text-[11px]">
          --- Mostrando primeros 80 bytes de {lump.size} bytes totales ---
        </div>
      </div>

      {/* Hex Toolbar Footer */}
      <div className="p-2.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs">
        <span className="text-neutral-500 text-[11px]">Modo de edición: Solo lectura</span>
        <button
          onClick={() => onNotify(`Exportando volcado binario de ${lump.name}`)}
          className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-xs flex items-center gap-1 active:scale-95"
        >
          <Download className="w-3 h-3 text-rose-400" />
          Exportar Raw Binario
        </button>
      </div>
    </div>
  );
};
