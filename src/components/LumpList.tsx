import React, { useState } from 'react';
import { Lump, LumpType } from '../types/slade';
import { Search, Filter, MoreVertical, Image, Music, FileCode, Layers, Binary, MapPin, Tag } from 'lucide-react';

interface Props {
  lumps: Lump[];
  activeLumpId?: string;
  onSelectLump: (lump: Lump) => void;
  onOpenLumpActionSheet: (lump: Lump) => void;
}

type FilterCategory = 'all' | 'graphics' | 'audio' | 'text' | 'maps' | 'data';

export const LumpList: React.FC<Props> = ({
  lumps,
  activeLumpId,
  onSelectLump,
  onOpenLumpActionSheet
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');

  const filteredLumps = lumps.filter((lump) => {
    const matchesSearch = lump.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lump.description && lump.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;
    if (activeCategory === 'all') return true;
    return lump.category === activeCategory;
  });

  const getLumpIcon = (type: LumpType) => {
    switch (type) {
      case 'sprite':
      case 'flat':
      case 'graphic':
        return <Image className="w-3.5 h-3.5 text-emerald-400" />;
      case 'sound':
      case 'music':
        return <Music className="w-3.5 h-3.5 text-amber-400" />;
      case 'text':
        return <FileCode className="w-3.5 h-3.5 text-sky-400" />;
      case 'texture_def':
        return <Layers className="w-3.5 h-3.5 text-fuchsia-400" />;
      case 'map_header':
      case 'map_data':
        return <MapPin className="w-3.5 h-3.5 text-rose-400" />;
      case 'marker':
        return <Tag className="w-3.5 h-3.5 text-neutral-500" />;
      default:
        return <Binary className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 border-r border-neutral-800/80 select-none">
      {/* Search Input Bar */}
      <div className="p-2 border-b border-neutral-800/80 bg-neutral-900/60">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar lumps (ej. SPOS, D_RUN)..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-rose-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-neutral-500 hover:text-neutral-300 text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Category Segmented Scrollable Filter Pills */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-neutral-800/80 bg-neutral-900/30 overflow-x-auto scrollbar-none text-[11px]">
        {(['all', 'graphics', 'audio', 'text', 'maps', 'data'] as FilterCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded-md capitalize font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
            }`}
          >
            {cat === 'all' ? 'Todos' : cat === 'graphics' ? 'Sprites/GFX' : cat}
          </button>
        ))}
      </div>

      {/* Lump List Count & Column Headers */}
      <div className="flex items-center justify-between px-3 py-1 bg-neutral-900/80 text-[10px] font-mono text-neutral-500 border-b border-neutral-800/60">
        <span>LUMP ({filteredLumps.length})</span>
        <span className="pr-7">TAMAÑO</span>
      </div>

      {/* Scrollable Lump Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-neutral-900">
        {filteredLumps.length === 0 ? (
          <div className="p-6 text-center text-neutral-500 text-xs">
            No se encontraron lumps con "{searchQuery}"
          </div>
        ) : (
          filteredLumps.map((lump) => {
            const isMarker = lump.type === 'marker';
            const isSelected = lump.id === activeLumpId;

            if (isMarker) {
              return (
                <div
                  key={lump.id}
                  onClick={() => onSelectLump(lump)}
                  className="px-3 py-1.5 bg-neutral-900/90 text-neutral-400 font-mono text-[11px] font-semibold flex items-center justify-between border-y border-neutral-800 tracking-wider cursor-pointer hover:bg-neutral-850"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500">[{lump.name}]</span>
                    <span className="text-[10px] text-neutral-500 font-sans font-normal">
                      {lump.description}
                    </span>
                  </div>
                  <span className="text-[9px] text-neutral-600 uppercase">Marker</span>
                </div>
              );
            }

            return (
              <div
                key={lump.id}
                onClick={() => onSelectLump(lump)}
                className={`group flex items-center justify-between px-3 py-2 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-rose-950/40 border-l-2 border-rose-500 text-neutral-100'
                    : 'hover:bg-neutral-900/60 text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="shrink-0">{getLumpIcon(lump.type)}</div>
                  <div className="min-w-0">
                    <div className="font-mono text-xs font-semibold truncate group-hover:text-rose-400">
                      {lump.name}
                    </div>
                    {lump.description && (
                      <div className="text-[10px] text-neutral-500 truncate">
                        {lump.description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[11px] text-neutral-500">
                    {formatSize(lump.size)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLumpActionSheet(lump);
                    }}
                    className="p-1 hover:bg-neutral-800 rounded text-neutral-500 hover:text-neutral-200 transition-colors"
                    title="Opciones de lump"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
