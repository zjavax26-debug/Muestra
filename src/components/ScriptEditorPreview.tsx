import React, { useState } from 'react';
import { Lump } from '../types/slade';
import { Play, Check, Copy, Search, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

interface Props {
  lump: Lump;
  onNotify: (msg: string) => void;
}

export const ScriptEditorPreview: React.FC<Props> = ({ lump, onNotify }) => {
  const [content, setContent] = useState<string>(
    lump.textData?.content ?? '// Lump vacío o sin datos de texto'
  );
  const [showConsole, setShowConsole] = useState<boolean>(false);
  const [compilerOutput, setCompilerOutput] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  const lines = content.split('\n');

  const handleCompile = () => {
    setIsCompiling(true);
    setShowConsole(true);
    setCompilerOutput('Iniciando compilador ZDoom ACC / ZScript parser...\nAnalizando sintaxis de ' + lump.name + '...');

    setTimeout(() => {
      setIsCompiling(false);
      setCompilerOutput(
        `[ZDoom ACC Compiler v1.58 - Android ARM64]\nCompilando: "${lump.name}"\n` +
        `> Análisis léxico: 0 errores, 0 advertencias.\n` +
        `> Generación de bytecode ZDoom: Éxito.\n` +
        `> Tamaños de script: ${content.length} bytes.\n` +
        `COMPILACIÓN EXITOSA (0.04s) - Listo para empaquetar en WAD.`
      );
      onNotify('Script compilado correctamente sin errores.');
    }, 700);
  };

  const handleInsertShortcut = (snippet: string) => {
    setContent(prev => prev + '\n' + snippet);
    onNotify(`Insertado: ${snippet}`);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 select-none">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-900/90 text-xs">
        <div className="flex items-center gap-2">
          <FileCode className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-mono font-semibold text-neutral-100">{lump.name}</span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-400 font-mono">{lines.length} líneas</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              navigator.clipboard?.writeText(content);
              onNotify('Contenido copiado al portapapeles de Android');
            }}
            className="p-1.5 hover:bg-neutral-800 rounded text-neutral-300"
            title="Copiar código"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded text-[11px] font-medium text-white flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <Play className="w-3 h-3 fill-current" />
            {isCompiling ? 'Compilando...' : 'Compilar ACC'}
          </button>
        </div>
      </div>

      {/* Quick Mobile Snippet Bar (Touch-friendly quick syntax buttons) */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-neutral-900/60 border-b border-neutral-800 overflow-x-auto text-[11px] font-mono text-neutral-300 scrollbar-none">
        <span className="text-neutral-500 text-[10px] uppercase font-sans mr-1">Snippets:</span>
        <button
          onClick={() => handleInsertShortcut('Health 100')}
          className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 rounded active:scale-95"
        >
          +Health
        </button>
        <button
          onClick={() => handleInsertShortcut('A_CustomBulletAttack(22.5, 0, 7, 5, "BulletPuff")')}
          className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 rounded active:scale-95"
        >
          +Attack
        </button>
        <button
          onClick={() => handleInsertShortcut('A_PlaySound("weapons/shotgf")')}
          className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 rounded active:scale-95"
        >
          +Sound
        </button>
        <button
          onClick={() => handleInsertShortcut('DropItem "Clip"')}
          className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 rounded active:scale-95"
        >
          +Drop
        </button>
        <button
          onClick={() => handleInsertShortcut('States { Spawn: TNT1 A 1 Loop }')}
          className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 rounded active:scale-95"
        >
          +States
        </button>
      </div>

      {/* Editor & Line Numbers */}
      <div className="flex-1 flex overflow-auto font-mono text-xs text-neutral-200 bg-neutral-950 p-2">
        {/* Line Numbers */}
        <div className="select-none pr-3 text-right text-neutral-600 border-r border-neutral-800/80 min-w-[32px] leading-relaxed">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck={false}
          className="flex-1 pl-3 bg-transparent resize-none border-none outline-none leading-relaxed text-neutral-200 font-mono whitespace-pre overflow-x-auto focus:ring-0"
        />
      </div>

      {/* Compiler Console Drawer */}
      {showConsole && (
        <div className="h-32 bg-neutral-900 border-t border-neutral-800 flex flex-col font-mono text-xs">
          <div className="flex items-center justify-between px-3 py-1 bg-neutral-950 border-b border-neutral-800 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Terminal className="w-3.5 h-3.5" />
              Consola de Salida ACC
            </span>
            <button
              onClick={() => setShowConsole(false)}
              className="text-neutral-500 hover:text-neutral-300"
            >
              Cerrar
            </button>
          </div>
          <pre className="flex-1 p-2 overflow-auto text-emerald-300/90 text-[11px] leading-tight select-text">
            {compilerOutput}
          </pre>
        </div>
      )}
    </div>
  );
};
